/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlateNumberData } from "./plate-number-types";

interface PlateNumberState {
  plateNumber: PlateNumberData[];
  selectedPlateNumber: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PlateNumberState = {
  plateNumber: [],
  selectedPlateNumber: null,
  isLoading: false,
  error: null,
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
} = plateNumberSlice.actions;

export default plateNumberSlice.reducer;
