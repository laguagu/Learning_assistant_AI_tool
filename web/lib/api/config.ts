// Environment and API configuration

// Determine environment and platform
const isDevelopment = process.env.NODE_ENV === "development";
const isServer = typeof window === "undefined";
// Rahti detection needs to work both server and client side
const isRahti = process.env.DEPLOYMENT_ENV === "rahti" || 
                (typeof window !== 'undefined' && window.location.hostname.includes('rahtiapp.fi'));

// Define API URL using simpler logic with fallbacks
let API_URL: string;

// First check for explicitly configured URL from environment variables
if (process.env.NEXT_PUBLIC_API_URL) {
  API_URL = process.env.NEXT_PUBLIC_API_URL;
} 
// Handle server-side (SSR) environments
else if (isServer) {
  if (isRahti) {
    // Inside Rahti container, use internal network name
    API_URL = process.env.RAHTI_API_URL || "http://upbeat-backend:8000";
  } else if (isDevelopment) {
    // Regular server environment in local development
    API_URL = "http://127.0.0.1:8000";
  } else {
    // Docker environment service name as defined in docker-compose.yaml
    API_URL = "http://api:8000";
  }
} 
// Client-side API calls need different handling to work in browsers
else {
  // In Rahti, client-side requests use relative URLs that will be proxied through Next.js
  if (isRahti) {
    // For client side, use relative path with current site as base
    API_URL = "/api-proxy";
  } else {
    // For local development, direct to localhost
    API_URL = "http://127.0.0.1:8000";
  }
}

// Export the configured API URL
export { API_URL };

// Enable logging for debugging - helpful when troubleshooting API connectivity issues
console.log("API URL configured as:", API_URL, { 
  isServer, 
  isDevelopment, 
  isRahti, 
  hostname: typeof window !== 'undefined' ? window.location.hostname : 'server' 
});

export { isDevelopment, isRahti, isServer };

