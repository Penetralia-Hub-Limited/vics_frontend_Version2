"use client";

import { useState } from "react";
import DashboardTable from "@/components/dashboard/dashboard-table";
import RenewalFilterForm from "@/components/Renewals/RenewalFilterForm";
import RenewalActionButton from "@/components/Renewals/RenewalActionButton";
import Pagination from "@/components/general/pagination";
import StatusBadge from "@/components/general/StatusBadge";
import AppSidebar from "@/components/navigation/sidebar/sidebar";
import { format } from "date-fns";
import { sidebarData } from "@/constants/sidebarData";

type PaymentStatus = "Paid" | "Pending";

interface RawData {
  sn: number;
  plateNumber: string;
  platesType: string;
  amount: string;
  buyer: string;
  date: Date;
  paymentStatus: PaymentStatus;
}

export default function RenewalPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const headers = [
    { title: "S/N", key: "sn" },
    { title: "Plate Number", key: "plateNumber" },
    { title: "Plates Type", key: "platesType" },
    { title: "Amount", key: "amount" },
    { title: "Buyer", key: "buyer" },
    { title: "Date Sold", key: "date" },
    { title: "Payment Status", key: "paymentStatus" },
    { title: "Action", key: "action" },
  ];

  const rawData: RawData[] = [
    {
      sn: 1,
      plateNumber: "ASA101JK",
      platesType: "Private (Direct)",
      amount: "₦43,500.00",
      buyer: "Akanbi S.",
      date: new Date("2025-03-04T09:32:44"),
      paymentStatus: "Paid",
    },
    {
      sn: 2,
      plateNumber: "MORO102RJ",
      platesType: "Commercial",
      amount: "₦43,500.00",
      buyer: "Sheik A.",
      date: new Date("2025-03-04T09:32:44"),
      paymentStatus: "Paid",
    },
    {
      sn: 3,
      plateNumber: "EDU10MK",
      platesType: "Commercial Motorcycle",
      amount: "₦43,500.00",
      buyer: "Lola S.",
      date: new Date("2025-03-04T09:32:44"),
      paymentStatus: "Paid",
    },
  ];

  const tableData = rawData.map((item) => ({
    sn: item.sn,
    plateNumber: item.plateNumber,
    platesType: item.platesType,
    amount: item.amount,
    buyer: item.buyer,
    date: format(item.date, "LLL. d yyyy hh:mm:ss a"),
    paymentStatus: <StatusBadge status={item.paymentStatus} />,
    action: "•••",
  }));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-[260px] border-r border-neutral-300 bg-white">
        <AppSidebar sidebarData={sidebarData} />
      </aside>

      {/* Main Content */}
      <section className="flex-1 bg-gray-50 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-neutral-800">
            Renewal Dashboard
          </h3>
          <RenewalActionButton />
        </div>

        <div className="text-sm text-neutral-600 flex items-center gap-2">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-primary-600 font-medium">Renewal Dashboard</span>
        </div>

        <RenewalFilterForm />

        <div className="border rounded-md bg-white p-4 shadow-sm">
          <DashboardTable headers={headers} data={tableData} itemsPerPage={10} />
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={30}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
