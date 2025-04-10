"use client";

import { useState, Suspense } from "react";
import { StoreProvider } from "@/app/store-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/navigation/sidebar/sidebar";
import DashboardNavBar from "@/components/navigation/menubar/dashboard-navbar";
import useGetPathName from "@/hooks/usePathName";
import { mlaSideBarItems } from "@/common/side-bar";
import Loading from "../loading";
import { IsAuth } from "@/components/general/is-auth";

export default function MLADashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getPathName } = useGetPathName("mla");
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <IsAuth>
      <StoreProvider>
        <SidebarProvider>
          <AppSidebar sidebarData={mlaSideBarItems} />
          <Suspense fallback={<Loading />}>
            <main className={"flex-1 flex-col w-fit overflow-hidden"}>
              <div
                className={
                  "pl-4 md:pl-0 flex flex items-center h-20 border-b border-neutral-500 sticky top-0 z-40 bg-white"
                }
              >
                <SidebarTrigger className={"block md:hidden"} />
                <DashboardNavBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  pageTitle={getPathName()}
                />
              </div>
              <div className="px-4 py-8 bg-neutral-100/30">{children}</div>
            </main>
          </Suspense>
        </SidebarProvider>
      </StoreProvider>
    </IsAuth>
  );
}
