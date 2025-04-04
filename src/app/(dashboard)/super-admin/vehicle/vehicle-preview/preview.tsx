"use client";

import { useState } from "react";
import { PaymentStatus } from "@/common/enum";
import { DashboardSVG, VehicleSVG } from "@/common/svgs";
import Pagination from "@/components/general/pagination";
import DashboardPath from "@/components/dashboard/dashboard-path";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { InformationCard } from "@/components/general/information-card";

const vehicleData = [
  {
    label: "Full Name",
    value: "Bernard David Ikechukwu",
  },
  {
    label: "Email",
    value: "Bernard@DavidIkechukwu.com",
  },
  {
    label: "Phone Number",
    value: "23232323333",
  },
  {
    label: "Address",
    value: "121 Pastoral lane Briks",
  },
];

export const tableHeaders = [
  { key: "id" as const, title: "S/N" },
  { key: "paymentreference" as const, title: "Payment Reference" },
  { key: "amount" as const, title: "Amount" },
  { key: "paymentstatus" as const, title: "Payment Status" },
];

export const tableData = [
  {
    id: 1,
    paymentreference: "JKLMMNASKH2342423",
    amount: 4334334,
    paymentstatus: PaymentStatus.PAID,
  },
  {
    id: 2,
    paymentreference: "JKLMMNASKH2342423",
    amount: 4334334,
    paymentstatus: PaymentStatus.PAID,
  },
  {
    id: 3,
    paymentreference: "JKLMMNASKH2342423",
    amount: 4334334,
    paymentstatus: PaymentStatus.PAID,
  },
];

export default function VehiclePreview({
  params,
}: {
  params: Promise<{ vehicleId: number }>;
}) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);

  console.log("VEHICLE PARAMS ", params);
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className={"flex flex-col gap-8 md:gap-12"}>
      <DashboardPath
        pathdata={[
          {
            label: "Dashboard",
            Icon: DashboardSVG,
            link: "/store-manager-admin/dashboard",
          },
          {
            label: "Vehicle Dashboard",
            Icon: VehicleSVG,
            link: "/store-manager-admin/stock-management",
          },
          {
            label: "Mercedez CEE",
            Icon: VehicleSVG,
            link: "/store-manager-admin/stock-management",
          },
        ]}
      />

      <div className={"flex flex-col md:flex-row gap-4"}>
        <InformationCard title={"Buyers Information"} data={vehicleData} />
        <InformationCard title={"Vehicle's Information"} data={vehicleData} />
      </div>

      <div
        className={"flex flex-col gap-3 border-1 border-neutral-300 rounded-lg"}
      >
        <div
          className={"border-t-1 border-neutral-300 rounded-lg overflow-hidden"}
        >
          <DashboardTable headers={tableHeaders} data={paginatedData} />
        </div>
        <div className={"p-5 ml-auto"}>
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </main>
  );
}
