import { createSelector } from "reselect";
import { RootState } from "../store";
import { PlateNumberOrderType } from "@/common/enum";
import { format } from "date-fns";

const selectPlateNumberOrderReducer = (state: RootState) =>
  state.platenumberorder.plateNumberOrder;

// Getting the plate number request total
export const selectPlateRequested = createSelector(
  [selectPlateNumberOrderReducer],
  (plateNumberOrder) =>
    plateNumberOrder
      .filter((order) => order.type === PlateNumberOrderType.REQUEST)
      .reduce((acc, order) => acc + order.total_number_requested, 0)
);

// Getting the plate number stock Level
export const selectPlateStockLevel = createSelector(
  [selectPlateNumberOrderReducer],
  (plateNumberOrder) =>
    plateNumberOrder.reduce(
      (acc, order) => acc + order.total_number_requested,
      0
    )
);

// Getting the plate number amount
export const selectPlateNumberAmount = createSelector(
  [selectPlateNumberOrderReducer],
  (plateNumberOrder) =>
    plateNumberOrder
      .filter((order) => order.type === PlateNumberOrderType.REQUEST)
      .map((order) => order.invoice)
      .reduce((acc, invoice) => acc + invoice.amount, 0)
);

// Getting the plate number total Sales amount
export const selectPlateNumberTotalSales = createSelector(
  [selectPlateNumberOrderReducer],
  (plateNumberOrder) =>
    plateNumberOrder
      .map((order) => order.invoice)
      .reduce((acc, order) => acc + order.amount, 0)
);

// Getting the new plate sales amount
export const selectNewPlateSales = createSelector(
  [selectPlateNumberOrderReducer],
  (plateNumberOrder) =>
    plateNumberOrder
      .filter((order) => order.type === PlateNumberOrderType.SALE)
      .reduce((acc, order) => acc + order.total_number_requested, 0)
);

// Get the json table data for platenumber
export const selectPlateNumberRequestTableData = createSelector(
  [selectPlateNumberOrderReducer],
  (plateNumberOrder) =>
    Array.isArray(plateNumberOrder)
      ? plateNumberOrder?.map((order, index) => {
          return {
            sid: index + 1,
            ...order,
            created_by: `${order?.creator?.firstname ?? "-"} ${order?.creator?.lastname ?? "-"}`,
            created_at: `${format(order?.created_at ?? null, "LLL. d yyyy")} | ${format(order?.created_at ?? null, "hh:mm:ss a")}`,
            recommender: `${order.recommender?.firstname ?? "-"} ${order.recommender?.lastname ?? "-"}`,
            approver: `${order.approver?.firstname ?? "-"} ${order.approver?.lastname ?? "-"}`,
          };
        })
      : []
);

// Getting plate number order of type Sale
export const selectSalesPlateNumber = createSelector(
  [selectPlateNumberOrderReducer],
  (plateNumberOrder) =>
    plateNumberOrder
      .filter((order) => order.type === PlateNumberOrderType.SALE)
      .map((order, index) => {
        return {
          sid: index + 1,
          date_created: `${format(order?.created_at ?? null, "LLL. d yyyy")} | ${format(order?.created_at ?? null, "hh:mm:ss a")}`,
          ...order,
        };
      })
);
