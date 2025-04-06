import currency from "currency.js";
import { subDays } from "date-fns";
import { DateRange } from "@/common/enum";
import {
  RowAction,
  TableData,
} from "@/components/dashboard/dashboard-table-w-button";

/**
 * Format currency to naira
 */
export const formattedAmount = (amount: number) =>
  currency(amount, {
    symbol: "₦",
    separator: ",",
  }).format();

/**
 * Date ranges for the select component
 */
export const DATE_RANGES: Record<
  DateRange,
  { label: string; range: [Date, Date] }
> = {
  [DateRange.TODAY]: { label: "Today", range: [new Date(), new Date()] },
  [DateRange.YESTERDAY]: {
    label: "Yesterday",
    range: [subDays(new Date(), 1), subDays(new Date(), 1)],
  },
  [DateRange.LAST_7_DAYS]: {
    label: "Last 7 Days",
    range: [subDays(new Date(), 7), new Date()],
  },
  [DateRange.LAST_30_DAYS]: {
    label: "Last 30 Days",
    range: [subDays(new Date(), 30), new Date()],
  },
};

/**
 * Trigger Row Table Actions
 * @param row
 * @param actions
 * @returns
 */
export const getRowActions = (
  row: TableData,
  actions: RowAction[]
): RowAction[] => {
  return actions.map((action) => ({ ...action, rowData: row }));
};
