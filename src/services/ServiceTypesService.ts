/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/utils/axios-instance";
import { getCookie } from "cookies-next";
import { AppDispatch } from "@/store/store";
import {
  servicetypeStart,
  servicetypeSuccess,
  servicetypeFail,
  setSelectedServiceType,
} from "@/store/service-type/service-type-slice";
import { CreateStateTypeProps } from "@/store/service-type/service-type-types";

export class ServiceTypeService {
  static url = "https://benion-vics-api.onrender.com/api/v1/invoices";
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

  // Fetch all Service types
  async getAllServiceTypes() {
    this.dispatch(servicetypeStart());
    try {
      const res = await axiosInstance.get(
        `${ServiceTypeService.url}`,
        ServiceTypeService.getAuthHeader()
      );
      this.dispatch(servicetypeSuccess(res.data.data));
    } catch (error: any) {
      this.dispatch(
        servicetypeFail(
          error.response?.data?.message || "Failed to fetch service types"
        )
      );
    }
  }

  // Fetch a single service type by ID
  async getServiceTypeById(id: string) {
    this.dispatch(servicetypeStart());
    try {
      const res = await axiosInstance.get(
        `${ServiceTypeService.url}/${id}`,
        ServiceTypeService.getAuthHeader()
      );
      this.dispatch(setSelectedServiceType(res.data.data));
    } catch (error: any) {
      this.dispatch(
        servicetypeFail(
          error.response?.data?.message || "Failed to fetch service type"
        )
      );
    }
  }

  // Update service type
  async updateServiceType(id: string, payload: Record<string, any>) {
    this.dispatch(servicetypeStart());
    try {
      const res = await axiosInstance.put(
        `${ServiceTypeService.url}/${id}`,
        payload,
        ServiceTypeService.getAuthHeader()
      );
      this.dispatch(servicetypeSuccess(res.data.data));
    } catch (error: any) {
      this.dispatch(
        servicetypeFail(
          error.response?.data?.message || "Failed to update service type"
        )
      );
    }
  }

  // Delete service type
  async deleteServiceType(id: string) {
    this.dispatch(servicetypeStart());
    try {
      await axiosInstance.delete(
        `${ServiceTypeService.url}/${id}`,
        ServiceTypeService.getAuthHeader()
      );
      this.dispatch(servicetypeSuccess([]));
    } catch (error: any) {
      this.dispatch(
        servicetypeFail(
          error.response?.data?.message || "Failed to delete service type"
        )
      );
    }
  }

  // Create a service type
  async createServiceType(payload: CreateStateTypeProps) {
    this.dispatch(servicetypeStart());
    try {
      const res = await axiosInstance.post(ServiceTypeService.url, payload);
      this.dispatch(servicetypeSuccess(res.data.data));
    } catch (error: any) {
      this.dispatch(
        servicetypeFail(
          error.response?.data?.message || "Failed to create service type"
        )
      );
    }
  }
}
