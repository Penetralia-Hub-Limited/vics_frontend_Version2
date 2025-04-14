"use client";

import { useState, Suspense, useEffect } from "react";
import { StoreProvider } from "@/app/store-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/navigation/sidebar/sidebar";
import { superAdminSidebar } from "@/common/side-bar";
import useGetPathName from "@/hooks/usePathName";
import DashboardNavBar from "@/components/navigation/menubar/dashboard-navbar";
import Loading from "../loading";
import { IsAuth } from "@/components/general/is-auth";
import { useDispatch } from "react-redux";
import { PlateNumberOrderService } from "@/services/PlateNumberOrdersService";
import { InvoiceService } from "@/services/InvoiceService";

export default function SuperAdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { getPathName } = useGetPathName("superAdmin");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // trigger services
  const plateNumberOrderService = new PlateNumberOrderService(dispatch);
  const invoiceService = new InvoiceService(dispatch);

  // trigger get plate number call
  useEffect(() => {
    (async () => {
      await plateNumberOrderService.getAllPlateNumberOrders();
      await invoiceService.getAllInvoices();
    })();
  }, []);

  return (
    <IsAuth>
      <StoreProvider>
        <SidebarProvider>
          <AppSidebar sidebarData={superAdminSidebar} />
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
