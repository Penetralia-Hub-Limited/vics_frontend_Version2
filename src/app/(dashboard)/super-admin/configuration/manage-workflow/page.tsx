"use client";

import { SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, ConfigurationSVG } from "@/common/svgs";
import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";
import { useSelector } from "react-redux";
import { selectPlateNumberRequestTableData } from "@/store/plate-number-orders/plate-number-order-selector";
import {
  CreateNewWorkFlow,
  CreateNewWorkFlowInitialValues,
  CreateNewWorkFlowProp,
} from "@/components/dashboard/verification-forms/create-new-workflow";
import Modal from "@/components/general/modal";

const tableColumns = [
  { key: "sid", title: "S/N" },
  { key: "steps_completed", title: "Steps" },
  { key: "type", title: "Type" },
  { key: "approver", title: "Approving Officer" },
  { key: "superapprover", title: "Super Approver" },
  { key: "finalstage", title: "Final Stage" },
  { key: "created_by", title: "Created By" },
  { key: "created_at", title: "Date Created" },
];

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const workflowData = useSelector(selectPlateNumberRequestTableData);
  const [modalInput, setModalInput] = useState<CreateNewWorkFlowProp>(
    CreateNewWorkFlowInitialValues
  );

  const totalPages = Math.ceil(workflowData.length / itemsPerPage);
  const paginatedData = workflowData.slice(
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

        <Modal
          title={"Add New Workflow"}
          content={
            <CreateNewWorkFlow input={modalInput} setInput={setModalInput} />
          }
          btnText={"Add New Workflow"}
          footerBtn={<Button type="submit">Submit</Button>}
        />
      </div>

      <div
        className={"flex flex-col gap-3 border-1 border-primary-300 rounded-lg"}
      >
        <div
          className={"border-t-1 border-primary-300 rounded-lg overflow-hidden"}
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
