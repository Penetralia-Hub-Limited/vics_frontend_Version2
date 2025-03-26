import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, ReportSVG } from "@/common/svgs";

export default function Page() {
  return (
    <main className={"flex flex-col gap-8 md:gap-12 py-4 h-96"}>
      <div className={""}>
        <DashboardPath
          pathdata={[
            {
              label: "Dashboard",
              Icon: DashboardSVG,
              link: "/store-manager-admin/dashboard",
            },
            {
              label: "Vehicle Report Dashboard",
              Icon: ReportSVG,
              link: "/store-manager-admin/dashboard",
            },
          ]}
        />
      </div>
    </main>
  );
}
