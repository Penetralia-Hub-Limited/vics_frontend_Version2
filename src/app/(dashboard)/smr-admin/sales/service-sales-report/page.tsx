"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, ReportSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { formattedAmount } from "@/common/helpers";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const tableColumns = [
  { key: "id", title: "S/N" },
  { key: "transactionref", title: "Transaction Ref" },
  { key: "mla", title: "MLA" },
  { key: "station", title: "Station" },
  { key: "buyer", title: "Buyer" },
  { key: "servicetype", title: "Service Type" },
  { key: "regtype", title: "Registration Type" },
  { key: "transactiondate", title: "Transaction Date" },
  { key: "amount", title: "Amount" },
];

const tableData = [
  {
    id: 1,
    transactionref: 234768692380,
    mla: "Akanbi E",
    station: "MORO",
    buyer: "Akanbi E",
    servicetype: "Driver's Test",
    regtype: "Private (Direct)",
    transactiondate: new Date(),
    amount: 345356,
  },
  {
    id: 2,
    transactionref: 234768692380,
    mla: "Akanbi E",
    station: "MORO",
    buyer: "Akanbi E",
    servicetype: "Driver's Test",
    regtype: "Private (Direct)",
    transactiondate: new Date(),
    amount: 345356,
  },
  {
    id: 3,
    transactionref: 234768692380,
    mla: "Akanbi E",
    station: "MORO",
    buyer: "Akanbi E",
    servicetype: "Driver's Test",
    regtype: "Private (Direct)",
    transactiondate: new Date(),
    amount: 345356,
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

  const totalAmount = tableData.reduce((sum, item) => sum + item.amount, 0);

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
            link: "/smr-admin/dashboard",
          },
          {
            label: "Service Sales Report",
            Icon: ReportSVG,
            link: "/smr-admin/sales/service-sales-report",
          },
        ]}
      />

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

          <Button className={"flex flex-row gap-2"}>
            <p>Download Report</p>
            <ArrowDropDownIcon />
          </Button>
        </div>
      </CardContainer>

      <div className="flex flex-col gap-3 border border-neutral-300 rounded-lg">
        <div className={"flex flex-row justify-between p-3"}>
          <p className={"text-sm"}>
            Total Plate Number Sales:{" "}
            <span className={"font-semibold"}>{tableData.length}</span>
          </p>
          <p className={"text-sm"}>
            Total Amount Sold:{" "}
            <span className={"font-semibold"}>
              {formattedAmount(totalAmount)}
            </span>
          </p>
        </div>
        <div>
          <DashboardTable headers={tableColumns} data={paginatedData} />
        </div>
        <div className="p-5 ml-auto">
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </main>
  );
}
