/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "reselect";
import { RootState } from "../store";
import { RequestStatus } from "@/common/enum";
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
          .filter((plate) => plate.status === RequestStatus.SOLD)
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
            buyer: `${plate?.owner?.firstname ?? "-"} ${plate?.owner?.lastname ?? "-"}`,
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
    const foundPlateNumber = plateNumber.some(
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
