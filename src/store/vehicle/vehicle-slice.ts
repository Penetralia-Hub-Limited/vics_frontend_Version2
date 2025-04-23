/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VehicleData } from "./vehicle-type";

interface VehicleState {
  vehicles: VehicleData[];
  selectedStates: VehicleData | null;
  isLoading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: VehicleState = {
  vehicles: [],
  selectedStates: null,
  isLoading: false,
  error: null,
  success: false,
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
      state.success = true;
      state.vehicles = action.payload;
    },
    vehiclesFail(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.success = false;
      state.error = action.payload;
    },
    setSelectedVehicles(state, action: PayloadAction<any>) {
      state.vehicles = action.payload;
    },
    addNewVehicle(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.success = true;
      state.vehicles = [...state.vehicles, action.payload];
    },
    updateVehicleInState(state, action: PayloadAction<any>) {
      const index = state.vehicles.findIndex(
        (vehicle) => vehicle.id === action.payload.id
      );
      if (index !== -1) {
        state.vehicles[index] = action.payload;
      }
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
  addNewVehicle,
  updateVehicleInState,
} = lgaSlice.actions;

export default lgaSlice.reducer;
