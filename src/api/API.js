import axios from "axios";

const API = axios.create({
  baseURL: "https://techy-xll0.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    // Accept: "application/json",
  },
});

//  Request interceptor: attach token and check expiration
API.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        delete config.headers.Authorization; // Clean up any existing header
      }
    } catch (err) {
      console.error("Token read error:", err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response interceptor for global error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized - maybe redirect to login");
    }
    return Promise.reject(error);
  }
);

export default API;
