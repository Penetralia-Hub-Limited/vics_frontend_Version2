/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "reselect";
import { RootState } from "../store";
import { formattedAmount } from "@/common/helpers";

const selectInvoiceReducer = (state: RootState) => state.invoices;

// Get Invoice that Match User ID
export const selectInvoicesWithUserID = createSelector(
  [selectInvoiceReducer, (_, userid: string) => userid],
  (invoice, userid) =>
    invoice.invoices
      .filter((invoice) => invoice?.payer?.id === userid)
      .map((invoice, index) => {
        return {
          sid: index + 1,
          total_amount: formattedAmount(invoice.amount),
          ...invoice,
        };
      })
);

// Get Payer ID from Invoice
export const selectPayerIDFromInvoice = createSelector(
  [selectInvoiceReducer],
  (invoice) => invoice.invoices.map((invoice) => invoice?.payer_id)
);
