"use client";

import { useState, SetStateAction, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "@/common/enum";
import SummaryCard from "@/components/dashboard/dashboard-summary-card";
import { DashboardNotificationsComp } from "@/components/dashboard/notification/dashboard-notifications";
import {
  selectNewPlateSales,
  selectPlateRequested,
  selectPlateStockLevel,
  selectPlateNumberAmount,
  selectPlateNumberTotalSales,
} from "@/store/plate-number-orders/plate-number-order-selector";
import { useSelector } from "react-redux";
import { AuthState } from "@/store/auth/auth-user-types";

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
      route: "/store-manager-admin/plate-number-request",
    },
    { title: "Stock Level", amount: plateNumberStockLevel },
  ];

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
      <div
        className={
          "pb-8 flex md:flex-row xl:flex-row flex-col md:justify-between items-center gap-8 md:gap-12"
        }
      >
        <p className={"text-lg md:text-3xl font-bold"}>
          Welcome, {data?.user?.firstname ?? "User"}
        </p>
        <p className={"text-sm text-neutral-700"}>{formattedDate}</p>
      </div>

      <div className={"grid grid-cols-1 lg:grid-cols-[2fr_auto] gap-2"}>
        <div className={"flex flex-col gap-4 w-full"}>
          <div
            className={
              "flex flex-col md:flex-row gap-2 justify-between items-center w-full"
            }
          >
            {summaryItems1.map(({ title, amount, route }, index) => (
              <SummaryCard
                key={index}
                title={title}
                route={route}
                amount={amount}
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
                  selectedRange={DateRange.TODAY}
                  setSelectedRange={() => {}}
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
