import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "X-Api-Key": import.meta.env.VITE_API_KEY,
    "ngrok-skip-browser-warning": "true",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Debug request details to help diagnose missing fields
  try {
    console.log("[axios request]", config.method?.toUpperCase(), config.url, {
      headers: config.headers,
      // Avoid serializing FormData directly; indicate if body is FormData
      isFormData: config.data instanceof FormData,
    });
  } catch (e) {
    /* ignore logging errors */
  }
  return config;
});

// Surface API-level errors where the API returns { status: false, message: ... }
axiosInstance.interceptors.response.use(
  (response) => {
    if (response && response.data && response.data.status === false) {
      return Promise.reject(new Error(response.data.message || "API error"));
    }
    return response;
  },
  (error) => {
    // Handle auth problems centrally
    if (error && error.response && error.response.status === 401) {
      localStorage.removeItem("auth_token");
      // optional: redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
