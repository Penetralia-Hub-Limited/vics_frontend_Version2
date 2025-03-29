"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DashboardPath from "@/components/dashboard/dashboard-path";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import { DashboardSVG, ReportSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";
import { PlateNumberStatus } from "@/common/enum";

export const assignedReportHeader = [
  { key: "id" as const, title: "S/N" },
  { key: "platenumber" as const, title: "Plate Number" },
  { key: "platetype" as const, title: "Plate Type" },
  { key: "mla" as const, title: "MLA" },
  { key: "platenostatus" as const, title: "Plate Number Status" },
  { key: "date" as const, title: "Date Assigned" },
];

export const assignedReportData = [
  {
    id: 1,
    platenumber: "ILHST76",
    platetype: "Private (Direct)",
    mla: "INV001",
    platenostatus: PlateNumberStatus.ASSIGNED,
    date: new Date(),
  },
  {
    id: 2,
    platenumber: "ILHST76",
    platetype: "Private (Direct)",
    mla: "INV001",
    platenostatus: PlateNumberStatus.ASSIGNED,
    date: new Date(),
  },
  {
    id: 3,
    platenumber: "ILHST76",
    platetype: "Private (Direct)",
    mla: "INV001",
    platenostatus: PlateNumberStatus.ASSIGNED,
    date: new Date(),
  },
  {
    id: 4,
    platenumber: "ILHST76",
    platetype: "Private (Direct)",
    mla: "INV001",
    platenostatus: PlateNumberStatus.ASSIGNED,
    date: new Date(),
  },
  {
    id: 5,
    platenumber: "ILHST76",
    platetype: "Private (Direct)",
    mla: "INV001",
    platenostatus: PlateNumberStatus.UNASSIGNED,
    date: new Date(),
  },
  {
    id: 6,
    platenumber: "ILHST76",
    platetype: "Private (Direct)",
    mla: "INV001",
    platenostatus: PlateNumberStatus.UNASSIGNED,
    date: new Date(),
  },
];

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const totalPages = Math.ceil(assignedReportData.length / itemsPerPage);
  const paginatedData = assignedReportData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  type TableData = {
    id: number;
    platenumber: string;
    platetype: string;
    mla: string;
    platenostatus: string;
    date: Date;
  };

  interface RowAction {
    title: string;
    action: () => void;
  }

  const getRowActions = (row: unknown): RowAction[] => {
    const tableRow = row as TableData;
    return [
      {
        title: "Preview",
        action: () => {},
      },
      {
        title: "Edit",
        action: () => console.log("Viewing details for:", tableRow),
      },
    ];
  };

  return (
    <main className="flex flex-col gap-8 md:gap-12 py-4">
      <DashboardPath
        pathdata={[
          {
            label: "Dashboard",
            Icon: DashboardSVG,
            link: "/super-admin/dashboard",
          },
          {
            label: "Assigned Plate Number Report",
            Icon: ReportSVG,
            link: "/super-admin/report/plate-number-sales",
          },
        ]}
      />

      {/* Search and Filter Section */}
      <CardContainer className={"flex flex-col gap-5"}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <DashboardCompSelect
            title={"LGA"}
            placeholder={"-- Select LGA --"}
            items={["Private", "Commercial"]}
          />

          <DashboardCompSelect
            title={"Plate Number Type"}
            placeholder={"-- Select Type --"}
            items={["Private", "Commercial"]}
          />

          <InputWithLabel
            items={{
              id: "platenumber",
              label: "Plate Number",
              placeholder: "Plate number",
              type: "text",
              htmlfor: "platenumber",
            }}
          />
        </div>

        <div className={"grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 items-end"}>
          <DatePicker
            date={startDate}
            setDate={setStartDate}
            title={"Start Date"}
          />
          <DatePicker date={endDate} setDate={setEndDate} title={"End Date"} />

          <Button>Download Report</Button>
        </div>
      </CardContainer>

      {/* Table Section */}
      <div className="flex flex-col gap-3 border border-neutral-300 rounded-lg">
        <div className={"p-3"}>
          <p className={"text-sm"}>
            Total Number of Plates Assigned:{" "}
            <span className={"font-semibold"}>{totalPages}</span>
          </p>
        </div>
        <div>
          <DataTableWButton
            headers={assignedReportHeader}
            data={paginatedData}
            rowActions={getRowActions}
          />
        </div>
        <div className="p-5 ml-auto">
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </main>
  );
}
