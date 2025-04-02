"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, ConfigurationSVG } from "@/common/svgs";

import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";

const tableColumns = [
  { key: "id", title: "S/N" },
  { key: "steps", title: "Steps" },
  { key: "type", title: "Type" },
  { key: "approvingofficer", title: "Approving Officer" },
  { key: "superapprover", title: "Super Approver" },
  { key: "finalstage", title: "Final Stage" },
  { key: "createdBy", title: "Created By" },
  { key: "date", title: "Date Created" },
];

const tableData = [
  {
    id: 1,
    steps: null,
    type: null,
    approvingofficer: "Akanbi S.",
    superapprover: "David E",
    finalstage: null,
    createdBy: "Akanbi S.",
    date: new Date(),
  },
  {
    id: 2,
    steps: null,
    type: null,
    approvingofficer: "Akanbi S.",
    superapprover: "David E",
    finalstage: null,
    createdBy: "Akanbi S.",
    date: new Date(),
  },
  {
    id: 3,
    steps: null,
    type: null,
    approvingofficer: "Akanbi S.",
    superapprover: "David E",
    finalstage: null,
    createdBy: "Akanbi S.",
    date: new Date(),
  },
  {
    id: 4,
    steps: null,
    type: null,
    approvingofficer: "Akanbi S.",
    superapprover: "David E",
    finalstage: null,
    createdBy: "Akanbi S.",
    date: new Date(),
  },
  {
    id: 5,
    steps: null,
    type: null,
    approvingofficer: "Akanbi S.",
    superapprover: "David E",
    finalstage: null,
    createdBy: "Akanbi S.",
    date: new Date(),
  },
  {
    id: 6,
    steps: null,
    type: null,
    approvingofficer: "Akanbi S.",
    superapprover: "David E",
    finalstage: null,
    createdBy: "Akanbi S.",
    date: new Date(),
  },
];

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);

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
    title: string;
    action: () => void;
  }

  const getRowActions = (row: unknown): RowAction[] => {
    const tableRow = row as TableRow;
    return [
      {
        title: "View",
        action: () => console.log("Viewing details for:", tableRow),
      },
    ];
  };

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
              link: "/super-admin/dashboard",
            },
            {
              label: "Manage Workflow",
              Icon: ConfigurationSVG,
              link: "/super-admin/configuration/manage-workflow",
            },
          ]}
        />

        <Button>Add New Workflow</Button>
      </div>

      <div
        className={"flex flex-col gap-3 border-1 border-neutral-300 rounded-lg"}
      >
        <div
          className={"border-t-1 border-neutral-300 rounded-lg overflow-hidden"}
        >
          <DataTableWButton
            headers={tableColumns}
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
