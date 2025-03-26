// import DashboardCompLayout from "@/components/dashboard/dashboard-layout";

// export default function DashboardLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <DashboardCompLayout sidebarItems={[]}>
//       <main>{children}</main>
//     </DashboardCompLayout>
//   );
// }

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/navigation/sidebar/sidebar";
import { DashboardSVG } from "@/common/svgs";

import { plateNumber, vehiceManagement } from "@/common/side-bar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar sidebarData={plateNumber} />
      <main className={"flex flex-col w-full"}>
        <div className={"h-20 p-2"}>
          nav bar
          <SidebarTrigger />
        </div>
        <div className={"px-4 py-8 bg-neutral-100/30"}>{children}</div>
      </main>
    </SidebarProvider>
  );
}
