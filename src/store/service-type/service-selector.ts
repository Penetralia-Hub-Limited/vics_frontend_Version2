/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "reselect";
import { RootState } from "../store";
import { formattedAmount } from "@/common/helpers";
import { format } from "date-fns";

const selectServiceReducer = (state: RootState) =>
  state.servicetype.servicetype;

export const selectServices = createSelector(
  [selectServiceReducer],
  (service) =>
    Array.isArray(service)
      ? service.map((service, index) => {
          return {
            sid: index + 1,
            amount: service?.price ?? 0,
            service_price: formattedAmount(service?.price ?? 0),
            date_created: `${format(service?.created_at ?? null, "LLL. d yyyy")} | ${format(service?.created_at ?? null, "hh:mm:ss a")}`,
            created_by: `${service?.creator?.firstname ?? "-"} ${service?.creator?.lastname ?? "-"}`,
            ...service,
          };
        })
      : []
);

export const selectServiceTypeName = createSelector(
  [selectServiceReducer],
  (service) => {
    return Array.isArray(service) ? service.map((service) => service.name) : [];
  }
);
