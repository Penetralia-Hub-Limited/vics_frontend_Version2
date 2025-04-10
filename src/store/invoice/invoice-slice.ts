/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InvoiceData } from "./invoice-types";

interface CompanyState {
  invoices: InvoiceData[];
  selectedInvoice: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CompanyState = {
  invoices: [],
  selectedInvoice: null,
  isLoading: false,
  error: null,
};

const companySlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    invoiceStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    invoiceSuccess(state, action: PayloadAction<any[]>) {
      state.isLoading = false;
      state.invoices = action.payload;
    },
    invoiceFail(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedInvoice(state, action: PayloadAction<any>) {
      state.selectedInvoice = action.payload;
    },
    clearInvoice(state) {
      state.invoices = [];
    },
  },
});

export const {
  invoiceStart,
  invoiceSuccess,
  invoiceFail,
  setSelectedInvoice,
  clearInvoice,
} = companySlice.actions;

export default companySlice.reducer;
