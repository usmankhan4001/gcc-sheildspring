# Shieldspring

A clothing e-commerce storefront for **Shieldspring** ([shieldspring.io](https://shieldspring.io)), built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Features

- Home page with hero, category tiles, bestsellers, and new arrivals
- Shop pages with category filtering (Men, Women, Kids, Accessories)
- Product detail pages with color/size selection and related products
- Client-side cart (persisted to `localStorage`) with a live item count badge
- Checkout flow with order summary and a confirmation page
- Company pages: About, Contact, Shipping & Returns, Terms of Service, Privacy Policy

Product imagery is generated as inline SVG placeholders (no external image hosting).
Checkout is a front-end demo flow — it is not wired to a real payment gateway.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — run ESLint

## Project structure

- `src/app` — routes (App Router pages)
- `src/components` — shared UI components (header, footer, cart, product card, etc.)
- `src/data/products.ts` — product catalog (mock data)
- `src/lib/site.ts` — company/contact details used across the site
