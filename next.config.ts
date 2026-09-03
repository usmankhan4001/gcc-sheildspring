import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output is only needed for self-hosted Docker builds; Vercel requires default output
  ...(process.env.VERCEL ? {} : { output: "standalone" }),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
