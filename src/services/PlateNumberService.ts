/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/utils/axios-instance";
import { PlateNumberProps } from "@/store/plateNumber/plate-number-types";
import { getCookie } from "cookies-next";
import { AppDispatch } from "@/store/store";
import {
  plateNumberStart,
  plateNumberSuccess,
  plateNumberFail,
  setSelectedPlateNumber,
} from "@/store/plateNumber/plate-number-slice";

export class PlateNumberService {
  static url = "https://benion-vics-api.onrender.com/api/v1/plate_numbers";
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

  // Fetch all Plate Number
  async getAllPlateNumbers() {
    this.dispatch(plateNumberStart());
    try {
      const res = await axiosInstance.get(
        `${PlateNumberService.url}`,
        PlateNumberService.getAuthHeader()
      );
      this.dispatch(plateNumberSuccess(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        plateNumberFail(
          error.response?.data?.message || "Failed to fetch plate numbers"
        )
      );
      return Promise.reject(error);
    }
  }

  // Fetch a single Plate Number by ID
  async getPlateNumberId(id: string) {
    this.dispatch(plateNumberStart());
    try {
      const res = await axiosInstance.get(
        `${PlateNumberService.url}/${id}`,
        PlateNumberService.getAuthHeader()
      );
      this.dispatch(setSelectedPlateNumber(res.data.data));
    } catch (error: any) {
      this.dispatch(
        plateNumberFail(
          error.response?.data?.message || "Failed to fetch plate number"
        )
      );
      return Promise.reject(error);
    }
  }

  // Update a Plate Number
  async updatePlateNumber(id: string, payload: Record<string, any>) {
    this.dispatch(plateNumberStart());
    try {
      const res = await axiosInstance.put(
        `${PlateNumberService.url}/${id}`,
        payload,
        PlateNumberService.getAuthHeader()
      );
      this.dispatch(plateNumberSuccess(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        plateNumberFail(
          error.response?.data?.message || "Failed to update plate number"
        )
      );
      return Promise.reject(error);
    }
  }

  // Delete a plate number
  async deletePlateNumber(id: string) {
    this.dispatch(plateNumberStart());
    try {
      await axiosInstance.delete(
        `${PlateNumberService.url}/${id}`,
        PlateNumberService.getAuthHeader()
      );
      this.dispatch(plateNumberSuccess([]));
      return { success: true };
    } catch (error: any) {
      this.dispatch(
        plateNumberFail(
          error.response?.data?.message || "Failed to delete plate number"
        )
      );
      return Promise.reject(error);
    }
  }

  // Create a plate number
  async createPlateNumber(payload: PlateNumberProps) {
    this.dispatch(plateNumberStart());
    try {
      const res = await axiosInstance.post(
        `${PlateNumberService.url}`,
        payload
      );
      this.dispatch(plateNumberSuccess(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        plateNumberFail(
          error.response?.data?.message || "Failed to create plate number"
        )
      );
      return Promise.reject(error);
    }
  }
}
