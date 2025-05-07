/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/utils/axios-instance";
import { getCookie } from "cookies-next";
import { AppDispatch } from "@/store/store";
import {
  invoicetypeStart,
  invoicetypeSuccess,
  invoicetypeFail,
  setSelectedInvoiceType,
} from "@/store/invoice-type/invoice-type-slice";
import { CreateInvoiceTypeProps } from "@/store/invoice-type/invoice-type-types";

export class InvoiceTypeService {
  static url = `${process.env.NEXT_PUBLIC_API_URL}/invoice_types`;
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

  // Fetch all invoice types
  async getAllServiceTypes() {
    this.dispatch(invoicetypeStart());
    try {
      const res = await axiosInstance.get(
        `${InvoiceTypeService.url}`,
        InvoiceTypeService.getAuthHeader()
      );
      this.dispatch(invoicetypeSuccess(res.data.data));
    } catch (error: any) {
      this.dispatch(
        invoicetypeFail(
          error.response?.data?.message || "Failed to fetch invoice types"
        )
      );
    }
  }

  // Fetch a single invoice type by ID
  async getServiceTypeById(id: string) {
    this.dispatch(invoicetypeStart());
    try {
      const res = await axiosInstance.get(
        `${InvoiceTypeService.url}/${id}`,
        InvoiceTypeService.getAuthHeader()
      );
      this.dispatch(setSelectedInvoiceType(res.data.data));
    } catch (error: any) {
      this.dispatch(
        invoicetypeFail(
          error.response?.data?.message || "Failed to fetch invoice type"
        )
      );
    }
  }

  // Update invoice type
  async updateServiceType(id: string, payload: Record<string, any>) {
    this.dispatch(invoicetypeStart());
    try {
      const res = await axiosInstance.put(
        `${InvoiceTypeService.url}/${id}`,
        payload,
        InvoiceTypeService.getAuthHeader()
      );
      this.dispatch(invoicetypeSuccess(res.data.data));
    } catch (error: any) {
      this.dispatch(
        invoicetypeFail(
          error.response?.data?.message || "Failed to update invoice type"
        )
      );
    }
  }

  // Delete invoice type
  async deleteServiceType(id: string) {
    this.dispatch(invoicetypeStart());
    try {
      await axiosInstance.delete(
        `${InvoiceTypeService.url}/${id}`,
        InvoiceTypeService.getAuthHeader()
      );
      this.dispatch(invoicetypeSuccess([]));
    } catch (error: any) {
      this.dispatch(
        invoicetypeFail(
          error.response?.data?.message || "Failed to delete invoice type"
        )
      );
    }
  }

  // Create an invoice type
  async createServiceType(payload: CreateInvoiceTypeProps) {
    this.dispatch(invoicetypeStart());
    try {
      const res = await axiosInstance.post(InvoiceTypeService.url, payload);
      this.dispatch(invoicetypeSuccess(res.data.data));
    } catch (error: any) {
      this.dispatch(
        invoicetypeFail(
          error.response?.data?.message || "Failed to create invoice type"
        )
      );
    }
  }
}
