// src/api/axios.ts
import axios from "axios";
import { getToken } from "../utils/storage";

let csrfToken: string | null = null;

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Required for CSRF cookies
});

// Request interceptor
API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Add CSRF token to state-changing requests
  if (csrfToken && ["POST", "PUT", "DELETE", "PATCH"].includes(config.method?.toUpperCase() || "")) {
    config.headers["X-CSRF-Token"] = csrfToken;
  }

  return config;
});

// Response interceptor to capture CSRF token
API.interceptors.response.use(
  (response) => {
    const token = response.headers["x-csrf-token"];
    if (token) {
      csrfToken = token;
    }
    return response;
  },
  async (error) => {
    // If we get a 401/403 related to CSRF, we might want to refresh it
    if (error.response?.status === 403 && error.response?.data?.detail?.includes("CSRF")) {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/csrf`, { withCredentials: true });
        csrfToken = res.headers["x-csrf-token"];
        // Retry the original request with the new token
        error.config.headers["X-CSRF-Token"] = csrfToken;
        return API(error.config);
      } catch (csrfError) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
