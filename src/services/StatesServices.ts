/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/utils/axios-instance";
import { StatesProps } from "@/store/states/states-types";
import { getCookie } from "cookies-next";
import {
  statesStart,
  statesSuccess,
  statesFail,
  setSelectedStates,
} from "@/store/states/state-slice";
import { AppDispatch } from "@/store/store";

export class StateService {
  static url = `${process.env.NEXT_PUBLIC_API_URL}/states`;
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
  async getAllStates() {
    this.dispatch(statesStart());
    try {
      const res = await axiosInstance.get(
        `${StateService.url}`,
        StateService.getAuthHeader()
      );
      this.dispatch(statesSuccess(res.data.data));
    } catch (error: any) {
      this.dispatch(
        statesFail(error.response?.data?.message || "Failed to fetch states")
      );
    }
  }

  // Fetch a single state by ID
  async getStateById(id: string) {
    this.dispatch(statesStart());
    try {
      const res = await axiosInstance.get(
        `${StateService.url}/${id}`,
        StateService.getAuthHeader()
      );
      this.dispatch(setSelectedStates(res.data.data));
    } catch (error: any) {
      this.dispatch(
        statesFail(error.response?.data?.message || "Failed to fetch state")
      );
    }
  }

  // Update an existing state
  async updateState(id: string, payload: Record<string, any>) {
    this.dispatch(statesStart());
    try {
      const res = await axiosInstance.put(
        `${StateService.url}/${id}`,
        payload,
        StateService.getAuthHeader()
      );
      this.dispatch(statesSuccess(res.data.data));
    } catch (error: any) {
      this.dispatch(
        statesFail(error.response?.data?.message || "Failed to update state")
      );
    }
  }

  // Delete a state
  async deleteState(id: string) {
    this.dispatch(statesStart());
    try {
      await axiosInstance.delete(
        `${StateService.url}/${id}`,
        StateService.getAuthHeader()
      );
      this.dispatch(statesSuccess([]));
    } catch (error: any) {
      this.dispatch(
        statesFail(error.response?.data?.message || "Failed to delete state")
      );
    }
  }

  // Create a new state
  async createState(payload: StatesProps) {
    this.dispatch(statesStart());
    try {
      const res = await axiosInstance.post(StateService.url, payload);
      this.dispatch(statesSuccess(res.data.data)); // Add newly created state to the list
    } catch (error: any) {
      this.dispatch(
        statesFail(error.response?.data?.message || "Failed to create state")
      );
    }
  }
}
