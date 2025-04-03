import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Add rewrites configuration for API proxying
  async rewrites() {
    // Determine the environment
    const isDevelopment = process.env.NODE_ENV === "development";
    const isRahti = process.env.DEPLOYMENT_ENV === "rahti";

    // Use different backend URLs depending on environment
    let apiBaseUrl;

    if (isRahti) {
      // In Rahti, use the RAHTI_API_URL environment variable if available
      apiBaseUrl = process.env.RAHTI_API_URL || "http://upbeat-backend:8000";
    } else if (isDevelopment) {
      // In development, use localhost
      apiBaseUrl = "http://127.0.0.1:8000";
    } else {
      // In Docker environment, use service name as defined in docker-compose
      apiBaseUrl = "http://api:8000";
    }

    console.log(`Using API base URL for rewrites: ${apiBaseUrl}`);

    return [
      // Normal POST chat endpoint - should work in all environments
      {
        source: "/api/chat",
        destination: `${apiBaseUrl}/api/chat`,
      },
      // Streaming endpoint with special handling
      {
        source: "/api/chat/stream",
        destination: `${apiBaseUrl}/api/chat/stream`,
      },
      // Make PDF download work
      {
        source: "/api/download-pdf/:user/:phase",
        destination: `${apiBaseUrl}/api/download-pdf/:user/:phase`,
      },
      // General API proxy for Rahti environment
      {
        source: "/api-proxy/:path*",
        destination: `${apiBaseUrl}/:path*`,
      },
      // All other API paths should be proxied as well
      {
        source: "/api/:path*",
        destination: `${apiBaseUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
