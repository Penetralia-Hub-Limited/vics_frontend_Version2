/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "reselect";
import { RootState } from "../store";

const selectInvoiceReducer = (state: RootState) => state.invoices;

// Get Invoice that Match User ID
export const selectInvoicesWithUserID = createSelector(
  [selectInvoiceReducer, (_, userid: string) => userid],
  (invoice, userid) =>
    invoice.invoices.find((invoice) => invoice?.payer?.id === userid)
);

// Get Payer ID from Invoice
export const selectPayerIDFromInvoice = createSelector(
  [selectInvoiceReducer],
  (invoice) => invoice.invoices.map((invoice) => invoice?.payer_id)
);
