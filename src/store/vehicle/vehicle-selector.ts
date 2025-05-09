/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "reselect";
import { RootState } from "../store";
import { formattedAmount } from "@/common/helpers";
import { ApprovalStatus } from "@/common/enum";

const selectVehicleReducer = (state: RootState) => state.vehicles;

// Get Vehicles
export const selectVehicles = createSelector(
  [selectVehicleReducer],
  (vehicle) =>
    Array.isArray(vehicle.vehicles)
      ? vehicle.vehicles.map((vehicle, index) => {
          return {
            sid: index + 1,
            platenumber: vehicle?.plate_number?.number ?? "--",
            payment_status: vehicle?.plate_number?.number_status,
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
    (_: any, data: { phoneNumber: string; nin?: string }) => data.phoneNumber,
    (_: any, data: { phoneNumber: string; nin?: string }) => data.nin,
  ],
  (vehicleState, phoneNumber, nin) => {
    return vehicleState.vehicles.find(
      (vehicle) =>
        vehicle?.owner?.phone === phoneNumber ||
        (nin && vehicle?.owner?.nin === nin)
    );
  }
);

// Select Vehicles data that match the Vehicle ID
export const selectVehicleDatafromID = createSelector(
  [selectVehicleReducer, (_: any, vehicleid: string | null) => vehicleid],
  (vehicle, vehicleid) =>
    vehicle.vehicles
      .filter((vehicle) => vehicle.id === vehicleid)
      .map((vehicle, index) => {
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
  (vehicle, userID) =>
    vehicle.vehicles
      .filter((vehicle) => vehicle.owner_id === userID)
      .map((vehicle, index) => {
        return {
          sid: index + 1,
          platenumber: vehicle?.plate_number?.number,
          platetype: vehicle?.plate_number?.type,
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
  (vehicle, userid) =>
    vehicle.vehicles.filter((vehicle) => vehicle.owner.id === userid)
);

// Get Individual Vehicle User By Selecting the Name
export const selectVehicleOwnerIDFromName = createSelector(
  [selectVehicleReducer, (_: any, userName: string | null) => userName],
  (vehicle, userName) => {
    const foundState = vehicle.vehicles.find((vehicle) => {
      return (
        `${vehicle.owner?.firstname} ${vehicle?.owner?.lastname}` === userName
      );
    });
    return foundState?.id || null;
  }
);

// Get vehicle information that match plate number id
export const selectVehicleInfoFromPlateID = createSelector(
  [selectVehicleReducer, (_: any, plateId: string) => plateId],
  (vehicle, plateId) => {
    const foundState = vehicle.vehicles.find((vehicle) => {
      return vehicle.plate_number_id === plateId;
    });
    return foundState || null;
  }
);
