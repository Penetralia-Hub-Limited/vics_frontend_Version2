"use client";

import { useState, Suspense, useEffect, useMemo } from "react";
import { StoreProvider } from "@/app/store-provider";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/navigation/sidebar/sidebar";
import DashboardNavBar from "@/components/navigation/menubar/dashboard-navbar";
import { SMRAdminSidebar } from "@/common/side-bar";
import useGetPathName from "@/hooks/usePathName";
import Loading from "../loading";
import { IsAuth } from "@/components/general/is-auth";
import { useDispatch } from "react-redux";
import { PlateNumberOrderService } from "@/services/PlateNumberOrdersService";
import { PlateNumberService } from "@/services/PlateNumberService";
import { ServiceTypeService } from "@/services/ServiceTypesService";

export default function SMRDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { getPathName } = useGetPathName("smr");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // trigger services
  const plateNumberOrderService = useMemo(
    () => new PlateNumberOrderService(dispatch),
    [dispatch]
  );
  const plateNumberService = useMemo(
    () => new PlateNumberService(dispatch),
    [dispatch]
  );
  const serviceTypeService = useMemo(
    () => new ServiceTypeService(dispatch),
    [dispatch]
  );

  // API triggers
  useEffect(() => {
    (async () => {
      await plateNumberOrderService.getAllPlateNumberOrders();
      await plateNumberService.getAllPlateNumbers();
      await serviceTypeService.getAllServiceTypes();
    })();
  }, [plateNumberOrderService, plateNumberService, serviceTypeService]);

  return (
    <IsAuth>
      <AppSidebar sidebarData={SMRAdminSidebar} />
      <Suspense fallback={<Loading screen={"main"} />}>
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
    </IsAuth>
  );
}
