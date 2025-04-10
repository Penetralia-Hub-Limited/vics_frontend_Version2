import axios from "axios";
import { toast } from "sonner";
import { decryptToken } from "./helpers";
import { store, persistor } from "@/store/store";
import { logout } from "@/store/auth/auth-slice";
import { getCookie } from "cookies-next";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 120000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const apiKey = process.env.NEXT_PUBLIC_AUTH_API_KEY;
    const url = process.env.NEXT_PUBLIC_API_URL as string;

    if (config.url?.includes(url)) {
      config.headers["x-api-key"] = apiKey;
    }

    const mlToken = getCookie("mlToken");

    if (mlToken && typeof mlToken === "string") {
      const parsedToken = decryptToken(mlToken);
      console.log("Parsed Token:", parsedToken);
      if (parsedToken.success) {
        config.headers.Authorization = `Bearer ${parsedToken.data.accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    const { success, message } = response.data;
    if (success && message) {
      toast(message);
    }
    return response;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || error.message;

    if (error.response?.status === 401) {
      toast(`Unauthorized: ${errorMessage}`);
      console.error(`Unauthorized: ${errorMessage}`);
      store.dispatch(logout());
      persistor.flush(); // to flush persisted state
    } else if (error.response?.status === 403) {
      toast(`Forbidden: ${errorMessage}`);
      console.error(`Forbidden: ${errorMessage}`);
    } else {
      toast(errorMessage);
      console.error("Server Error:", error.response?.data);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
