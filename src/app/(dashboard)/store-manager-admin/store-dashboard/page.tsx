"use client";

import { DashboardNotificationsComp } from "@/components/dashboard/notification/dashboard-notifications";
import SummaryCard from "@/components/dashboard/dashboard-summary-card";
import { format } from "date-fns";

export default function Page() {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "LLL. d yyyy ; h:maaa");
  return (
    <main>
      <div
        className={
          "pt-3 pb-8 flex md:flex-row xl:flex-row flex-col md:justify-between items-center"
        }
      >
        <p className={"text-lg md:text-3xl font-bold"}>Welcome, Username</p>
        <p className={"text-sm text-neutral-700"}>{formattedDate}</p>
      </div>

      <div className={"grid grid-cols-1 lg:grid-cols-[2fr_auto] gap-2"}>
        <div className={"flex flex-col gap-4 w-full"}>
          <div
            className={
              "flex flex-row flex-wrap gap-2 justify-betweeen items-center w-full"
            }
          >
            <SummaryCard title={"Plate Request"} amount={2900} />
            <SummaryCard title={"Plate Request"} amount={2900} />
          </div>

          <div className={"flex flex-col flex-wrap gap-4"}>
            {[{}, {}, {}].map((_, index) => {
              return (
                <SummaryCard
                  key={index}
                  title={"Plate Request"}
                  amount={2900}
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
