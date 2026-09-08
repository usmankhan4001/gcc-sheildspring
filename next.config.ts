import type { NextConfig } from "next";

/**
 * NOTE: `output: "export"` was removed deliberately.
 *
 * Card details are captured in an Airwallex-hosted field, and the matching
 * PaymentIntent must be created server-side with a secret API key. Static
 * export cannot run route handlers, so the app now builds as a normal
 * Next.js server (see Dockerfile / DEPLOY.md).
 */
const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
