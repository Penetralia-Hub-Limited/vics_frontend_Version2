"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import { tableInvoices, tableHeaders } from "@/common/constant";
import CardContainer from "@/components/general/card-container";
import DashboardTable from "@/components/dashboard/dashboard-table";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DashboardPath from "@/components/dashboard/dashboard-path";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const totalPages = Math.ceil(tableInvoices.length / itemsPerPage);
  const paginatedData = tableInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className={"flex flex-col gap-8 md:gap-12 py-4"}>
      <div className={"flex flex-row justify-between items-center"}>
        <DashboardPath
          pathdata={[
            {
              label: "Dashboard",
              Icon: <SpaceDashboardIcon sx={{ fontSize: 15 }} />,
              link: "/store-manager-admin/dashboard",
            },
            {
              label: "Manage Stock",
              Icon: <SpaceDashboardIcon sx={{ fontSize: 15 }} />,
              link: "/store-manager-admin/stock-management",
            },
          ]}
        />

        <Button>Create New Stock</Button>
      </div>

      <CardContainer className={"flex flex-col gap-5"}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <DashboardCompSelect
            title={"LGA"}
            placeholder={"-- Select LGA --"}
            items={["lagos", "abuja"]}
          />

          <DashboardCompSelect
            title={"Type"}
            placeholder={"-- Select Type --"}
            items={["private", "commercial"]}
          />

          <div className={"flex flex-col gap-3"}>
            <p className={"font-semibold"}>placeholder</p>
            <Input placeholder="placeholder" />
          </div>
        </div>

        <div
          className={
            "grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr] gap-4 mt-4 items-end"
          }
        >
          <DatePicker
            date={startDate}
            setDate={setStartDate}
            title={"Start Date"}
          />
          <DatePicker date={endDate} setDate={setEndDate} title={"End Date"} />

          <Button>Search Store</Button>
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
