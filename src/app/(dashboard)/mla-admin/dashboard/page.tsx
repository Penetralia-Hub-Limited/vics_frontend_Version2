"use client";

import { SetStateAction, useState, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "@/common/enum";
import SummaryCard from "@/components/dashboard/dashboard-summary-card";
import { DashboardNotificationsComp } from "@/components/dashboard/notification/dashboard-notifications";
import { useSelector } from "react-redux";
import { AuthState } from "@/store/auth/auth-user-types";
import {
  selectNewPlateSales,
  selectPlateRequested,
  selectPlateStockLevel,
  selectPlateNumberAmount,
  selectPlateNumberTotalSales,
} from "@/store/plate-number-orders/plate-number-order-selector";

export default function Page() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = format(currentDate, "MMM. d, yyyy | hh:mm aaa");
  const { data } = useSelector((state: { auth: AuthState }) => state.auth);
  const plateNumberRequested = useSelector(selectPlateRequested);
  const plateNumberAmount = useSelector(selectPlateNumberAmount);
  const plateNumberStockLevel = useSelector(selectPlateStockLevel);
  const plateNumberTotalSales = useSelector(selectPlateNumberTotalSales);
  const plateNumberNewPlateSales = useSelector(selectNewPlateSales);

  const [selectedRanges1, setSelectedRanges1] = useState<
    Record<string, DateRange>
  >({
    "Plate Requests": DateRange.TODAY,
    "Stock Level": DateRange.TODAY,
  });
  const [selectedRanges2, setSelectedRanges2] = useState<
    Record<string, DateRange>
  >({
    "New Plate Sales": DateRange.TODAY,
    "Plate Number Amount": DateRange.TODAY,
    "Total Sales": DateRange.TODAY,
  });

  const updateDateRange1 =
    (title: string) => (newRange: SetStateAction<DateRange>) => {
      setSelectedRanges1((prev) => ({
        ...prev,
        [title]:
          typeof newRange === "function"
            ? newRange(prev[title] || DateRange.TODAY)
            : newRange,
      }));
    };

  const summaryItems1 = [
    {
      title: "Plate Requests",
      amount: plateNumberRequested,
      route: "/mla-admin/plate-number-request",
    },
    { title: "Stock Level", amount: plateNumberStockLevel },
  ];

  const updateDateRange2 =
    (title: string) => (newRange: SetStateAction<DateRange>) => {
      setSelectedRanges2((prev) => ({
        ...prev,
        [title]:
          typeof newRange === "function"
            ? newRange(prev[title] || DateRange.TODAY)
            : newRange,
      }));
    };

  const summaryItems2 = [
    { title: "New Plate Sales", amount: plateNumberNewPlateSales },
    {
      title: "Plate Number Amount",
      amount: plateNumberAmount,
      isCurrency: true,
    },
    { title: "Total Sales", amount: plateNumberTotalSales, isCurrency: true },
  ];

  return (
    <main>
      <div className="flex flex-col md:flex-row justify-between items-center pb-6">
        <p className="text-xl md:text-3xl font-bold">
          Welcome, {data?.user?.firstname ?? "User"}
        </p>
        <p className="text-sm text-neutral-700">{formattedDate}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_auto] gap-2 items-start">
        <div className="flex flex-col md:gap-3 gap-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
            {summaryItems1.map(({ title, amount, route }, index) => (
              <SummaryCard
                key={index}
                title={title}
                amount={amount}
                route={route}
                selectedRange={selectedRanges1[title] || DateRange.TODAY}
                setSelectedRange={updateDateRange1(title)}
              />
            ))}
          </div>

          <div className={"flex flex-col flex-wrap gap-4"}>
            {summaryItems2.map(({ title, amount, isCurrency }, index) => {
              return (
                <SummaryCard
                  key={index}
                  title={title}
                  amount={amount}
                  isCurrency={isCurrency}
                  selectedRange={selectedRanges2[title] || DateRange.TODAY}
                  setSelectedRange={updateDateRange2(title)}
                />
              );
            })}
          </div>
        </div>

        <div className="h-full">
          <DashboardNotificationsComp />
        </div>
      </div>
    </main>
  );
}
