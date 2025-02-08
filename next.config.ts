import { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**", // Matches all paths under "cdn.sanity.io/images/"
      },
    ],
  },
  // Add other configuration options here if needed
};

export default nextConfig;
