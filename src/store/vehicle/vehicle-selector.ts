/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "reselect";
import { RootState } from "../store";
import { formattedAmount } from "@/common/helpers";
import { ApprovalStatus } from "@/common/enum";
import { VehicleData } from "@/store/vehicle/vehicle-type"; 

const selectVehicleReducer = (state: RootState) => state.vehicles;

// Get Vehicles
export const selectVehicles = createSelector(
  [selectVehicleReducer],
  (vehicleState) =>
    Array.isArray(vehicleState.vehicles)
      ? vehicleState.vehicles.map((vehicle: VehicleData, index: number) => {
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

// Validate User (NIN, Phone Number) with Vehicle
export const selectValidUser = createSelector(
  [
    selectVehicleReducer,
    (_: any, data: { phoneNumber: string; nin?: string }) => data,
  ],
  (vehicleState, data) => {
    const foundData = vehicleState.vehicles.find(
      (vehicle: VehicleData) =>
        vehicle?.owner?.phone === data.phoneNumber ||
        vehicle?.owner?.nin === data.nin
    );
    return foundData;
  }
);

// Select Vehicles data that match the Vehicle ID
export const selectVehicleDatafromID = createSelector(
  [selectVehicleReducer, (_: any, vehicleid: string | null) => vehicleid],
  (vehicleState, vehicleid) =>
    vehicleState.vehicles
      .filter((vehicle: VehicleData) => vehicle.id === vehicleid)
      .map((vehicle: VehicleData, index: number) => {
        return {
          sid: index + 1,
          payment_ref: vehicle?.invoice?.payment_reference ?? "--",
          owner_name: `${vehicle?.owner?.firstname ?? "-"} ${vehicle?.owner?.lastname ?? "-"}`,
          amount: formattedAmount(vehicle?.invoice?.amount ?? 0),
          payment_status: vehicle?.invoice?.payment_status ?? "--",
          ...vehicle,
        };
      })
);

// Select Vehicles data that match the Owner ID
export const selectFoundVehicleDatafromUserID = createSelector(
  [selectVehicleReducer, (_: any, userID: string | null) => userID],
  (vehicleState, userID) =>
    vehicleState.vehicles
      .filter((vehicle: VehicleData) => vehicle?.owner_id === userID)
      .map((vehicle: VehicleData, index: number) => {
        return {
          sid: index + 1,
          payment_ref: vehicle?.invoice?.payment_reference ?? "--",
          owner_name: `${vehicle?.owner?.firstname ?? "-"} ${vehicle?.owner?.lastname ?? "-"}`,
          amount: formattedAmount(vehicle?.invoice?.amount ?? 0),
          payment_status: vehicle?.invoice?.payment_status ?? "--",
          ...vehicle,
        };
      })
);

// Get Users with Vehicles Matched By ID
export const selectVehicleMatchedByUser = createSelector(
  [selectVehicleReducer, (_: any, userid: string) => userid],
  (vehicleState, userid) =>
    vehicleState.vehicles.find((vehicle: VehicleData) => vehicle?.owner?.id === userid)
);

// Get Individual Vehicle User By Selecting the Name
export const selectVehicleOwnerIDFromName = createSelector(
  [selectVehicleReducer, (_: any, userName: string | null) => userName],
  (vehicleState, userName) => {
    const foundState = vehicleState.vehicles.find((vehicle: VehicleData) => {
      return (
        `${vehicle?.owner?.firstname ?? ""} ${vehicle?.owner?.lastname ?? ""}` === userName
      );
    });
    return foundState?.id || null;
  }
);
