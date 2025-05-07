/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/utils/axios-instance";
import axios from "axios";
import {
  authStart,
  authSuccess,
  authFail,
  logout as logoutAction,
} from "@/store/auth/auth-slice";
import { LoginCredentials } from "@/store/auth/auth-user-types";
import { deleteCookie } from "cookies-next";
import { AppDispatch } from "@/store/store";

class AuthService {
  private dispatch: AppDispatch;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  // Login user
  async login(credentials: LoginCredentials) {
    this.dispatch(authStart());
    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
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

  // log out user
  async logout() {
    try {
      await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/logout`);
    } catch (error) {
      console.error("Logout failed (API):", error);
    } finally {
      deleteCookie("mlToken");
      this.dispatch(logoutAction());
    }
  }

  // reset password
  async resetPassword(email: string) {
    this.dispatch(authStart());
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/reset-password`,
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
