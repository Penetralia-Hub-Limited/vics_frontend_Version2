// services/AuthService.ts
import axiosInstance from "@/utils/axios-instance";
import axios from "axios";
import {
  authStart,
  authSuccess,
  authFail,
  logout as logoutAction,
} from "@/store/auth/auth-slice";
import { LoginCredentials } from "@/store/auth/auth-user-types";

class AuthService {
  private dispatch: any;

  constructor(dispatch: any) {
    this.dispatch = dispatch;
  }

  async login(credentials: LoginCredentials) {
    this.dispatch(authStart());
    try {
      const response = await axiosInstance.post(
        "https://benion-vics-api.onrender.com/api/v1/login",
        credentials
      );
      const { status, data, message } = response.data;

      if (status) {
        this.dispatch(authSuccess(data));
      } else {
        this.dispatch(authFail(message || "Login failed"));
      }
    } catch (error: any) {
      this.dispatch(authFail(error.response?.data?.message || "Login error"));
    }
  }

  async logout() {
    try {
      await axiosInstance.post(
        "https://benion-vics-api.onrender.com/api/v1/logout"
      );
    } catch (error) {
      console.error("Logout failed (API):", error);
    } finally {
      localStorage.removeItem("mlToken");
      this.dispatch(logoutAction());
    }
  }

  async resetPassword(email: string) {
    this.dispatch(authStart());
    try {
      const res = await axios.post(
        "https://benion-vics-api.onrender.com/api/v1/reset-password",
        { email }
      );
      console.log("Reset success:", res.data.message);
      this.dispatch(authFail(null));
    } catch (error: any) {
      this.dispatch(authFail(error.response?.data?.message || "Reset failed"));
    }
  }
}

export default AuthService;
