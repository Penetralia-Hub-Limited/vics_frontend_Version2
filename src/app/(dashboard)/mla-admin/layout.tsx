import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/navigation/sidebar/sidebar";

import { mainDashboardSideBarItems, vehiceManagement } from "@/common/side-bar";

export default function MLADashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mlaSideBarItems = [...mainDashboardSideBarItems, ...vehiceManagement];
  return (
    <SidebarProvider>
      <AppSidebar sidebarData={mlaSideBarItems} />
      <main className={"flex flex-col w-full"}>
        <div className={"h-20 p-2"}>
          <SidebarTrigger />
        </div>
        <div className={"px-4 py-8 bg-neutral-100/30"}>{children}</div>
      </main>
    </SidebarProvider>
  );
}
