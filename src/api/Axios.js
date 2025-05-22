import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API = axios.create({
  baseURL: "http://0.0.0.0:5000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 🔐 Request interceptor: attach token and check expiration
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        // Check if token is expired
        const now = Date.now() / 1000;
        if (decoded.exp < now) {
          console.warn("Token expired, logging out");
          handleLogout();
          return Promise.reject(new Error("Token expired"));
        }

        config.headers.Authorization = `Bearer ${token}`;
      } catch (err) {
        console.error("Error decoding token:", err);
        handleLogout();
        return Promise.reject(err);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔁 Retry logic: retry once if network error or timeout
let isRetry = false;

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    if (!config || isRetry) {
      return Promise.reject(error);
    }

    // Retry once on network error
    if (!response && error.code === "ECONNABORTED") {
      console.warn("Network timeout or offline. Retrying once...");
      isRetry = true;
      return API(config);
    }

    // Handle unauthorized (401)
    if (response?.status === 401) {
      console.warn("Unauthorized. Logging out...");
      handleLogout();
    }

    return Promise.reject(error);
  }
);

// 🔓 Auto logout helper
function handleLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Optional: replace with custom routing logic
  window.location.href = "/login";
}

export default API;
