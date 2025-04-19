/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VehicleData } from "./vehicle-type";

interface VehicleState {
  vehicles: VehicleData[];
  selectedStates: VehicleData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: VehicleState = {
  vehicles: [],
  selectedStates: null,
  isLoading: false,
  error: null,
};

const lgaSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    vehiclesStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    vehiclesSuccess(state, action: PayloadAction<any[]>) {
      state.isLoading = false;
      state.vehicles = action.payload;
    },
    vehiclesFail(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedVehicles(state, action: PayloadAction<any>) {
      state.vehicles = action.payload;
    },
    clearVehicles(state) {
      state.vehicles = [];
    },
  },
});

export const {
  vehiclesStart,
  vehiclesSuccess,
  vehiclesFail,
  setSelectedVehicles,
  clearVehicles,
} = lgaSlice.actions;

export default lgaSlice.reducer;
