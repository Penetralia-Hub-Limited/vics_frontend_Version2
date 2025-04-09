import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, PenSVG } from "@/common/svgs";

export default function Page() {
  return (
    <main className={"flex flex-col gap-8 md:gap-12 h-96"}>
      <div className={""}>
        <DashboardPath
          pathdata={[
            {
              label: "Dashboard",
              Icon: DashboardSVG,
              link: "/store-manager-admin/dashboard",
            },
            {
              label: "Change of Ownership",
              Icon: PenSVG,
              link: "/store-manager-admin/dashboard",
            },
          ]}
        />
      </div>
    </main>
  );
}
