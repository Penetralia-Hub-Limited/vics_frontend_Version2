/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LGAData } from "./lga-type";

interface LGAState {
  lgas: LGAData[];
  selectedLGA: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: LGAState = {
  lgas: [],
  selectedLGA: null,
  isLoading: false,
  error: null,
};

const lgaSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    lgaStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    lgaSuccess(state, action: PayloadAction<any[]>) {
      state.isLoading = false;
      state.lgas = action.payload;
    },
    lgaFail(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedLGA(state, action: PayloadAction<any>) {
      state.selectedLGA = action.payload;
    },
    clearLGA(state) {
      state.lgas = [];
    },
  },
});

export const { lgaStart, lgaSuccess, lgaFail, setSelectedLGA, clearLGA } =
  lgaSlice.actions;

export default lgaSlice.reducer;
