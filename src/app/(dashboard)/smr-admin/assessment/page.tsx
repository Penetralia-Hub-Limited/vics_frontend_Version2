import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, AssessmentSVG } from "@/common/svgs";

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
            label: "Assessment",
            Icon: AssessmentSVG,
            link: "/smr-admin/assessment",
          },
        ]}
      />
    </main>
  );
}
