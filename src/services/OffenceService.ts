/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/utils/axios-instance";
import { getCookie } from "cookies-next";
import { AppDispatch } from "@/store/store";
import {
  offenceStart,
  offenceSuccess,
  offenceFail,
  setSelectedOffence,
} from "@/store/offence/offence-slice";
import { CreateOffenceProps } from "@/store/offence/offence-types";

export class OffenceService {
  static url = `${process.env.NEXT_PUBLIC_API_URL}/offences`;
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

  async getAllOffences() {
    this.dispatch(offenceStart());
    try {
      const res = await axiosInstance.get(
        `${OffenceService.url}`,
        OffenceService.getAuthHeader()
      );
      this.dispatch(offenceSuccess(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        offenceFail(error.response?.data?.message || "Failed to fetch Offences")
      );
      return Promise.reject(error);
    }
  }

  async getOffencesById(id: string) {
    this.dispatch(offenceStart());
    try {
      const res = await axiosInstance.get(
        `${OffenceService.url}/${id}`,
        OffenceService.getAuthHeader()
      );
      this.dispatch(setSelectedOffence(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        offenceFail(error.response?.data?.message || "Failed to fetch Offence")
      );
      return Promise.reject(error);
    }
  }

  async updateOffence(id: string, payload: Record<string, any>) {
    this.dispatch(offenceStart());
    try {
      const res = await axiosInstance.put(
        `${OffenceService.url}/${id}`,
        payload,
        OffenceService.getAuthHeader()
      );
      this.dispatch(offenceSuccess(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        offenceFail(error.response?.data?.message || "Failed to update Offence")
      );
      return Promise.reject(error);
    }
  }

  async deleteOffence(id: string) {
    this.dispatch(offenceStart());
    try {
      await axiosInstance.delete(
        `${OffenceService.url}/${id}`,
        OffenceService.getAuthHeader()
      );
      this.dispatch(offenceSuccess([]));
      return { success: true };
    } catch (error: any) {
      this.dispatch(
        offenceFail(error.response?.data?.message || "Failed to delete Offence")
      );
      return Promise.reject(error);
    }
  }

  async createOffence(payload: CreateOffenceProps) {
    this.dispatch(offenceStart());
    try {
      const res = await axiosInstance.post(`${OffenceService.url}`, payload);
      this.dispatch(offenceSuccess(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        offenceFail(error.response?.data?.message || "Failed to create Offence")
      );
      return Promise.reject(error);
    }
  }
}
