import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
}

interface VehicleState {
  vehicles: Vehicle[];
}

const initialState: VehicleState = {
  vehicles: [],
};

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    addVehicle: (state, action: PayloadAction<Vehicle>) => {
      state.vehicles.push(action.payload);
    },
    removeVehicle: (state, action: PayloadAction<string>) => {
      state.vehicles = state.vehicles.filter((v) => v.id !== action.payload);
    },
  },
});

export const { addVehicle, removeVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;
