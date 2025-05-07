"use client";

import { useState, Suspense, useEffect, useMemo } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/navigation/sidebar/sidebar";
import DashboardNavBar from "@/components/navigation/menubar/dashboard-navbar";
import { storeManagerSidebarItems } from "@/common/side-bar";
import useGetPathName from "@/hooks/usePathName";
import Loading from "./loading";
import { IsAuth } from "@/components/general/is-auth";
import { useDispatch } from "react-redux";
import { PlateNumberOrderService } from "@/services/PlateNumberOrdersService";
import { PlateNumberService } from "@/services/PlateNumberService";
import { ServiceTypeService } from "@/services/ServiceTypesService";
import { LgaService } from "@/services/LgaService";
import { StateService } from "@/services/StatesServices";
import { NotificationsService } from "@/services/NotificationService";
import { UserService } from "@/services/UserService";
import { StockService } from "@/services/StockService";

export default function StoreManagerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { getPathName } = useGetPathName("storeAdmin");
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
  const notificationsService = useMemo(
    () => new NotificationsService(dispatch),
    [dispatch]
  );
  const userService = useMemo(() => new UserService(dispatch), [dispatch]);
  const stockService = useMemo(() => new StockService(dispatch), [dispatch]);
  const lgaService = useMemo(() => new LgaService(dispatch), [dispatch]);
  const stateService = useMemo(() => new StateService(dispatch), [dispatch]);

  // API triggers
  useEffect(() => {
    (async () => {
      await plateNumberOrderService.getAllPlateNumberOrders();
      await notificationsService.getAllNotifications();
      await plateNumberService.getAllPlateNumbers();
      await serviceTypeService.getAllServiceTypes();
      await stateService.getAllStates();
      await stockService.getAllStock();
      await userService.getAllUsers();
      await lgaService.getAllLgas();
    })();
  }, [
    plateNumberOrderService,
    notificationsService,
    plateNumberService,
    serviceTypeService,
    stockService,
    stateService,
    userService,
    lgaService,
  ]);

  return (
    <IsAuth>
      <AppSidebar sidebarData={storeManagerSidebarItems} />
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
        <Suspense fallback={<Loading />}>
          <div className="min-h-screen px-4 py-8 bg-neutral-100/30">
            {children}
          </div>
        </Suspense>
      </main>
    </IsAuth>
  );
}
