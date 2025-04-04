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
      <div className="flex h-screen">
        {/* Sidebar */}
        <AppSidebar sidebarData={mlaSideBarItems} />

        {/* Main Content */}
        <main className="flex flex-col w-full">
          {/* Navbar */}
          <div className="flex items-center h-20 px-4 bg-white shadow-sm">
            <div className="block md:hidden">
              <SidebarTrigger />
            </div>
            <DashboardNavBar pageTitle={getPathName()} />
          </div>

          {/* Page Content */}
          <div className="px-4 py-8 bg-neutral-100/30">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
