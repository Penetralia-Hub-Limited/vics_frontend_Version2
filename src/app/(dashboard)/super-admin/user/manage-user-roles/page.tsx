import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, UsersSVG } from "@/common/svgs";

export default function Page() {
  return (
    <main className={"flex flex-col gap-8 md:gap-12"}>
      <DashboardPath
        pathdata={[
          {
            label: "Dashboard",
            Icon: DashboardSVG,
            link: "/super-admin/dashboard",
          },
          {
            label: "User Role Management",
            Icon: UsersSVG,
            link: "/super-admin/user/manage-user-roles",
          },
        ]}
      />
    </main>
  );
}
