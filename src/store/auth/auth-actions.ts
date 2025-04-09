import axiosInstance from "@/utils/axios-instance";
import { authStart, authSuccess, authFail } from "./auth-slice";
import axios from "axios";
import { LoginResponse, LoginCredentials } from "./auth-user-types";
// import bcrypt from "bcryptjs";

/**
 * Function to log user in
 * @param credentials
 * @returns
 */
export const loginUser =
  (credentials: LoginCredentials) =>
  async (
    dispatch: (action: { type: string; payload?: any }) => void
  ): Promise<void> => {
    dispatch(authStart());

    const url = "https://benion-vics-api.onrender.com/api/v1/login";

    try {
      const response = await axiosInstance.post<LoginResponse>(
        url,
        credentials
      );

      console.log("Login Status ", response.data);
      const { status, data, message } = response.data;

      if (status) {
        dispatch(authSuccess(data));
      } else {
        dispatch(authFail(message || "Login failed"));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Login error:", error.message);
        dispatch(authFail(error.response?.data?.message || error.message));
      } else {
        console.error("Login error:", error);
        dispatch(authFail("An unexpected error occurred"));
      }
    }
  };

export const forgotPassword = async () => {};
