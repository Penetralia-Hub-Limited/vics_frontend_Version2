/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlateNumberOrderData } from "./plate-number-order-types";
// import { PaginationProp } from "@/common/types";

interface PlateNumberState {
  plateNumberOrder: PlateNumberOrderData[];
  selectedPlateNumberOrder: any | null;
  isLoading: boolean;
  success: boolean;
  error: string | null;
  pagination: any | null;
}

const initialState: PlateNumberState = {
  plateNumberOrder: [],
  selectedPlateNumberOrder: null,
  isLoading: false,
  success: false,
  error: null,
  pagination: null,
};

const plateNumberOrderSlice = createSlice({
  name: "platenumberorder",
  initialState,
  reducers: {
    plateNumberOrderStart(state) {
      state.isLoading = true;
      state.error = null;
      state.success = false;
    },
    plateNumberOrderSuccess(state, action: PayloadAction<any[]>) {
      state.isLoading = false;
      state.success = true;
      state.plateNumberOrder = action.payload;
      state.pagination = action.payload;
    },
    plateNumberOrderFail(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.success = false;
      state.error = action.payload;
    },
    setSelectedPlateNumberOrder(state, action: PayloadAction<any>) {
      state.selectedPlateNumberOrder = action.payload;
    },
    clearPlateNumberOrder(state) {
      state.plateNumberOrder = [];
    },
    addPlateNumberOrder(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.success = true;
      state.plateNumberOrder = [...state.plateNumberOrder, action.payload];
    },
    updatePlateNumberOrderInState(state, action: PayloadAction<any>) {
      const index = state.plateNumberOrder.findIndex(
        (order) => order.id === action.payload.id
      );
      if (index !== -1) {
        state.plateNumberOrder[index] = action.payload;
      }
    },
    deletePlateNumberOrderFromState(state, action: PayloadAction<string>) {
      state.plateNumberOrder = state.plateNumberOrder.filter(
        (order) => order.id !== action.payload
      );
    },
  },
});

export const {
  plateNumberOrderStart,
  plateNumberOrderSuccess,
  plateNumberOrderFail,
  setSelectedPlateNumberOrder,
  clearPlateNumberOrder,
  addPlateNumberOrder,
  deletePlateNumberOrderFromState,
  updatePlateNumberOrderInState,
} = plateNumberOrderSlice.actions;

export default plateNumberOrderSlice.reducer;
