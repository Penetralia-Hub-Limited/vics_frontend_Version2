/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "reselect";
import { RootState } from "../store";
import { RequestStatus } from "@/common/enum";

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
              ...plate,
            };
          })
      : []
);

export const selectSalesAssessment = createSelector(
  [selectPlateNumberReducer],
  (plateNumber) =>
    Array.isArray(plateNumber)
      ? plateNumber.map((plate, index) => {
          return {
            sid: index + 1,
            ...plate,
            buyer: `${plate?.owner?.firstname ?? "-"} ${plate?.owner?.lastname ?? "-"}`,
            amount: plate?.invoice?.amount ?? 0,
            created_by: `${plate?.creator?.firstname ?? "-"} ${plate?.creator?.lastname ?? "-"}`,
          };
        })
      : []
);

export const selectValidatePhoneNumber = createSelector(
  [
    selectPlateNumberReducer,
    (_: any, phone_number: string | null) => phone_number,
  ],
  (plateNumber, phone_number) => {
    const foundPhoneNumber = plateNumber.find(
      (plate) => plate?.owner?.phone === phone_number
    );
    return foundPhoneNumber;
  }
);
