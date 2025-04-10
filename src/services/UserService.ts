import axiosInstance from "@/utils/axios-instance";
import { User } from "@/store/auth/auth-user-types";

export class UserService {
  private static getAuthHeader() {
    const token = localStorage.getItem("mlToken");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  static async getAllUsers() {
    const res = await axiosInstance.get(
      "https://benion-vics-api.onrender.com/api/v1/users",
      this.getAuthHeader()
    );
    return res.data;
  }

  static async getUserById(id: string) {
    const res = await axiosInstance.get(
      `https://benion-vics-api.onrender.com/api/v1/users/${id}`,
      this.getAuthHeader()
    );
    return res.data;
  }

  static async editUser(id: string, payload: Record<string, any>) {
    const res = await axiosInstance.put(
      `https://benion-vics-api.onrender.com/api/v1/users/${id}`,
      payload,
      this.getAuthHeader()
    );
    return res.data;
  }

  static async deleteUser(id: string) {
    const res = await axiosInstance.delete(
      `https://benion-vics-api.onrender.com/api/v1/users/${id}`,
      this.getAuthHeader()
    );
    return res.data;
  }

  static async createUser(payload: User) {
    const res = await axiosInstance.post(
      "https://benion-vics-api.onrender.com/api/v1/users",
      payload
    );
    return res.data;
  }
}
