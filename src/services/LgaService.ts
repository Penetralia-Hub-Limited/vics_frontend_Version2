/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/utils/axios-instance";
import { getCookie } from "cookies-next";
import { AppDispatch } from "@/store/store";
import {
  lgaStart,
  lgaSuccess,
  lgaFail,
  setSelectedLGA,
} from "@/store/lgas/lga-slice";
import { CreateLGAProps } from "@/store/lgas/lga-type";
import { host } from "@/utils/helpers";

export class LgaService {
  static url = `${host}/lgas`;
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

  async getAllLgas() {
    this.dispatch(lgaStart());
    try {
      const res = await axiosInstance.get(
        `${LgaService.url}`,
        LgaService.getAuthHeader()
      );
      this.dispatch(lgaSuccess(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        lgaFail(error.response?.data?.message || "Failed to fetch LGAs")
      );
      return Promise.reject(error);
    }
  }

  async getLGAById(id: string) {
    this.dispatch(lgaStart());
    try {
      const res = await axiosInstance.get(
        `${LgaService.url}/${id}`,
        LgaService.getAuthHeader()
      );
      this.dispatch(setSelectedLGA(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        lgaFail(error.response?.data?.message || "Failed to fetch LGA")
      );
      return Promise.reject(error);
    }
  }

  async updateLga(id: string, payload: Record<string, any>) {
    this.dispatch(lgaStart());
    try {
      const res = await axiosInstance.put(
        `${LgaService.url}/${id}`,
        payload,
        LgaService.getAuthHeader()
      );
      this.dispatch(lgaSuccess(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        lgaFail(error.response?.data?.message || "Failed to update LGA")
      );
      return Promise.reject(error);
    }
  }

  async deleteLga(id: string) {
    this.dispatch(lgaStart());
    try {
      await axiosInstance.delete(
        `${LgaService.url}/${id}`,
        LgaService.getAuthHeader()
      );
      this.dispatch(lgaSuccess([]));
      return { success: true };
    } catch (error: any) {
      this.dispatch(
        lgaFail(error.response?.data?.message || "Failed to delete LGA")
      );
      return Promise.reject(error);
    }
  }

  async createLga(payload: CreateLGAProps) {
    this.dispatch(lgaStart());
    try {
      const res = await axiosInstance.post(`${LgaService.url}`, payload);
      this.dispatch(lgaSuccess(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        lgaFail(error.response?.data?.message || "Failed to create LGA")
      );
      return Promise.reject(error);
    }
  }
}
