/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/utils/axios-instance";
import { getCookie } from "cookies-next";
import { AppDispatch } from "@/store/store";
import {
  plateNumberOrderStart,
  plateNumberOrderSuccess,
  plateNumberOrderFail,
  setSelectedPlateNumberOrder,
  addPlateNumberOrder,
  updatePlateNumberOrderInState,
} from "@/store/plate-number-orders/plate-number-order-slice";
import { CreatePlateNumberOrderProps } from "@/store/plate-number-orders/plate-number-order-types";

export class PlateNumberOrderService {
  static url =
    "https://benion-vics-api.onrender.com/api/v1/plate_number_orders";
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

  // Fetch all Plate Number Orders
  async getAllPlateNumberOrders() {
    this.dispatch(plateNumberOrderStart());
    try {
      const res = await axiosInstance.get(
        `${PlateNumberOrderService.url}`,
        PlateNumberOrderService.getAuthHeader()
      );
      this.dispatch(plateNumberOrderSuccess(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        plateNumberOrderFail(
          error.response?.data?.message || "Failed to fetch plate numbers order"
        )
      );
      return Promise.reject(error);
    }
  }

  // Fetch a single Plate Number Order by ID
  async getPlateNumberOrderId(id: string) {
    this.dispatch(plateNumberOrderStart());
    try {
      const res = await axiosInstance.get(
        `${PlateNumberOrderService.url}/${id}`,
        PlateNumberOrderService.getAuthHeader()
      );
      this.dispatch(setSelectedPlateNumberOrder(res.data.data));
    } catch (error: any) {
      this.dispatch(
        plateNumberOrderFail(
          error.response?.data?.message || "Failed to fetch plate number order"
        )
      );
      return Promise.reject(error);
    }
  }

  // Update a Plate Number Order
  async updatePlateNumberOrder(id: string, payload: Record<string, any>) {
    this.dispatch(plateNumberOrderStart());
    try {
      const res = await axiosInstance.put(
        `${PlateNumberOrderService.url}/${id}`,
        payload,
        PlateNumberOrderService.getAuthHeader()
      );
      this.dispatch(updatePlateNumberOrderInState(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        plateNumberOrderFail(
          error.response?.data?.message || "Failed to update plate number order"
        )
      );
      return Promise.reject(error);
    }
  }

  // Delete a plate number order
  async deletePlateNumberOrder(id: string) {
    this.dispatch(plateNumberOrderStart());
    try {
      await axiosInstance.delete(
        `${PlateNumberOrderService.url}/${id}`,
        PlateNumberOrderService.getAuthHeader()
      );
      this.dispatch(plateNumberOrderSuccess([]));
      return { success: true };
    } catch (error: any) {
      this.dispatch(
        plateNumberOrderFail(
          error.response?.data?.message || "Failed to delete plate number order"
        )
      );
      return Promise.reject(error);
    }
  }

  // Create a plate number order
  async createPlateNumberOrder(payload: CreatePlateNumberOrderProps) {
    this.dispatch(plateNumberOrderStart());
    try {
      const res = await axiosInstance.post(
        `${PlateNumberOrderService.url}`,
        payload,
        PlateNumberOrderService.getAuthHeader()
      );
      this.dispatch(addPlateNumberOrder(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        plateNumberOrderFail(
          error.response?.data?.message || "Failed to create plate number order"
        )
      );
      return Promise.reject(error);
    }
  }
}
