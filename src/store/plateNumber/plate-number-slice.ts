/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlateNumberData } from "./plate-number-types";

interface PlateNumberState {
  plateNumber: PlateNumberData[];
  selectedPlateNumber: any | null;
  success: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: PlateNumberState = {
  plateNumber: [],
  selectedPlateNumber: null,
  isLoading: false,
  error: null,
  success: false,
};

const plateNumberSlice = createSlice({
  name: "platenumber",
  initialState,
  reducers: {
    plateNumberStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    plateNumberSuccess(state, action: PayloadAction<any[]>) {
      state.isLoading = false;
      state.plateNumber = action.payload;
    },
    plateNumberFail(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addPlateNumber(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.success = true;
      state.plateNumber = [...state.plateNumber, action.payload];
    },
    updatePlateNumberInState(state, action: PayloadAction<any>) {
      const index = state.plateNumber.findIndex(
        (order) => order.id === action.payload.id
      );
      if (index !== -1) {
        state.plateNumber[index] = action.payload;
      }
    },
    setSelectedPlateNumber(state, action: PayloadAction<any>) {
      state.selectedPlateNumber = action.payload;
    },
    clearPlateNumber(state) {
      state.plateNumber = [];
    },
  },
});

export const {
  plateNumberStart,
  plateNumberSuccess,
  plateNumberFail,
  setSelectedPlateNumber,
  clearPlateNumber,
  addPlateNumber,
  updatePlateNumberInState,
} = plateNumberSlice.actions;

export default plateNumberSlice.reducer;
