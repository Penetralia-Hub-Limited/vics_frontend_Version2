/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServiceTypeData } from "./service-type-types";

interface ServiceTypeState {
  servicetype: ServiceTypeData[];
  selectedServiceType: ServiceTypeData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ServiceTypeState = {
  servicetype: [],
  selectedServiceType: null,
  isLoading: false,
  error: null,
};

const serviceTypeSlice = createSlice({
  name: "servicetype",
  initialState,
  reducers: {
    servicetypeStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    servicetypeSuccess(state, action: PayloadAction<any[]>) {
      state.isLoading = false;
      state.servicetype = action.payload;
    },
    servicetypeFail(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedServiceType(state, action: PayloadAction<any>) {
      state.selectedServiceType = action.payload;
    },
    clearServiceType(state) {
      state.servicetype = [];
    },
  },
});

export const {
  servicetypeStart,
  servicetypeSuccess,
  servicetypeFail,
  setSelectedServiceType,
  clearServiceType,
} = serviceTypeSlice.actions;

export default serviceTypeSlice.reducer;
