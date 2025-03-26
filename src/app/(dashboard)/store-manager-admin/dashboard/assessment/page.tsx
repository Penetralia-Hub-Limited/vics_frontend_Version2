import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, VICSSVG, AssessmentSVG } from "@/common/svgs";

export default function Page() {
  return (
    <main className={"py-4 h-96"}>
      <DashboardPath
        pathdata={[
          {
            label: "Dashboard",
            Icon: DashboardSVG,
            link: "/store-manager-admin/dashboard",
          },
          {
            label: "Plate Number Request",
            Icon: VICSSVG,
            link: "/store-manager-admin/plate-number-request",
          },
          {
            label: "Assessment",
            Icon: AssessmentSVG,
            link: "/store-manager-admin/assessment",
          },
        ]}
      />
    </main>
  );
}
