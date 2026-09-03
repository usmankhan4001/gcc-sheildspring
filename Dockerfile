FROM node:20-alpine AS base

# Stage 1: Dependencies installer
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* bun.lockb* bun.lock* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  elif [ -f bun.lockb ] || [ -f bun.lock ]; then corepack enable bun && bun install --frozen-lockfile; \
  else echo "Lockfile not found." && npm install; \
  fi

# Stage 2: Static Export Builder
FROM base AS builder
ARG CACHE_BUST=5
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  elif [ -f bun.lockb ] || [ -f bun.lock ]; then corepack enable bun && bun run build; \
  else npm run build; \
  fi

# Stage 3: Nginx Static Server
FROM nginx:alpine AS runner

RUN apk add --no-cache curl

COPY --from=builder /app/out /usr/share/nginx/html

RUN printf 'server {\n\
  listen 3000;\n\
  server_name _;\n\
  root /usr/share/nginx/html;\n\
  index index.html;\n\
\n\
  location / {\n\
    try_files $uri $uri/ $uri.html /index.html;\n\
  }\n\
\n\
  location /_next/static/ {\n\
    expires 1y;\n\
    add_header Cache-Control "public, immutable";\n\
  }\n\
\n\
  gzip on;\n\
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;\n\
}' > /etc/nginx/conf.d/default.conf

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
