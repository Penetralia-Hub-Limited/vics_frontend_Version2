/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StockProps } from "./stock-types";

interface StockState {
  stocks: StockProps[];
  selectedStock: StockProps | null;
  isLoading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: StockState = {
  stocks: [],
  selectedStock: null,
  isLoading: false,
  success: false,
  error: null,
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    stockStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    stockSuccess(state, action: PayloadAction<StockProps[]>) {
      state.isLoading = false;
      state.stocks = action.payload;
    },
    stockFail(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addPlateStock(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.success = true;
      state.stocks = [action.payload, ...state.stocks];
    },
    updateStocksInState(state, action: PayloadAction<any>) {
      const index = state.stocks.findIndex(
        (stock) => stock.id === action.payload.id
      );
      if (index !== -1) {
        state.stocks[index] = action.payload;
      }
    },
    setSelectedStock(state, action: PayloadAction<any>) {
      state.selectedStock = action.payload;
    },
    clearStocks(state) {
      state.stocks = [];
    },
  },
});

export const {
  stockStart,
  stockSuccess,
  stockFail,
  addPlateStock,
  updateStocksInState,
  setSelectedStock,
  clearStocks,
} = stockSlice.actions;

export default stockSlice.reducer;
