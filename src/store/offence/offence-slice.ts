/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OffenceData } from "./offence-types";

interface OffenceState {
  offences: OffenceData[];
  selectedOffences: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OffenceState = {
  offences: [],
  selectedOffences: null,
  isLoading: false,
  error: null,
};

const offencesSlice = createSlice({
  name: "offences",
  initialState,
  reducers: {
    offenceStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    offenceSuccess(state, action: PayloadAction<any[]>) {
      state.isLoading = false;
      state.offences = action.payload;
    },
    offenceFail(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedOffence(state, action: PayloadAction<any>) {
      state.selectedOffences = action.payload;
    },
    clearOffence(state) {
      state.offences = [];
    },
  },
});

export const {
  offenceStart,
  offenceSuccess,
  offenceFail,
  setSelectedOffence,
  clearOffence,
} = offencesSlice.actions;

export default offencesSlice.reducer;
