import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import jwtDecode from "jwt-decode";
import config from "../../config";

// Constants
const AUTH_SESSION_KEY = "user_session";
const REFRESH_INTERVAL = 14 * 60 * 1000; // 14 minutes
const API_URL = "http://localhost:5000/api/v1";

// Types
interface UserSession {
  token: string;
  user: any;
}

interface TokenResponse {
  accessToken: string;
}

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Token refresh state
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string | null) => void;
  reject: (error: any) => void;
}> = [];

// Queue processor
const processQueue = (error: any, token: string | null = null): void => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

// Token management
const setAuthorization = (token: string | null): void => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const refreshTokenLogic = async (): Promise<string> => {
  try {
    const response = await axios.post<TokenResponse>(
      `${API_URL}/auth/refresh-token`,
      {},
      { withCredentials: true }
    );
    const { accessToken } = response.data;
    sessionStorage.setItem(
      AUTH_SESSION_KEY,
      JSON.stringify({ token: accessToken })
    );
    setAuthorization(accessToken);
    return accessToken;
  } catch (error) {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    window.location.href = "/auth/login";
    throw error;
  }
};

// Session management
const getUserFromSession = (): UserSession | null => {
  const userStr = sessionStorage.getItem(AUTH_SESSION_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

const setUserSession = (session: UserSession | null) => {
  if (session) {
    sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
    setAuthorization(session.token);
  } else {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    setAuthorization(null);
  }
};

// Authentication check
const isUserAuthenticated = (): boolean => {
  const session = getUserFromSession();
  if (!session?.token) return false;

  try {
    const decoded: any = jwtDecode(session.token);
    return decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const session = getUserFromSession();
    if (session?.token) {
      config.headers["Authorization"] = `Bearer ${session.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    // Handle 401 and token refresh
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
    let message: string;
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
          (error.response?.data as any)?.message ||
          error.message ||
          "An unexpected error occurred";
    }

    return Promise.reject(message);
  }
);

// API Core class
class APICore {
  setLoggedInUser(arg0: null) {
    throw new Error("Method not implemented.");
  }
  get = (url: string, params?: Record<string, any>) => {
    const queryString = params
      ? Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join("&")
      : "";
    return axiosInstance.get(`${url}${queryString ? `?${queryString}` : ""}`);
  };

  getFile = (url: string, params?: Record<string, any>) => {
    const queryString = params
      ? Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join("&")
      : "";
    return axiosInstance.get(`${url}${queryString ? `?${queryString}` : ""}`, {
      responseType: "blob",
    });
  };

  getMultiple = (urls: string[], params?: Record<string, any>) => {
    const queryString = params
      ? Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join("&")
      : "";

    const requests = urls.map((url) =>
      axiosInstance.get(`${url}${queryString ? `?${queryString}` : ""}`)
    );
    return axios.all(requests);
  };

  create = (url: string, data: any) => axiosInstance.post(url, data);

  updatePatch = (url: string, data: any) => axiosInstance.patch(url, data);

  update = (url: string, data: any) => axiosInstance.put(url, data);

  delete = (url: string) => axiosInstance.delete(url);

  createWithFile = (url: string, data: Record<string, any>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return axiosInstance.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  updateWithFile = (url: string, data: Record<string, any>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return axiosInstance.patch(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };
}

// Setup periodic token refresh
const setupTokenRefreshInterval = () => {
  setInterval(async () => {
    if (isUserAuthenticated()) {
      try {
        await refreshTokenLogic();
      } catch (error) {
        console.error("Periodic token refresh failed:", error);
      }
    }
  }, REFRESH_INTERVAL);
};

// Initialize
const initializeAxios = () => {
  const session = getUserFromSession();
  if (session?.token) {
    setAuthorization(session.token);
  }
  setupTokenRefreshInterval();
};

initializeAxios();

export {
  APICore,
  axiosInstance,
  setAuthorization,
  setUserSession,
  getUserFromSession,
  isUserAuthenticated,
};
