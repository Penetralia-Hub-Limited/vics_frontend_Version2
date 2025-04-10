"use client";

import { useState, SetStateAction } from "react";
import { format } from "date-fns";
import { DateRange } from "@/common/enum";
import SummaryCard from "@/components/dashboard/dashboard-summary-card";
import { DashboardNotificationsComp } from "@/components/dashboard/notification/dashboard-notifications";
import { useSelector } from "react-redux";
import { AuthState } from "@/store/auth/auth-user-types";

const summaryItems1 = [
  { title: "Plate Requests", amount: 318 },
  { title: "Stock Level", amount: 1743, isCurrency: true },
];

export default function Page() {
  const { user } = useSelector((state: { auth: AuthState }) => state.auth);
  const currentDate = new Date();
  const formattedDate = format(
    currentDate.toDateString(),
    "LLL. d yyyy ; h:maaa"
  );

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

  return (
    <main>
      <div
        className={
          "pb-8 flex md:flex-row xl:flex-row flex-col md:justify-between items-center gap-8 md:gap-12"
        }
      >
        <p className={"text-lg md:text-3xl font-bold"}>
          Welcome, {user?.firstname ?? "User"}
        </p>
        <p className={"text-sm text-neutral-700"}>{formattedDate}</p>
      </div>

      <div className={"grid grid-cols-1 lg:grid-cols-[2fr_auto] gap-2"}>
        <div className={"flex flex-col gap-4 w-full"}>
          <div
            className={
              "flex flex-col xl:flex-row gap-2 justify-between items-center w-full"
            }
          >
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

          <div className={"flex flex-col flex-wrap gap-4"}>
            {[{}, {}, {}].map((_, index) => {
              return (
                <SummaryCard
                  key={index}
                  title={"Plate Request"}
                  amount={30000}
                  isCurrency={false}
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
