import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/navigation/sidebar/sidebar";

import { mainDashboardSideBarItems } from "@/common/side-bar";

export default function StoreManagerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar sidebarData={mainDashboardSideBarItems} />
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
