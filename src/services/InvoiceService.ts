/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/utils/axios-instance";
import { getCookie } from "cookies-next";
import { AppDispatch } from "@/store/store";
import {
  invoiceStart,
  invoiceSuccess,
  invoiceFail,
  setSelectedInvoice,
} from "@/store/invoice/invoice-slice";
import { CreateInvoicePayload } from "@/store/invoice/invoice-types";
import { host } from "@/utils/helpers";

export class InvoiceService {
  static url = `${host}/invoices`;
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

  // Fetch all invoices
  async getAllInvoices() {
    this.dispatch(invoiceStart());
    try {
      const res = await axiosInstance.get(
        `${InvoiceService.url}`,
        InvoiceService.getAuthHeader()
      );
      this.dispatch(invoiceSuccess(res.data.data));
    } catch (error: any) {
      this.dispatch(
        invoiceFail(error.response?.data?.message || "Failed to fetch invoice")
      );
    }
  }

  // Fetch a single invoice by ID
  async getInvoiceById(id: string) {
    this.dispatch(invoiceStart());
    try {
      const res = await axiosInstance.get(
        `${InvoiceService.url}/${id}`,
        InvoiceService.getAuthHeader()
      );
      this.dispatch(setSelectedInvoice(res.data.data));
    } catch (error: any) {
      this.dispatch(
        invoiceFail(error.response?.data?.message || "Failed to fetch invoice")
      );
    }
  }

  // Update an existing invoice
  async updateInvoice(id: string, payload: Record<string, any>) {
    this.dispatch(invoiceStart());
    try {
      const res = await axiosInstance.put(
        `${InvoiceService.url}/${id}`,
        payload,
        InvoiceService.getAuthHeader()
      );
      this.dispatch(invoiceSuccess(res.data.data));
    } catch (error: any) {
      this.dispatch(
        invoiceFail(error.response?.data?.message || "Failed to update invoice")
      );
    }
  }

  // Delete an invoice
  async deleteInvoice(id: string) {
    this.dispatch(invoiceStart());
    try {
      await axiosInstance.delete(
        `${InvoiceService.url}/${id}`,
        InvoiceService.getAuthHeader()
      );
      this.dispatch(invoiceSuccess([]));
    } catch (error: any) {
      this.dispatch(
        invoiceFail(error.response?.data?.message || "Failed to delete Invoice")
      );
    }
  }

  // Create a new invoice
  async createInvoice(payload: CreateInvoicePayload) {
    this.dispatch(invoiceStart());
    try {
      const res = await axiosInstance.post(InvoiceService.url, payload);
      this.dispatch(invoiceSuccess(res.data.data));
    } catch (error: any) {
      this.dispatch(
        invoiceFail(error.response?.data?.message || "Failed to create invoice")
      );
    }
  }
}
