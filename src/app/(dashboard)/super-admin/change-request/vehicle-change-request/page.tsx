"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, PenSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import { ApprovalStatus } from "@/common/enum";
import DashboardTable from "@/components/dashboard/dashboard-table";

const tableColumns = [
  { key: "id", title: "S/N" },
  { key: "name", title: "Name" },
  { key: "platenumber", title: "Plate Number" },
  { key: "category", title: "Category" },
  { key: "chasisnumber", title: "Chasis Number" },
  { key: "enginenumber", title: "Engine Number" },
  { key: "platetype", title: "Plate Type" },
  { key: "vehiclemake", title: "Vehicle Make" },
  { key: "model", title: "Model" },
  { key: "year", title: "Year" },
  { key: "approvalstatus", title: "Approval Status" },
];

const tableData = [
  {
    id: 1,
    name: "JK",
    platenumber: "Private (Direct)",
    category: "Akanbi S.",
    chasisnumber: 34535343,
    enginenumber: 43234201,
    platetype: "Private (Direct)",
    vehiclemake: "Toyota CE",
    model: "2018FE",
    year: 2025,
    approvalstatus: ApprovalStatus.APPROVED,
  },
  {
    id: 2,
    name: "JK",
    platenumber: "Private (Direct)",
    category: "Akanbi S.",
    chasisnumber: 34535343,
    enginenumber: 43234201,
    platetype: "Private (Direct)",
    vehiclemake: "Toyota CE",
    model: "2018FE",
    year: 2025,
    approvalstatus: ApprovalStatus.APPROVED,
  },
  {
    id: 3,
    name: "JK",
    platenumber: "Private (Direct)",
    category: "Akanbi S.",
    chasisnumber: 34535343,
    enginenumber: 43234201,
    platetype: "Private (Direct)",
    vehiclemake: "Toyota CE",
    model: "2018FE",
    year: 2025,
    approvalstatus: ApprovalStatus.NOTAPPROVED,
  },
];

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [plateNumber, setPlateNumber] = useState<string>("");

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className={"flex flex-col gap-8 md:gap-12 overflow-hidden"}>
      <DashboardPath
        pathdata={[
          {
            label: "Dashboard",
            Icon: DashboardSVG,
            link: "/super-admin/dashboard",
          },
          {
            label: "Vehicle Change Requests",
            Icon: PenSVG,
            link: "/super-admin/change-request/vehicle-change-request",
          },
        ]}
      />

      <CardContainer className={"flex flex-col gap-5"}>
        <div className={"grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end"}>
          <InputWithLabel
            items={{
              id: "platenumber",
              label: "Plate Number",
              placeholder: "Plate Number",
              type: "text",
              htmlfor: "platenumber",
            }}
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
          />

          <DatePicker date={fromDate} setDate={setFromDate} title={"From"} />
          <DatePicker date={toDate} setDate={setToDate} title={"To"} />

          <Button>Search</Button>
        </div>
      </CardContainer>

      <div
        className={"flex flex-col gap-3 border-1 border-primary-300 rounded-lg"}
      >
        <div
          className={"border-t-1 border-primary-300 rounded-lg overflow-hidden"}
        >
          <DashboardTable headers={tableColumns} data={paginatedData} />
        </div>
        <div className={"p-5 ml-auto"}>
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </main>
  );
}
