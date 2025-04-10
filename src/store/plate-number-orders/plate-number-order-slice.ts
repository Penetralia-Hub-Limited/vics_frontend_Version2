/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlateNumberOrderData } from "./plate-number-order-types";

interface PlateNumberState {
  plateNumberOrder: PlateNumberOrderData[];
  selectedPlateNumberOrder: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PlateNumberState = {
  plateNumberOrder: [],
  selectedPlateNumberOrder: null,
  isLoading: false,
  error: null,
};

const plateNumberOrderSlice = createSlice({
  name: "platenumberorder",
  initialState,
  reducers: {
    plateNumberOrderStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    plateNumberOrderSuccess(state, action: PayloadAction<any[]>) {
      state.isLoading = false;
      state.plateNumberOrder = action.payload;
    },
    plateNumberOrderFail(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedPlateNumberOrder(state, action: PayloadAction<any>) {
      state.selectedPlateNumberOrder = action.payload;
    },
    clearPlateNumberOrder(state) {
      state.plateNumberOrder = [];
    },
  },
});

export const {
  plateNumberOrderStart,
  plateNumberOrderSuccess,
  plateNumberOrderFail,
  setSelectedPlateNumberOrder,
  clearPlateNumberOrder,
} = plateNumberOrderSlice.actions;

export default plateNumberOrderSlice.reducer;
