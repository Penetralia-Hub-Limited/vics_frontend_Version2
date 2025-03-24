import currency from "currency.js";

/**
 * Format currency to naira
 */
export const formattedAmount = (amount: number) =>
  currency(amount, {
    symbol: "₦",
    separator: ",",
  }).format();
