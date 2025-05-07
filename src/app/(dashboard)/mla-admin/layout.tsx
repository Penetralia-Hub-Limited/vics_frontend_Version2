"use client";

import { useState, Suspense, useEffect, useMemo } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { IsAuth } from "@/components/general/is-auth";
import AppSidebar from "@/components/navigation/sidebar/sidebar";
import DashboardNavBar from "@/components/navigation/menubar/dashboard-navbar";
import useGetPathName from "@/hooks/usePathName";
import { mlaSideBarItems } from "@/common/side-bar";
import Loading from "./loading";
import { useDispatch } from "react-redux";
import { PlateNumberOrderService } from "@/services/PlateNumberOrdersService";
import { PlateNumberService } from "@/services/PlateNumberService";
import { ServiceTypeService } from "@/services/ServiceTypesService";
import { LgaService } from "@/services/LgaService";
import { StateService } from "@/services/StatesServices";
import { InvoiceService } from "@/services/InvoiceService";
import { VehicleService } from "@/services/VehicleService";
import { UserService } from "@/services/UserService";
import { NotificationsService } from "@/services/NotificationService";

export default function MLADashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { getPathName } = useGetPathName("mla");
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
  const invoiceService = useMemo(
    () => new InvoiceService(dispatch),
    [dispatch]
  );
  const serviceTypeService = useMemo(
    () => new ServiceTypeService(dispatch),
    [dispatch]
  );
  const vehicleService = useMemo(
    () => new VehicleService(dispatch),
    [dispatch]
  );
  const notificationsService = useMemo(
    () => new NotificationsService(dispatch),
    [dispatch]
  );
  const userService = useMemo(() => new UserService(dispatch), [dispatch]);
  const lgaService = useMemo(() => new LgaService(dispatch), [dispatch]);
  const stateService = useMemo(() => new StateService(dispatch), [dispatch]);

  useEffect(() => {
    (async () => {
      await plateNumberOrderService.getAllPlateNumberOrders();
      await notificationsService.getAllNotifications();
      await plateNumberService.getAllPlateNumbers();
      await serviceTypeService.getAllServiceTypes();
      await vehicleService.getAllVehicles();
      await invoiceService.getAllInvoices();
      await stateService.getAllStates();
      await userService.getAllUsers();
      await lgaService.getAllLgas();
    })();
  }, [
    plateNumberOrderService,
    notificationsService,
    plateNumberService,
    serviceTypeService,
    vehicleService,
    invoiceService,
    stateService,
    userService,
    lgaService,
  ]);

  return (
    <IsAuth>
      <AppSidebar sidebarData={mlaSideBarItems} />
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
