import axios from "axios";
import config from "../../config";
import jwtDecode from "jwt-decode";

// Create axios instance
const baseURL = "http://localhost:5000/api/v1";
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach(
    (prom: { reject: (arg0: any) => void; resolve: (arg0: null) => void }) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    }
  );

  failedQueue = [];
};

const refreshTokenLogic = async () => {
  try {
    const response = await axios.post(
      "/api/refresh-token",
      {},
      {
        withCredentials: true,
      }
    );

    const { accessToken } = response.data;
    localStorage.setItem("token", accessToken);

    return accessToken;
  } catch (error) {
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
    throw error;
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshTokenLogic();

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        processQueue(null, newToken);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle other errors
    let message;
    switch (error.response?.status) {
      case 403:
        window.location.href = "/access-denied";
        message = "Access Forbidden";
        break;
      case 404:
        message = "Resource not found";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message =
          error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred";
    }

    return Promise.reject(message);
  }
);

const getUserFromCookie = () => {
  const user = localStorage.getItem("token");
  return user ? user : null;
};

export const isUserAuthenticated = () => {
  const user = getUserFromCookie();
  if (!user) {
    return false;
  }
  const decoded: any = jwtDecode(user);
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    console.warn("access token expired");
    return false;
  } else {
    return true;
  }
};

// Periodic token refresh
const setupTokenRefreshInterval = () => {
  const REFRESH_INTERVAL = 14 * 60 * 1000;

  setInterval(async () => {
    try {
      await refreshTokenLogic();
    } catch (error) {
      console.error("Periodic token refresh failed", error);
    }
  }, REFRESH_INTERVAL);
};

setupTokenRefreshInterval();

export default axiosInstance;
