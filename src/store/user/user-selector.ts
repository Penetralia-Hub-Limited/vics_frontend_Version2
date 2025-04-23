/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "reselect";
import { RootState } from "../store";
import { Role } from "@/common/enum";
import { format } from "date-fns";

const selectUserReducer = (state: RootState) => state.user.users;

// Get users information
export const selectUsers = createSelector([selectUserReducer], (user) =>
  Array.isArray(user)
    ? user.map((user, index) => {
        return {
          sid: index + 1,
          name: `${user?.firstname ?? "-"} ${user?.lastname ?? "-"}`,
          ...user,
        };
      })
    : []
);

// Get Users of Role Tax Payer
export const selectTaxPayers = createSelector([selectUserReducer], (user) =>
  Array.isArray(user)
    ? user
        ?.filter((user) => user.role === Role.TAXPAYER)
        .map((user, index) => {
          return {
            sid: index + 1,
            fullname: `${user?.firstname ?? "-"} ${user?.lastname ?? "-"}`,
            date_created: `${format(user?.created_at ?? null, "LLL. d yyyy")} | ${format(user?.created_at ?? null, "hh:mm:ss a")}`,
            ...user,
          };
        })
    : []
);

// Get User by ID
export const selectTaxPayersByID = createSelector(
  [selectUserReducer, (_: any, taxpayerid: string) => taxpayerid],
  (user, taxpayerid) =>
    user
      .filter((user) => user.id === taxpayerid)
      .map((user) => {
        return {
          fullname: `${user?.firstname ?? "-"} ${user?.lastname ?? "-"}`,
          ...user,
        };
      })
);

// Get Individual User By Selecting the Name
export const selectUserFromName = createSelector(
  [selectUserReducer, (_: any, userName: string | null) => userName],
  (user, userName) => {
    const foundState = user.find((user) => {
      return `${user.firstname} ${user.lastname}` === userName;
    });
    return foundState || null;
  }
);
