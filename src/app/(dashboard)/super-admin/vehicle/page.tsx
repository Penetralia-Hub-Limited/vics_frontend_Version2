"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, VehicleSVG } from "@/common/svgs";

import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";

const tableColumns = [
  { key: "id" as const, label: "S/N" },
  { key: "platenumber" as const, label: "Number of Plates" },
  { key: "type" as const, label: "Type" },
  { key: "category" as const, label: "Category" },
  { key: "chasisNo" as const, label: "Chasis Number" },
  { key: "engineNo" as const, label: "Engine Number" },
  { key: "vehiclemake" as const, label: "Vehicle Make" },
  { key: "model" as const, label: "Model" },
  { key: "year" as const, label: "Year" },
];

const tableData = [
  {
    id: 1,
    platenumber: "ASKJA3",
    type: "Private (Direct)",
    category: "Vehicle Between 2.0 - 3.0",
    chasisNo: "JKJJJLWE232423",
    engineNo: "JK",
    vehiclemake: "JK343323",
    model: "JK343323",
    year: "2025",
  },
  {
    id: 2,
    platenumber: "ASKJA3",
    type: "Private (Direct)",
    category: "Vehicle Between 2.0 - 3.0",
    chasisNo: "JKJJJLWE232423",
    engineNo: "JK",
    vehiclemake: "JK343323",
    model: "JK343323",
    year: "2025",
  },
  {
    id: 3,
    platenumber: "ASKJA3",
    type: "Private (Direct)",
    category: "Vehicle Between 2.0 - 3.0",
    chasisNo: "JKJJJLWE232423",
    engineNo: "JK67235273",
    vehiclemake: "JK343323",
    model: "JK343323",
    year: "2025",
  },
];

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  interface TableRow {
    id: number;
    platenumber: string;
    type: string;
    category: string;
    chasisNo: string;
    engineNo: string;
    vehiclemake: string;
    model: string;
    year: string;
  }

  interface RowAction {
    label: string;
    action: () => void;
  }

  const getRowActions = (row: TableRow): RowAction[] => [
    {
      label: "View",
      action: () => console.log("Viewing details for:", row),
    },
  ];

  return (
    <main className={"flex flex-col gap-8 md:gap-12 overflow-hidden"}>
      <div
        className={
          "flex flex-col gap-5 md:flex-row justify-between items-center"
        }
      >
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
          ]}
        />

        <Button>Add New Vehicle</Button>
      </div>

      <CardContainer className={"flex flex-col gap-5"}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className={"flex flex-col gap-3"}>
            <p className={"font-semibold capitalize"}>Plate Number</p>
            <Input placeholder="placeholder" />
          </div>

          <DatePicker
            date={startDate}
            setDate={setStartDate}
            title={"Start Date"}
          />
          <DatePicker date={endDate} setDate={setEndDate} title={"End Date"} />

          <Button>Search</Button>
        </div>
      </CardContainer>

      <div
        className={"flex flex-col gap-3 border-1 border-neutral-300 rounded-lg"}
      >
        <div className={"border-t-1 border-neutral-300 rounded-lg"}>
          <DataTableWButton
            columns={tableColumns}
            data={paginatedData}
            rowActions={getRowActions}
          />
        </div>
        <div className={"p-5 ml-auto"}>
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </main>
  );
}
