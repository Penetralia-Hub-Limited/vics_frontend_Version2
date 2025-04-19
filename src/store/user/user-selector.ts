/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "reselect";
import { RootState } from "../store";
import { Role } from "@/common/enum";
import { format } from "date-fns";

const selectUserReducer = (state: RootState) => state.user.users;

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
