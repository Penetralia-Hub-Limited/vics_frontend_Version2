"use client";

import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/navigation/sidebar/sidebar";
import DashboardNavBar from "@/components/navigation/menubar/dashboard-navbar";
import { SMRAdminSidebar } from "@/common/side-bar";
import ServiceSalesTable from "@/components/ui/ServiceSalesTable";
import ServiceSalesFilters from "@/components/ui/ServiceSalesFilters"; // Import Filters component

export default function ServiceSalesReport() {
  const [filters, setFilters] = useState({
    serviceType: "",
    registrationType: "",
    zoneOffice: "",
    mla: "",
    fromDate: "",
    toDate: "",
  });

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar sidebarData={SMRAdminSidebar} />
        <main className="flex flex-col w-full bg-gray-100">
          <DashboardNavBar pageTitle="Service Sales Report" />
          <div className="px-6 py-4">
            <ServiceSalesFilters filters={filters} setFilters={setFilters} /> {/* Ensure Filters component is used */}
            <ServiceSalesTable filters={filters} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
