/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "reselect";
import { RootState } from "../store";

const selectStockReducer = (state: RootState) => state.stock;

// Retrieve all stock information
export const selectAllStock = createSelector([selectStockReducer], (stock) =>
  stock.stocks.map((stock, index) => {
    return {
      sid: index + 1,
      created_by: stock?.creator
        ? `${stock?.creator?.firstname} ${stock?.creator?.lastname}`
        : "--",
      lga_name: stock.lga ? stock?.lga?.name : "--",
      ...stock,
    };
  })
);
