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

/**
 * Download PDF
 */
// export const downloadPdf = async () => {
//   try {
//   } catch (error) {}
// };

// Generate Plate Number Tracking ID
export const generateTrackingId = (): string => {
  const randomPart = Math.floor(1000 + Math.random() * 9000); // 6-digit number
  return `TRK-${randomPart}`;
};

/**
 * Generate Years from 1996 to 2025
 * @param startYear
 * @returns
 */
export const generateYears = (startYear: number = 1996): string[] => {
  const currentYear = new Date().getFullYear();
  const years: string[] = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year.toString());
  }

  return years;
};

// Hard Refresh
export const hardRefresh = () => {
  window.location.reload();
};
