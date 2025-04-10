/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InvoiceTypeData } from "./invoice-type-types";

interface InvoiceTypeState {
  invoiceType: InvoiceTypeData[];
  selectedInvoiceType: InvoiceTypeData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: InvoiceTypeState = {
  invoiceType: [],
  selectedInvoiceType: null,
  isLoading: false,
  error: null,
};

const invoiceTypeSlice = createSlice({
  name: "invoicetype",
  initialState,
  reducers: {
    invoicetypeStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    invoicetypeSuccess(state, action: PayloadAction<any[]>) {
      state.isLoading = false;
      state.invoiceType = action.payload;
    },
    invoicetypeFail(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedInvoiceType(state, action: PayloadAction<any>) {
      state.selectedInvoiceType = action.payload;
    },
    clearInvoiceType(state) {
      state.invoiceType = [];
    },
  },
});

export const {
  invoicetypeStart,
  invoicetypeSuccess,
  invoicetypeFail,
  setSelectedInvoiceType,
  clearInvoiceType,
} = invoiceTypeSlice.actions;

export default invoiceTypeSlice.reducer;
