/* eslint-disable @typescript-eslint/no-explicit-any */
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
      .map((order) => order?.invoice)
      .reduce((acc, invoice) => {
        const validAmount =
          typeof invoice?.amount === "number" && !isNaN(invoice.amount)
            ? invoice.amount
            : 0;
        return acc + validAmount;
      }, 0)
);

// Getting the plate number total Sales amount
export const selectPlateNumberTotalSales = createSelector(
  [selectPlateNumberOrderReducer],
  (plateNumberOrder) =>
    plateNumberOrder
      .map((order) => order.invoice)
      .reduce((acc, order) => {
        const validAmount =
          typeof order?.amount === "number" && !isNaN(order.amount)
            ? order.amount
            : 0;
        return acc + validAmount;
      }, 0)
);

// Getting the new plate sales amount
export const selectNewPlateSales = createSelector(
  [selectPlateNumberOrderReducer],
  (plateNumberOrder) =>
    plateNumberOrder
      .filter((order) => order.type === PlateNumberOrderType.SALE)
      .reduce((acc, order) => {
        const validAmount =
          typeof order?.total_number_requested === "number" &&
          !isNaN(order?.total_number_requested)
            ? order.total_number_requested
            : 0;
        return acc + validAmount;
      }, 0)
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
            mla: `${order?.creator?.firstname ?? "-"} ${order?.creator?.lastname ?? "-"}`,
            date_created: `${format(order?.created_at ?? null, "LLL. d yyyy")} | ${format(order?.created_at ?? null, "hh:mm:ss a")}`,
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

// Get Payer ID from Plate Number Order Based on Invoice Payer ID
export const selectVehicleCreatorIDFromPlateNumberOrders = createSelector(
  [selectPlateNumberOrderReducer, (_: any, payerID: string | null) => payerID],
  (plateNumberOrders, payerID) => {
    const matchedOrder = plateNumberOrders.find(
      (order) => order?.vehicle?.creator_id === payerID
    );
    return matchedOrder?.invoice?.payer_id ?? null;
  }
);

// Get plate order object from plate number order ID
export const selectPlateNumberOrderFromID = createSelector(
  [selectPlateNumberOrderReducer, (_: any, plateid: string | null) => plateid],
  (plateNumberOrders, plateid) => {
    const filteredPlate = plateNumberOrders.find(
      (order) => order?.id === plateid
    );
    return filteredPlate ?? null;
  }
);
