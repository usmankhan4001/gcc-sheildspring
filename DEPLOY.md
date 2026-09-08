# Deploying Agent Lume — Multi-Platform Guide

This guide covers deploying the Agent Lume e-commerce site to 7 popular hosting platforms.

---

## Prerequisites

- Node.js 20+ installed locally
- Git installed
- A GitHub account with the repository pushed

---

## 1. Vercel (Recommended)

The easiest option for Next.js projects.

### Steps

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"Add New Project"**
4. Select the `gcc-sheildspring` repository
5. Vercel auto-detects Next.js — settings are pre-filled
6. Click **Deploy**

### Custom Domain

1. In project settings, go to **Domains**
2. Add your domain (e.g., `agentlume.io`)
3. Update your DNS:
   - Add a **CNAME** record pointing to `cname.vercel-dns.com`
   - Or add an **A** record pointing to `76.76.21.21`
4. SSL is automatic

---

## 2. Netlify

Great for static and server-rendered sites.

### Steps

1. Push your code to GitHub
2. Go to [app.netlify.com](https://app.netlify.com) and sign in with GitHub
3. Click **"Add new site"** → **"Import an existing project"**
4. Select the repository
5. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
6. Click **Deploy**

### Custom Domain

1. In site settings, go to **Domain management**
2. Add your custom domain
3. Update DNS:
   - Add a **CNAME** record pointing to your Netlify subdomain
4. SSL is automatic

---

## 3. Docker (Self-Hosted)

Run on any server with Docker installed.

### Local Build & Run

```bash
# Build the image
docker build -t agent-lume .

# Run the container
docker run -d -p 3000:3000 --name agent-lume agent-lume
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: "3.8"
services:
  agent-lume:
    build: .
    ports:
      - "3000:3000"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

```bash
docker-compose up -d
```

### Push to a Registry

```bash
# Tag for Docker Hub
docker tag agent-lume yourusername/agent-lume:latest

# Push
docker push yourusername/agent-lume:latest

# Pull and run on any server
docker pull yourusername/agent-lume:latest
docker run -d -p 3000:3000 yourusername/agent-lume:latest
```

### Custom Domain (with Nginx)

```nginx
server {
    listen 80;
    server_name agentlume.io;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Use Certbot for SSL:
```bash
sudo certbot --nginx -d agentlume.io
```

---

## 4. Dokploy (Self-Hosted PaaS)

Deploy via the Dokploy API with Cloudflare Tunnel.

### Prerequisites

- Dokploy installed at your domain (e.g., `paas.usmankhan.xyz`)
- API key from Dokploy dashboard

### Deploy via API

```bash
# Set your Dokploy credentials
DOKPLOY_API_KEY="your-api-key"
DOKPLOY_HOST="https://your-dokploy-domain.com"

# Create project
curl -s -X POST "$DOKPLOY_HOST/api/project.create" \
  -H "Authorization: Bearer $DOKPLOY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Agent Lume",
    "description": "Agent Lume e-commerce site"
  }'
```

### Custom Domain

1. In Dokploy dashboard, add your domain to the application
2. Configure Cloudflare Tunnel:
   - Add a CNAME record pointing to your tunnel
3. SSL is handled by Cloudflare

---

## 5. Railway

Simple GitHub integration with automatic deploys.

### Steps

1. Push your code to GitHub
2. Go to [railway.app](https://railway.app) and sign in with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select the repository
5. Railway auto-detects the Node.js project
6. Click **Deploy**

### Custom Domain

1. In project settings, go to **Networking**
2. Click **"Generate Domain"** or **"Custom Domain"**
3. Add your domain and update DNS
4. SSL is automatic

---

## 6. DigitalOcean App Platform

Managed hosting with GitHub integration.

### Steps

1. Push your code to GitHub
2. Go to [cloud.digitalocean.com](https://cloud.digitalocean.com) → **Apps**
3. Click **"Create App"** → **"GitHub"**
4. Select the repository and branch
5. Build settings:
   - **Build command:** `npm run build`
   - **Run command:** `npm start`
6. Click **Deploy**

### Custom Domain

1. In app settings, go to **Domains**
2. Add your custom domain
3. Update DNS with the provided records
4. SSL is automatic

---

## 7. AWS Amplify

Amazon's CI/CD hosting for frontend apps.

### Steps

1. Push your code to GitHub
2. Go to [console.aws.amazon.com](https://console.aws.amazon.com) → **Amplify**
3. Click **"New app"** → **"Host web app"**
4. Select GitHub
5. Select the repository and branch
6. Build settings are auto-detected for Next.js
7. Click **Deploy**

### Custom Domain

1. In Amplify console, go to **Domain management**
2. Add your domain
3. Follow the DNS verification steps
4. SSL is automatic

---

## Environment Variables

If you add environment variables later (e.g., for payment integration), set them in your platform's dashboard:

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `AIRWALLEX_CLIENT_ID` | Yes | Airwallex client ID (secret — server only) | `your_client_id` |
| `AIRWALLEX_API_KEY` | Yes | Airwallex API key (secret — server only) | `your_api_key` |
| `NEXT_PUBLIC_AIRWALLEX_ENV` | Yes | `demo` for sandbox, `prod` for live. Card fields are disabled when unset. | `demo` |
| `AIRWALLEX_API_BASE` | No | Override the Airwallex API base URL | `https://api.airwallex.com/api/v1` |

> Never prefix the client ID or API key with `NEXT_PUBLIC_` — that would ship
> your Airwallex credentials to the browser.

### Running with Docker

The image now runs `next start` (a Node server) rather than serving a static
Nginx export, because the `/api/payment-intent` route must run server-side.

```bash
docker run -d -p 3000:3000 \
  -e AIRWALLEX_CLIENT_ID=your_client_id \
  -e AIRWALLEX_API_KEY=your_api_key \
  -e NEXT_PUBLIC_AIRWALLEX_ENV=demo \
  --name agent-lume agent-lume
```

---

## Troubleshooting

### Build fails with "Module not found"
- Run `npm install` locally to ensure `package-lock.json` is up to date
- Commit the lockfile

### Images not loading
- Ensure `images.unsplash.com` is in `next.config.ts` under `images.remotePatterns`
- Check that image URLs are valid and accessible

### Standalone output issues
- The `output: "standalone"` setting in `next.config.ts` is required for Docker deployments
- For Vercel/Netlify, this setting is optional but harmless

---

## Need Help?

Contact the Agent Lume team at **service@agentlume.io** or **+1 367 202 5511**.
