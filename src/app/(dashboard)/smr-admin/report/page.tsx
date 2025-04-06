import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, ReportSVG } from "@/common/svgs";

export default function Page() {
  return (
    <main className={"flex flex-col gap-8 md:gap-12 h-96"}>
      <DashboardPath
        pathdata={[
          {
            label: "Dashboard",
            Icon: DashboardSVG,
            link: "/smr-admin/dashboard",
          },
          {
            label: "SMR Report Dashboard",
            Icon: ReportSVG,
            link: "/smr-admin/report",
          },
        ]}
      />
    </main>
  );
}
