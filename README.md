# Agent Lume

A clothing e-commerce storefront for **Agent Lume** ([agentlume.io](https://agentlume.io)), built with Next.js (App Router), TypeScript, and Tailwind CSS.

> The folder is still named `gcc-sheildspring` for historical reasons — the brand
> and domain in this codebase are Agent Lume / `agentlume.io`.

## Features

- Home page with hero, category tiles, bestsellers, and new arrivals
- Shop pages with category filtering (Men, Women, Kids, Accessories)
- Product detail pages with color/size selection and related products
- Client-side cart (persisted to `localStorage`) with a live item count badge
- Checkout with shipping selection, order summary, and a confirmation page
- Card payments processed by **Airwallex** via hosted payment fields
- Company pages: About, Contact, Shipping Policy, Refund Policy, Terms of Service, Privacy Policy

## Payments

Card details are entered into an **Airwallex-hosted field** (an iframe served by
Airwallex). The card number, expiry date and security code never touch this
application's DOM, React state, or servers — which is what keeps the integration
PCI-DSS compliant and acceptable to Airwallex underwriting.

The flow is:

1. The browser posts the cart total to `/api/payment-intent`.
2. That route authenticates with Airwallex and creates a PaymentIntent using the
   secret API key, returning only the intent `id` and `client_secret`.
3. The browser calls `Airwallex.confirmPaymentIntent()` with the hosted card
   element to complete the payment.

### Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `AIRWALLEX_CLIENT_ID` | Yes | Airwallex client ID (server only) |
| `AIRWALLEX_API_KEY` | Yes | Airwallex API key (server only) |
| `NEXT_PUBLIC_AIRWALLEX_ENV` | Yes | `demo` or `prod`. Card fields are disabled when unset. |

Never prefix the client ID or API key with `NEXT_PUBLIC_`.

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

- `src/app` — routes (App Router pages) and `src/app/api` (server routes)
- `src/components` — shared UI components (header, footer, cart, product card, etc.)
- `src/data/products.ts` — product catalog (mock data)
- `src/lib/site.ts` — company, contact and currency details used across the site
- `src/lib/commerce.ts` — shipping rates, return window and other commercial terms

Commercial terms live in `src/lib/commerce.ts` so the marketing copy, checkout
and policy pages cannot contradict each other. See `AIRWALLEX_COMPLIANCE.md`.
