import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Add these lines to help with Docker networking
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },
};

export default nextConfig;
