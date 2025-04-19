"use client";

import { useState, Suspense, useEffect, useMemo } from "react";
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
import { StateService } from "@/services/StatesServices";
import { PlateNumberService } from "@/services/PlateNumberService";
import { LgaService } from "@/services/LgaService";
import { UserService } from "@/services/UserService";
import { ServiceTypeService } from "@/services/ServiceTypesService";
import { VehicleService } from "@/services/VehicleService";

export default function SuperAdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { getPathName } = useGetPathName("superAdmin");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // trigger services
  const plateNumberOrderService = useMemo(
    () => new PlateNumberOrderService(dispatch),
    [dispatch]
  );
  const userService = useMemo(() => new UserService(dispatch), [dispatch]);
  const plateNumberService = useMemo(
    () => new PlateNumberService(dispatch),
    [dispatch]
  );
  const lgaService = useMemo(() => new LgaService(dispatch), [dispatch]);
  const invoiceService = useMemo(
    () => new InvoiceService(dispatch),
    [dispatch]
  );
  const stateService = useMemo(() => new StateService(dispatch), [dispatch]);
  const vehicleService = useMemo(
    () => new VehicleService(dispatch),
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
      await invoiceService.getAllInvoices();
      await vehicleService.getAllVehicles();
      await stateService.getAllStates();
      await userService.getAllUsers();
      await lgaService.getAllLgas();
    })();
  }, [
    invoiceService,
    plateNumberOrderService,
    plateNumberService,
    vehicleService,
    stateService,
    userService,
    lgaService,
  ]);

  return (
    <IsAuth>
      <StoreProvider>
        <SidebarProvider>
          <AppSidebar sidebarData={superAdminSidebar} />
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
        </SidebarProvider>
      </StoreProvider>
    </IsAuth>
  );
}
