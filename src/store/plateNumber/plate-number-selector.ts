/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "reselect";
import { RootState } from "../store";
import { PlateNumberStatus } from "@/common/enum";
import { formattedAmount } from "@/common/helpers";
import { format } from "date-fns";
import { PlateNumberData } from "./plate-number-types";

const selectPlateNumberReducer = (state: RootState) =>
  state.platenumber.plateNumber;

export const selectSoldPlateNumber = createSelector(
  [selectPlateNumberReducer],
  (plateNumber) =>
    Array.isArray(plateNumber)
      ? plateNumber
          .filter((plate) => plate.status === PlateNumberStatus.ASSIGNED)
          .map((plate, index) => {
            return {
              sid: index + 1,
              date_created: `${format(plate?.created_at ? new Date(plate.created_at) : "-", "LLL. d yyyy")} | ${format(plate?.created_at ? new Date(plate.created_at) : "-", "hh:mm:ss a")}`,
              ...plate,
            };
          })
      : []
);

export const selectUnassignedPlates = createSelector(
  [selectPlateNumberReducer],
  (plateNumber) =>
    Array.isArray(plateNumber)
      ? plateNumber
          .filter(
            (plate) => plate.assigned_status === PlateNumberStatus.UNASSIGNED
          )
          .map((plate, index) => {
            return {
              sid: index + 1,
              date_created: `${format(plate?.created_at ? new Date(plate.created_at) : "-", "LLL. d yyyy")} | ${format(plate?.created_at ? new Date(plate.created_at) : "-", "hh:mm:ss a")}`,
              ...plate,
            };
          })
      : []
);

export const selectPlateNumber = createSelector(
  [selectPlateNumberReducer],
  (plateNumber) =>
    Array.isArray(plateNumber)
      ? plateNumber.map((plate, index) => {
          return {
            sid: index + 1,
            ...plate,
            end_code: plate?.number?.slice(-2) ?? "-",
            buyer: `${plate?.owner?.firstname ?? "-"} ${plate?.owner?.lastname ?? "-"}`,
            int_amount: plate?.invoice?.amount ?? index * 6 + 3,
            amount: formattedAmount(plate?.invoice?.amount ?? index * 6 + 3),
            created_by: `${plate?.creator?.firstname ?? "-"} ${plate?.creator?.lastname ?? "-"}`,
          };
        })
      : []
);

// Validate User Phone Number in Plate Number API
export const selectValidatePhoneNumber = createSelector(
  [
    selectPlateNumberReducer,
    (_: any, phone_number: string | null) => phone_number,
  ],
  (plateNumber, phone_number) => {
    const foundPhoneNumber = plateNumber.find(
      (plate: PlateNumberData) => plate?.owner?.phone === phone_number
    );
    return foundPhoneNumber;
  }
);

// Validate Plate Number
export const selectValidPlateNumber = createSelector(
  [
    selectPlateNumberReducer,
    (_: any, platenumber: string | null) => platenumber,
  ],
  (plateNumber, platenumber) => {
    const foundPlateNumber = plateNumber.find(
      (plate: PlateNumberData) => plate?.number === platenumber
    );
    return foundPlateNumber;
  }
);

// Get User by ID in Plate Number API
export const selectUsersFromPlateNumber = createSelector(
  [selectPlateNumberReducer, (_, userID: string) => userID],
  (plateNumber, userID) =>
    plateNumber.filter((plate: PlateNumberData) => plate?.owner_id === userID)
);

// Get User by ID in Plate Number API
export const selectUsersInfoFromPlateNumber = createSelector(
  [selectPlateNumberReducer, (_, plateId: string) => plateId],
  (plateNumber, plateId) =>
    plateNumber
      .filter((plate: PlateNumberData) => plate?.id === plateId)
      .map((plateNumber) => plateNumber.owner)
);

// Get plate Data from number
export const selectPlateNumberFromID = createSelector(
  [selectPlateNumberReducer, (_, number: string) => number],
  (plateNumber, number) =>
    plateNumber.filter((plate: PlateNumberData) => plate?.number === number)
);

// Get the assigned plate number
export const selectAssignedPlateNumber = createSelector(
  [selectPlateNumberReducer],
  (plateNumber) =>
    Array.isArray(plateNumber)
      ? plateNumber
          .filter(
            (plate) => plate.assigned_status === PlateNumberStatus.ASSIGNED
          )
          .map((plate, index) => {
            return {
              sid: index + 1,
              date_created: `${format(plate?.created_at ? new Date(plate.created_at) : "-", "LLL. d yyyy")} | ${format(plate?.created_at ? new Date(plate.created_at) : "-", "hh:mm:ss a")}`,
              ...plate,
            };
          })
      : []
);

/**
 * Get an array of plate numbers
 */
export const selectPlateNumberArr = createSelector(
  [selectPlateNumberReducer],
  (plateNumber) => plateNumber.map((plate) => plate.number)
);
