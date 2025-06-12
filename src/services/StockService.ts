/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/utils/axios-instance";
import { EnterStockProps } from "@/store/stock/stock-types";
import { getCookie } from "cookies-next";
import { AppDispatch } from "@/store/store";
import {
  stockStart,
  stockSuccess,
  stockFail,
  addPlateStock,
  setSelectedStock,
  updateStocksInState,
} from "@/store/stock/stock-slice";
import { host } from "@/utils/helpers";

export class StockService {
  static url = `${host}/stocks`;
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

  // Fetch all New Stock
  async getAllStock() {
    this.dispatch(stockStart());
    try {
      const res = await axiosInstance.get(
        `${StockService.url}`,
        StockService.getAuthHeader()
      );
      this.dispatch(stockSuccess(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        stockFail(error.response?.data?.message || "Failed to fetch New Stocks")
      );
      return Promise.reject(error);
    }
  }

  // Fetch a single New Stock by ID
  async getStockByID(id: string) {
    this.dispatch(stockStart());
    try {
      const res = await axiosInstance.get(
        `${StockService.url}/${id}`,
        StockService.getAuthHeader()
      );
      this.dispatch(setSelectedStock(res.data.data));
    } catch (error: any) {
      this.dispatch(
        stockFail(error.response?.data?.message || "Failed to fetch New Stock")
      );
      return Promise.reject(error);
    }
  }

  // Update a New Stock
  async updateStock(id: string, payload: EnterStockProps) {
    this.dispatch(stockStart());
    try {
      const res = await axiosInstance.put(
        `${StockService.url}/${id}`,
        payload,
        StockService.getAuthHeader()
      );
      this.dispatch(updateStocksInState(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        stockFail(error.response?.data?.message || "Failed to update New Stock")
      );
      return Promise.reject(error);
    }
  }

  // Delete a New Stock
  async deleteStock(id: string) {
    this.dispatch(stockStart());
    try {
      await axiosInstance.delete(
        `${StockService.url}/${id}`,
        StockService.getAuthHeader()
      );
      this.dispatch(stockSuccess([]));
      return { success: true };
    } catch (error: any) {
      this.dispatch(
        stockFail(error.response?.data?.message || "Failed to delete New Stock")
      );
      return Promise.reject(error);
    }
  }

  // Create a New Stock
  async createNewStock(payload: EnterStockProps) {
    this.dispatch(stockStart());
    try {
      const res = await axiosInstance.post(`${StockService.url}`, payload);
      this.dispatch(addPlateStock(res.data.data));
      return res.data;
    } catch (error: any) {
      this.dispatch(
        stockFail(error.response?.data?.message || "Failed to create New Stock")
      );
      return Promise.reject(error);
    }
  }
}
