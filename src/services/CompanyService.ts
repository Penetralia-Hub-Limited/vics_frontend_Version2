/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/utils/axios-instance";
import { getCookie } from "cookies-next";
import { AppDispatch } from "@/store/store";
import { CreateCompanyProps } from "@/store/company/company-types";
import {
  companyStart,
  companySuccess,
  companyFail,
  setSelectedCompany,
} from "@/store/company/company-slice";

export class CompanyService {
  static url = `${process.env.NEXT_PUBLIC_API_URL}/companies`;
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

  async getAllCompanies() {
    this.dispatch(companyStart());
    try {
      const res = await axiosInstance.get(
        `${CompanyService.url}`,
        CompanyService.getAuthHeader()
      );
      this.dispatch(companySuccess(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        companyFail(
          error.response?.data?.message || "Failed to fetch Companies"
        )
      );
      return Promise.reject(error);
    }
  }

  async getCompanyById(id: string) {
    this.dispatch(companyStart());
    try {
      const res = await axiosInstance.get(
        `${CompanyService.url}/${id}`,
        CompanyService.getAuthHeader()
      );
      this.dispatch(setSelectedCompany(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        companyFail(error.response?.data?.message || "Failed to fetch Company")
      );
      return Promise.reject(error);
    }
  }

  async updateCompany(id: string, payload: Record<string, any>) {
    this.dispatch(companyStart());
    try {
      const res = await axiosInstance.put(
        `${CompanyService.url}/${id}`,
        payload,
        CompanyService.getAuthHeader()
      );
      this.dispatch(companySuccess(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        companyFail(error.response?.data?.message || "Failed to update Company")
      );
      return Promise.reject(error);
    }
  }

  async deleteCompany(id: string) {
    this.dispatch(companyStart());
    try {
      await axiosInstance.delete(
        `${CompanyService.url}/${id}`,
        CompanyService.getAuthHeader()
      );
      this.dispatch(companySuccess([]));
      return { success: true };
    } catch (error: any) {
      this.dispatch(
        companyFail(error.response?.data?.message || "Failed to delete Company")
      );
      return Promise.reject(error);
    }
  }

  async createCompany(payload: CreateCompanyProps) {
    this.dispatch(companyStart());
    try {
      const res = await axiosInstance.post(`${CompanyService.url}`, payload);
      this.dispatch(companySuccess(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        companyFail(error.response?.data?.message || "Failed to create Company")
      );
      return Promise.reject(error);
    }
  }
}
