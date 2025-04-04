"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, SalesSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import { PaymentStatus } from "@/common/enum";
import Modal from "@/components/general/modal";
import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";
import { RowAction } from "@/components/dashboard/dashboard-table-w-button";

interface TableRow {
  id: number;
  platenumber: string;
  platetype: string;
  amount: string;
  platerecommended: number | string;
  createdby: string;
  buyer: string;
  paymentstatus: PaymentStatus;
  date: Date;
}

const tableColumns = [
  { key: "id", title: "S/N" },
  { key: "platenumber", title: "Plate Number" },
  { key: "platetype", title: "Plates Type" },
  { key: "amount", title: "Amount" },
  { key: "buyer", title: "Buyer" },
  { key: "date", title: "Date Sold" },
  { key: "paymentstatus", title: "Payment Status" },
];

const tableData = [
  {
    id: 1,
    platenumber: "JK34FSK",
    platetype: "Private (Direct)",
    amount: "Akanbi S.",
    platerecommended: 401,
    buyer: "Dave E ",
    paymentstatus: PaymentStatus.PAID,
    date: new Date(),
  },
  {
    id: 2,
    platenumber: "JK34FSK",
    platetype: "Private (Direct)",
    amount: "Akanbi S.",
    platerecommended: 401,
    buyer: "Dave E ",
    paymentstatus: PaymentStatus.NOTPAID,
    date: new Date(),
  },
  {
    id: 3,
    platenumber: "JK34FSK",
    platetype: "Private (Direct)",
    amount: "Akanbi S.",
    platerecommended: 401,
    buyer: "Dave E ",
    paymentstatus: PaymentStatus.NOTPAID,
    date: new Date(),
  },
];

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [inputValues, setInputValues] = useState<{
    plateNumber: string;
    paymentStatus: string;
    InvoiceNumber: string;
  }>({
    plateNumber: "",
    paymentStatus: "",
    InvoiceNumber: "",
  });

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRowActions = (row: unknown): RowAction[] => {
    const tableRow = row as TableRow;
    return [
      {
        title: "View Details",
        action: () => console.log("Viewing details for:", tableRow),
      },
      {
        title: "Print Receipt",
        action: () => console.log("Viewing details for:", tableRow),
      },
    ];
  };

  console.log(inputValues);

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
              label: "Sales Dashboard",
              Icon: SalesSVG,
              link: "/super-admin/sales/sales-report",
            },
          ]}
        />

        <Modal
          title={"New Plate Sales"}
          content={<></>}
          btnText={"New Sales"}
          footerBtn={<Button type="submit">Validate Phone Number</Button>}
        />
      </div>

      <CardContainer className={"flex flex-col gap-5"}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <InputWithLabel
            items={{
              id: "plateNumber",
              label: "Plate Number",
              placeholder: "Plate Number",
              type: "text",
              htmlfor: "plateNumber",
            }}
            value={inputValues.plateNumber}
            onChange={(e) =>
              setInputValues((prev) => ({
                ...prev,
                plateNumber: e.target.value,
              }))
            }
          />

          <DashboardCompSelect
            title={"Payment Status"}
            placeholder={"-- Select Status --"}
            items={["private", "commercial"]}
            selected={inputValues.paymentStatus}
            onSelect={(selected) =>
              setInputValues((prev) => ({
                ...prev,
                paymentStatus: selected ? String(selected) : "",
              }))
            }
          />

          <InputWithLabel
            items={{
              id: "invoiceNumber",
              label: "Invoice Number",
              placeholder: "Invoice Number",
              type: "text",
              htmlfor: "invoiceNumber",
            }}
            value={inputValues.InvoiceNumber}
            onChange={(e) =>
              setInputValues((prev) => ({
                ...prev,
                InvoiceNumber: e.target.value,
              }))
            }
          />
        </div>

        <div
          className={
            "grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr] gap-4 mt-4 items-end"
          }
        >
          <DatePicker date={fromDate} setDate={setFromDate} title={"From"} />
          <DatePicker date={toDate} setDate={setToDate} title={"To"} />

          <Button>Search</Button>
        </div>
      </CardContainer>

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
