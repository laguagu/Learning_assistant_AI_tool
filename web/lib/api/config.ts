// Environment and API configuration

// Determine environment and platform
const isDevelopment = process.env.NODE_ENV === "development";
const isServer = typeof window === "undefined";
const isRahti = process.env.DEPLOYMENT_ENV === "rahti";

// Define API base URLs for different environments
const API_URLS = {
  rahti: process.env.RAHTI_API_URL,
  server: {
    development: "http://127.0.0.1:8000",
    production: "http://api:8000",
  },
  client: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000",
};

// Select the appropriate API URL based on environment
let API_URL: string;

if (isRahti) {
  API_URL = API_URLS.rahti as string;
} else if (isServer) {
  if (isDevelopment) {
    API_URL = API_URLS.server.development;
  } else {
    API_URL = API_URLS.server.production;
  }
} else {
  API_URL = API_URLS.client;
}

export { API_URL, isDevelopment, isRahti, isServer };
