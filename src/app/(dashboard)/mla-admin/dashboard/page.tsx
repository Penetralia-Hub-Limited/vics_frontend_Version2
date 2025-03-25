"use client";

import { DashboardNotificationsComp } from "@/components/dashboard/notification/dashboard-notifications";
import SummaryCard from "@/components/dashboard/dashboard-summary-card";
import { format } from "date-fns";

export default function Page() {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "MMM. d, yyyy | h:mmaaa");
  return (
    <main className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center pb-6">
        <p className="text-xl md:text-3xl font-bold">Welcome, Username</p>
        <p className="text-sm text-neutral-700">{formattedDate}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_auto] gap-6">
        <div className="flex flex-col gap-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <SummaryCard title="Plate Requests" amount={318} period="Last 30 days" />
            <SummaryCard title="Stock Level" amount={1743} period="Last 30 days" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <SummaryCard title="New Plate Sales" amount={202} period="This Week" />
            <SummaryCard title="Plate Number Amount" amount={51433750} period="This Week" />
            <SummaryCard title="Total Sales" amount={83536200} period="Last 30 days" />
          </div>
        </div>

        <div className="h-full">
          <DashboardNotificationsComp />
        </div>
      </div>
    </main>
  );
}
