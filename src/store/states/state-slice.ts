/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatesData } from "./states-types";

interface StatesState {
  states: StatesData[];
  selectedStates: StatesData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: StatesState = {
  states: [],
  selectedStates: null,
  isLoading: false,
  error: null,
};

const lgaSlice = createSlice({
  name: "states",
  initialState,
  reducers: {
    statesStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    statesSuccess(state, action: PayloadAction<StatesData[]>) {
      state.isLoading = false;
      state.states = action.payload;
    },
    statesFail(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedStates(state, action: PayloadAction<any>) {
      state.states = action.payload;
    },
    clearStates(state) {
      state.states = [];
    },
  },
});

export const {
  statesStart,
  statesSuccess,
  statesFail,
  setSelectedStates,
  clearStates,
} = lgaSlice.actions;

export default lgaSlice.reducer;
