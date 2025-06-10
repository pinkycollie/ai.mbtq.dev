import axios from "axios"

// Determine the API URL based on environment
const getApiUrl = () => {
  // If FASTAPI_URL is defined, use it
  if (process.env.FASTAPI_URL) {
    return process.env.FASTAPI_URL
  }

  // If API_URL is defined, use it (alternative name)
  if (process.env.API_URL) {
    return process.env.API_URL
  }

  // If BACKEND_URL is defined, use it (another alternative)
  if (process.env.BACKEND_URL) {
    return process.env.BACKEND_URL
  }

  // If BACKENDLESS_URL is defined, use it
  if (process.env.BACKENDLESS_URL) {
    return process.env.BACKENDLESS_URL
  }

  // Check if we're in a Replit environment
  if (typeof window !== "undefined" && window.location.hostname.includes("replit")) {
    // Extract the Replit username and app name from the URL
    const hostname = window.location.hostname
    // For Replit URLs like username.repl.co or project-name.username.repl.co
    if (hostname.endsWith(".repl.co")) {
      return `https://${hostname.replace("repl.co", "replit.app")}`
    }
    // Already on replit.app domain
    return `https://${hostname}`
  }

  // Default to localhost for development
  return "http://localhost:8000"
}

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for CORS with credentials
})

// Add request interceptor for authentication if needed
apiClient.interceptors.request.use(
 (config) => {
   // Add Backendless headers if available
   const userToken = localStorage.getItem("backendless_user_token")
   if (userToken) {
     config.headers["user-token"] = userToken
   }

   const appId = process.env.NEXT_PUBLIC_BACKENDLESS_APP_ID
   if (appId) {
     config.headers["application-id"] = appId
   }
