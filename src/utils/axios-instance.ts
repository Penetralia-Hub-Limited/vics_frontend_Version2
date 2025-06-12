import axios from "axios";
import { toast } from "sonner";
import { decryptToken, host, xApiKey } from "./helpers";
import { store, persistor } from "@/store/store";
import { logout } from "@/store/auth/auth-slice";
import { getCookie } from "cookies-next";

const axiosInstance = axios.create({
  baseURL: host,
  timeout: 120000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "*/*",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const apiKey = xApiKey;
    const url = host as string;

    if (config.url?.includes(url)) {
      config.headers["x-api-key"] = apiKey;
    }

    const mlToken = getCookie("mlToken");

    if (mlToken && typeof mlToken === "string") {
      const parsedToken = decryptToken(mlToken);
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
      toast(`Unauthorized: ${errorMessage} session. Logging Out`);
      console.error(`Unauthorized: ${errorMessage}. Logging User Out`);
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
