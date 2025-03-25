"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import { tableInvoices, tableHeaders } from "@/common/constant";
import CardContainer from "@/components/general/card-container";
import DashboardPath from "@/components/dashboard/dashboard-path";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import DashboardTable from "@/components/dashboard/dashboard-table";

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tableInvoices.length / itemsPerPage);
  const paginatedData = tableInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className={"flex flex-col gap-8 md:gap-12 py-4"}>
      <DashboardPath
        pathdata={[
          {
            label: "Dashboard",
            Icon: <SpaceDashboardIcon sx={{ fontSize: 15 }} />,
            link: "/store-manager-admin/dashboard",
          },
          {
            label: "Plate Number Request",
            Icon: <SpaceDashboardIcon sx={{ fontSize: 15 }} />,
            link: "/store-manager-admin/plate-number-request",
          },
        ]}
      />

      <CardContainer>
        <div className="grid grid-cols-1 md:grid-cols-[2.5fr_auto] gap-4 items-end">
          <div className={"flex flex-col gap-3"}>
            <p className={"font-semibold"}>
              Enter the number of the plate you wish to assign
            </p>
            <div
              className={
                "grid grid-cols-[3fr_1fr] items-center jusity-between border border-neutral-300 rounded-md"
              }
            >
              <input
                type={"text"}
                placeholder={"placeholder"}
                className={"border-0 p-3 focus:none w-full text-sm ring-0"}
              />
              <p className={"px-2 text-sm font-semibold ml-auto"}>
                of {tableInvoices.length} plates in store
              </p>
            </div>
          </div>
          <Button>Assign Plate Numbers</Button>
        </div>
      </CardContainer>

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
