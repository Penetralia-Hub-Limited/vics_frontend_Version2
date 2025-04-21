/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "reselect";
import { RootState } from "../store";
import { formattedAmount } from "@/common/helpers";
import { ApprovalStatus } from "@/common/enum";

const selectVehicleReducer = (state: RootState) => state.vehicles;

export const selectVehicles = createSelector(
  [selectVehicleReducer],
  (vehicle) =>
    Array.isArray(vehicle.vehicles)
      ? vehicle.vehicles.map((vehicle, index) => {
          return {
            sid: index + 1,
            platenumber: vehicle?.plate_number?.number ?? "--",
            payment_ref: vehicle?.invoice?.payment_reference ?? "--",
            vio_approval: vehicle?.invoice?.vio_approved
              ? ApprovalStatus.APPROVED
              : ApprovalStatus.NOTAPPROVED,
            owner_name: `${vehicle?.owner?.firstname ?? "-"} ${vehicle?.owner?.lastname ?? "-"}`,
            phone: vehicle?.owner?.phone,
            amount: formattedAmount(vehicle?.invoice?.amount ?? 0),
            created_by: `${vehicle?.creator?.firstname ?? "-"} ${vehicle?.creator?.lastname ?? "-"}`,
            ...vehicle,
          };
        })
      : []
);

export const selectValidUser = createSelector(
  [
    selectVehicleReducer,
    (_: any, data: { phoneNumber: string; nin: string }) => data,
  ],
  (vehicle, data) => {
    const foundData = vehicle.vehicles.find(
      (vehicle) =>
        vehicle?.owner?.phone === data.phoneNumber ||
        vehicle.owner?.nin === data.nin
    );
    return foundData;
  }
);
