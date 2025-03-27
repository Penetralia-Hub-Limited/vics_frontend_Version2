"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, ManagementSVG } from "@/common/svgs";

import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";

const tableColumns = [
  { key: "id" as const, label: "S/N" },
  { key: "endCode" as const, label: "End Code" },
  { key: "type" as const, label: "Type" },
  { key: "createdBy" as const, label: "Created By" },
  { key: "date" as const, label: "Date" },
  { key: "initialQuantity" as const, label: "Initial Quantity" },
  { key: "currentQuantity" as const, label: "Current Quantity" },
  { key: "assigned" as const, label: "Quantity Assigned" },
  { key: "sold" as const, label: "Quantity Sold" },
];

const tableData = [
  {
    id: 1,
    endCode: "JK",
    type: "Private (Direct)",
    createdBy: "Akanbi S.",
    date: new Date(),
    initialQuantity: 401,
    currentQuantity: 401,
    assigned: 0,
    sold: 0,
  },
  {
    id: 2,
    endCode: "EW",
    type: "Commercial",
    createdBy: "Sheik A.",
    date: new Date(),
    initialQuantity: 400,
    currentQuantity: 400,
    assigned: 0,
    sold: 0,
  },
  {
    id: 3,
    endCode: "IE",
    type: "Commercial",
    createdBy: "Lola S.",
    date: new Date(),
    initialQuantity: 101,
    currentQuantity: 101,
    assigned: 0,
    sold: 0,
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
    endCode: string;
    type: string;
    createdBy: string;
    date: Date;
    initialQuantity: number;
    currentQuantity: number;
    assigned: number;
    sold: number;
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
              label: "Manage Stock",
              Icon: ManagementSVG,
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
            title={"Plate Number Type"}
            placeholder={"-- Select Type --"}
            items={["private", "commercial"]}
          />

          <div className={"flex flex-col gap-3"}>
            <p className={"font-semibold capitalize"}>Plate Number End Code</p>
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
