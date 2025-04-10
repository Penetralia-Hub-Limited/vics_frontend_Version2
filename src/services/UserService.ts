/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/utils/axios-instance";
import { AppDispatch } from "@/store/store";
import { getCookie } from "cookies-next";
import { CreateUserProp } from "@/store/user/user-type";
import {
  userStart,
  userSuccess,
  userFail,
  setSelectedUser,
} from "@/store/user/user-slice";

export class UserService {
  static url = "https://benion-vics-api.onrender.com/api/v1/users";
  private dispatch: AppDispatch;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  private static getAuthHeader() {
    const token = getCookie("mlToken");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  async getAllUsers() {
    this.dispatch(userStart());
    try {
      const res = await axiosInstance.get(
        `${UserService.url}`,
        UserService.getAuthHeader()
      );
      this.dispatch(userSuccess(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        userFail(error.response?.data?.message || "Failed to fetch Users")
      );
      return Promise.reject(error);
    }
  }

  async getUserById(id: string) {
    this.dispatch(userStart());
    try {
      const res = await axiosInstance.get(
        `${UserService.url}/${id}`,
        UserService.getAuthHeader()
      );
      this.dispatch(setSelectedUser(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        userFail(error.response?.data?.message || "Failed to fetch User")
      );
      return Promise.reject(error);
    }
  }

  async editUser(id: string, payload: Record<string, any>) {
    this.dispatch(userStart());
    try {
      const res = await axiosInstance.put(
        `${UserService.url}/${id}`,
        payload,
        UserService.getAuthHeader()
      );
      this.dispatch(userSuccess(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        userFail(error.response?.data?.message || "Failed to update User")
      );
      return Promise.reject(error);
    }
  }

  async deleteUser(id: string) {
    this.dispatch(userStart());
    try {
      const res = await axiosInstance.delete(
        `${UserService.url}/${id}`,
        UserService.getAuthHeader()
      );
      this.dispatch(userSuccess([]));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        userFail(error.response?.data?.message || "Failed to delete User")
      );
      return Promise.reject(error);
    }
  }

  async createUser(payload: CreateUserProp) {
    this.dispatch(userStart());
    try {
      const res = await axiosInstance.post(
        "https://benion-vics-api.onrender.com/api/v1/users",
        payload
      );
      this.dispatch(userSuccess(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        userFail(error.response?.data?.message || "Failed to create User")
      );
      return Promise.reject(error);
    }
  }
}
