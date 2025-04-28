/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyData } from "./company-types";

interface CompanyState {
  companies: CompanyData[];
  selectedCompany: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CompanyState = {
  companies: [],
  selectedCompany: null,
  isLoading: false,
  error: null,
};

const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    companyStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    companySuccess(state, action: PayloadAction<any[]>) {
      state.isLoading = false;
      state.companies = action.payload;
    },
    companyFail(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedCompany(state, action: PayloadAction<any>) {
      state.selectedCompany = action.payload;
    },
    clearCompany(state) {
      state.companies = [];
    },
  },
});

export const {
  companyStart,
  companySuccess,
  companyFail,
  setSelectedCompany,
  clearCompany,
} = companySlice.actions;

export default companySlice.reducer;
