import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, ReportSVG } from "@/common/svgs";

export default function Page() {
  return (
    <main className={"h-96"}>
      <DashboardPath
        pathdata={[
          {
            label: "Dashboard",
            Icon: DashboardSVG,
            link: "/store-manager-admin/dashboard",
          },
          {
            label: "Store Report Dashboard",
            Icon: ReportSVG,
            link: "/store-manager-admin/report",
          },
        ]}
      />
    </main>
  );
}
