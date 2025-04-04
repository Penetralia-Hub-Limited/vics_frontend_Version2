"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/navigation/sidebar/sidebar";
import DashboardNavBar from "@/components/navigation/menubar/dashboard-navbar";
import useGetPathName from "@/hooks/usePathName";
import { mlaSideBarItems } from "@/common/side-bar";

export default function MLADashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getPathName } = useGetPathName("mla");

  return (
    <SidebarProvider>
      <AppSidebar sidebarData={mlaSideBarItems} />
      <main className={"flex-1 flex-col w-fit overflow-hidden"}>
        <div
          className={
            "flex flex items-center h-20 border-b border-neutral-500 sticky top-0 z-40 bg-white"
          }
        >
          <SidebarTrigger className={"block md:hidden"} />
          <DashboardNavBar pageTitle={getPathName()} />
        </div>
        <div className="px-4 py-8 bg-neutral-100/30">{children}</div>
      </main>
    </SidebarProvider>
  );
}
