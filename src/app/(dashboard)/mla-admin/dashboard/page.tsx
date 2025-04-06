"use client";

import { SetStateAction, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "@/common/enum";
import SummaryCard from "@/components/dashboard/dashboard-summary-card";
import { DashboardNotificationsComp } from "@/components/dashboard/notification/dashboard-notifications";

const summaryItems1 = [
  { title: "Plate Requests", amount: 318 },
  { title: "Stock Level", amount: 1743, isCurrency: true },
];
const summaryItems2 = [
  { title: "New Plate Sales", amount: 202 },
  { title: "Plate Number Amount", amount: 51433750, isCurrency: true },
  { title: "Total Sales", amount: 83536200 },
];

export default function Page() {
  const currentDate = new Date();
  const formattedDate = format(
    currentDate.toDateString(),
    "MMM. d, yyyy | h:mmaaa"
  );

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

  return (
    <main>
      <div className="flex flex-col md:flex-row justify-between items-center pb-6">
        <p className="text-xl md:text-3xl font-bold">Welcome, Username</p>
        <p className="text-sm text-neutral-700">{formattedDate}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_auto] gap-2 items-start">
        <div className="flex flex-col md:gap-3 gap-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
            {summaryItems1.map(({ title, amount, isCurrency }) => (
              <SummaryCard
                key={title}
                title={title}
                amount={amount}
                isCurrency={isCurrency}
                selectedRange={selectedRanges1[title] || DateRange.TODAY}
                setSelectedRange={updateDateRange1(title)}
              />
            ))}
          </div>

          <div className="grid grid-cols-1  gap-4">
            {summaryItems2.map(({ title, amount }) => (
              <SummaryCard
                key={title}
                title={title}
                amount={amount}
                selectedRange={selectedRanges2[title] || DateRange.TODAY}
                setSelectedRange={updateDateRange2(title)}
              />
            ))}
          </div>
        </div>

        <div className="h-full">
          <DashboardNotificationsComp />
        </div>
      </div>
    </main>
  );
}
