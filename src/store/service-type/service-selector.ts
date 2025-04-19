/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "reselect";
import { RootState } from "../store";
import { formattedAmount } from "@/common/helpers";

const selectServiceReducer = (state: RootState) =>
  state.servicetype.servicetype;

export const selectServices = createSelector(
  [selectServiceReducer],
  (service) =>
    Array.isArray(service)
      ? service.map((service, index) => {
          return {
            sid: index + 1,
            service_price: formattedAmount(service?.price ?? 0),
            created_by: `${service?.creator?.firstname ?? "-"} ${service?.creator?.lastname ?? "-"}`,
            ...service,
          };
        })
      : []
);
