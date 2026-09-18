import axios from "axios";

// Configured base Axios instance ready for future backend integration
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

// Interceptor placeholder for JWT tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("tmg_auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Simulated network latency for realistic loading states (100-350ms)
export const mockDelay = (ms = 250) =>
  new Promise((resolve) => setTimeout(resolve, ms));
