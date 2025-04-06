"use client";

import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/navigation/sidebar/sidebar";
import DashboardNavBar from "@/components/navigation/menubar/dashboard-navbar";
import { storeManagerSidebarItems } from "@/common/side-bar";

export default function StoreManagerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <SidebarProvider>
      <AppSidebar sidebarData={storeManagerSidebarItems} />
      <main className={"flex flex-col w-full"}>
        <div
          className={
            "pl-4 md:pl-0  flex flex items-center h-20 border-b border-neutral-500 sticky top-0 z-40 bg-white"
          }
        >
          <div className={"block md:hidden"}>
            <SidebarTrigger />
          </div>
          <DashboardNavBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            pageTitle={""}
          />
        </div>
        <div className={"px-4 py-8 bg-neutral-100/30"}>{children}</div>
      </main>
    </SidebarProvider>
  );
}
