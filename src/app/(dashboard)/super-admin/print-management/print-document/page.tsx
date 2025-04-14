"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, PrintSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { PaymentStatus } from "@/common/enum";

const tableColumns = [
  { key: "id", title: "S/N" },
  { key: "payername", title: "Payer Name" },
  { key: "invoicenumber", title: "Invoice Number" },
  { key: "amount", title: "Amount" },
  { key: "createdby", title: "Created By" },
  { key: "datecreated", title: "Date Created" },
  { key: "datepaid", title: "Date Paid" },
  { key: "paymentstatus", title: "Payent Status" },
];

const tableData = [
  {
    id: 1,
    payername: "Jay K.",
    invoicenumber: "234232CDS2323",
    amount: 401,
    createdby: "Akanbi S.",
    datecreated: new Date(),
    datepaid: new Date(),
    paymentstatus: PaymentStatus.PAID,
  },
  {
    id: 2,
    payername: "Jay K.",
    invoicenumber: "234232CDS2323",
    amount: 401,
    createdby: "Akanbi S.",
    datecreated: new Date(),
    datepaid: new Date(),
    paymentstatus: PaymentStatus.PAID,
  },
  {
    id: 3,
    payername: "Jay K.",
    invoicenumber: "234232CDS2323",
    amount: 401,
    createdby: "Akanbi S.",
    datecreated: new Date(),
    datepaid: new Date(),
    paymentstatus: PaymentStatus.NOTPAID,
  },
];

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [inputValues, setInputValues] = useState<{
    name: string;
    mla: string;
    invoiceNumber: string;
  }>({
    name: "",
    mla: "",
    invoiceNumber: "",
  });

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
            link: "/store-manager-admin/dashboard",
          },
          {
            label: "Print Management",
            Icon: PrintSVG,
            link: "/super-admin/print-management/print-document",
          },
        ]}
      />

      <CardContainer className={"flex flex-col gap-5"}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <InputWithLabel
            items={{
              id: "name",
              label: "Name",
              placeholder: "Name",
              type: "text",
              htmlfor: "name",
            }}
            value={inputValues.name}
            onChange={(e) =>
              setInputValues((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
          <InputWithLabel
            items={{
              id: "mla",
              label: "MLA",
              placeholder: "MLA",
              type: "text",
              htmlfor: "mla",
            }}
            value={inputValues.mla}
            onChange={(e) =>
              setInputValues((prev) => ({
                ...prev,
                mla: e.target.value,
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
            value={inputValues.invoiceNumber}
            onChange={(e) =>
              setInputValues((prev) => ({
                ...prev,
                invoiceNumber: e.target.value,
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

          <Button>Download Report</Button>
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
