"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DashboardPath from "@/components/dashboard/dashboard-path";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import DashboardTable from "@/components/dashboard/dashboard-table";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import { mlatableInvoices, mlaTableHeaders } from "@/common/constant";

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const totalPages = Math.ceil(mlatableInvoices.length / itemsPerPage);
  const paginatedData = mlatableInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="flex flex-col gap-8 md:gap-12 py-4">
      {/* Page Breadcrumb Navigation */}
      <div className={"flex flex-row justify-between items-center"}>
        <DashboardPath
          pathdata={[
            {
              label: "Dashboard",
              Icon: <SpaceDashboardIcon sx={{ fontSize: 15 }} />,
              link: "/mla-admin/dashboard",
            },
            {
              label: "Plate Number Request",
              Icon: <SpaceDashboardIcon sx={{ fontSize: 15 }} />,
              link: "/mla-admin/dashboard/plate-number-request",
            },
          ]}
        />
        <Button>Create New Stock</Button>
      </div>

      {/* Search and Filter Section */}
      <CardContainer className={"flex flex-col gap-5"}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className={"flex flex-col gap-3"}>
            <p className={"font-semibold"}>Tracking ID</p>
            <Input placeholder="Tracking Id" />
          </div>

          <DashboardCompSelect
            title={"Plate Number Type"}
            placeholder={"-- Select Type --"}
            items={["Private", "Commercial"]}
          />

          <DashboardCompSelect
            title={"Insurance Status"}
            placeholder={"-- Select Status --"}
            items={["private", "commercial"]}
          />
        </div>

        <div
          className={
            "grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr] gap-4 mt-4 items-end"
          }
        >
          <DashboardCompSelect
            title={"Request Status"}
            placeholder={"-- Select Status --"}
            items={["private", "commercial"]}
          />

          <DatePicker
            date={startDate}
            setDate={setStartDate}
            title={"Start Date"}
          />
          <DatePicker date={endDate} setDate={setEndDate} title={"End Date"} />

          <Button>Search</Button>
        </div>
      </CardContainer>

      {/* Table Section */}
      <div className="flex flex-col gap-3 border border-neutral-300 rounded-lg">
        <div className="border-t border-neutral-300 rounded-lg overflow-hidden">
          <DashboardTable headers={mlaTableHeaders} data={paginatedData} />
        </div>
        <div className="p-5 ml-auto">
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </main>
  );
}
