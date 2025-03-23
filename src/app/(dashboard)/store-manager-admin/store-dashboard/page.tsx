import { DashboardNotificationsComp } from "@/components/dashboard/notification/dashboard-notifications";
import SummaryCard from "@/components/dashboard/dashboard-summary-card";

export default function Page() {
  return (
    <main>
      <div className={"py-5 flex flex-row justify-between items-center"}>
        <div>Welcome, Username</div>
        <div>Feb 27, 2025...</div>
      </div>

      <div className={"grid grid-cols-[2fr_auto] gap-2"}>
        <div className={"flex flex-col gap-4 w-full"}>
          <div
            className={
              "flex flex-row gap-2 justify-betweeen items-center w-full"
            }
          >
            <SummaryCard title={"Plate Request"} amount={2900} />
            <SummaryCard title={"Plate Request"} amount={2900} />
          </div>
          <div className={"flex flex-col gap-4"}>
            {[{}, {}, {}].map(() => {
              return <SummaryCard title={"Plate Request"} amount={2900} />;
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
