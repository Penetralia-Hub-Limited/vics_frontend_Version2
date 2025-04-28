/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/utils/axios-instance";
import { getCookie } from "cookies-next";
import { AppDispatch } from "@/store/store";
import {
  vehiclesStart,
  vehiclesSuccess,
  vehiclesFail,
  setSelectedVehicles,
  addNewVehicle,
} from "@/store/vehicle/vehicle-slice";
import { CreateVehiclePayload } from "@/store/vehicle/vehicle-type";

export class VehicleService {
  static url = "https://benion-vics-api.onrender.com/api/v1/vehicles";
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

  // Fetch all states
  async getAllVehicles() {
    this.dispatch(vehiclesStart());
    try {
      const res = await axiosInstance.get(
        `${VehicleService.url}`,
        VehicleService.getAuthHeader()
      );
      this.dispatch(vehiclesSuccess(res.data.data));
    } catch (error: any) {
      this.dispatch(
        vehiclesFail(
          error.response?.data?.message || "Failed to fetch vehicles"
        )
      );
    }
  }

  // Fetch a single state by ID
  async getVehicleById(id: string) {
    this.dispatch(vehiclesStart());
    try {
      const res = await axiosInstance.get(
        `${VehicleService.url}/${id}`,
        VehicleService.getAuthHeader()
      );
      this.dispatch(setSelectedVehicles(res.data.data));
    } catch (error: any) {
      this.dispatch(
        vehiclesFail(error.response?.data?.message || "Failed to fetch vehicle")
      );
    }
  }

  // Update an existing state
  async updateVehicle(id: string, payload: Record<string, any>) {
    this.dispatch(vehiclesStart());
    try {
      const res = await axiosInstance.put(
        `${VehicleService.url}/${id}`,
        payload,
        VehicleService.getAuthHeader()
      );
      this.dispatch(vehiclesSuccess(res.data.data));
    } catch (error: any) {
      this.dispatch(
        vehiclesFail(
          error.response?.data?.message || "Failed to update vehicle"
        )
      );
    }
  }

  // Delete a state
  async deleteVehicle(id: string) {
    this.dispatch(vehiclesStart());
    try {
      await axiosInstance.delete(
        `${VehicleService.url}/${id}`,
        VehicleService.getAuthHeader()
      );
      this.dispatch(vehiclesSuccess([]));
    } catch (error: any) {
      this.dispatch(
        vehiclesFail(
          error.response?.data?.message || "Failed to delete Vehicle"
        )
      );
    }
  }

  // Create a new state
  async createVehicle(payload: CreateVehiclePayload) {
    this.dispatch(vehiclesStart());
    try {
      const res = await axiosInstance.post(VehicleService.url, payload);
      this.dispatch(addNewVehicle(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        vehiclesFail(
          error.response?.data?.message || "Failed to create Vehicle"
        )
      );
    }
  }
}
