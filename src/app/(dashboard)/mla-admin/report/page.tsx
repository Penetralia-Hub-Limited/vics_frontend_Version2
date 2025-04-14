"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DashboardPath from "@/components/dashboard/dashboard-path";
import DashboardTable from "@/components/dashboard/dashboard-table";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import { DashboardSVG, ReportSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import { formattedAmount } from "@/common/helpers";

const plateNoReportHeader = [
  { title: "S/N", key: "id" },
  { title: "MLA", key: "mla" },
  { title: "Plate Number", key: "platenumber" },
  { title: "Plate Type", key: "platetype" },
  { title: "Station", key: "station" },
  { title: "Transaction Date", key: "date" },
  { title: "Amount", key: "amount" },
];

const plateNoReportData = [
  {
    id: 1,
    mla: "INV001",
    station: "South West",
    platenumber: "ILHST76",
    platetype: "Private (Direct)",
    date: new Date(),
    amount: 76233,
  },
  {
    id: 2,
    mla: "INV001",
    station: "South West",
    platenumber: "ILHST76",
    platetype: "Private (Direct)",
    date: new Date(),
    amount: 76233,
  },
  {
    id: 3,
    mla: "INV001",
    station: "South West",
    platenumber: "ILHST76",
    platetype: "Private (Direct)",
    date: new Date(),
    amount: 76233,
  },
  {
    id: 4,
    mla: "INV001",
    station: "South West",
    platenumber: "ILHST76",
    platetype: "Private (Direct)",
    date: new Date(),
    amount: 76233,
  },
  {
    id: 5,
    mla: "INV001",
    station: "South West",
    platenumber: "ILHST76",
    platetype: "Private (Direct)",
    date: new Date(),
    amount: 76233,
  },
  {
    id: 6,
    mla: "INV001",
    station: "South West",
    platenumber: "ILHST76",
    platetype: "Private (Direct)",
    date: new Date(),
    amount: 76233,
  },
  {
    id: 7,
    mla: "INV001",
    station: "South West",
    platenumber: "ILHST76",
    platetype: "Private (Direct)",
    date: new Date(),
    amount: 76233,
  },
  {
    id: 8,
    mla: "INV001",
    station: "South West",
    platenumber: "ILHST76",
    platetype: "Private (Direct)",
    date: new Date(),
    amount: 76233,
  },
  {
    id: 9,
    mla: "INV001",
    station: "South West",
    platenumber: "ILHST76",
    platetype: "Private (Direct)",
    date: new Date(),
    amount: 76233,
  },
  {
    id: 10,
    mla: "INV001",
    station: "South West",
    platenumber: "ILHST76",
    platetype: "Private (Direct)",
    date: new Date(),
    amount: 76233,
  },
  {
    id: 11,
    mla: "INV001",
    station: "South West",
    platenumber: "ILHST76",
    platetype: "Private (Direct)",
    date: new Date(),
    amount: 76233,
  },
];

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();

  const [inputValues, setInputValues] = useState<{
    station: string;
    plateType: string;
  }>({
    station: "",
    plateType: "",
  });

  // finding the total amount
  const totalAmount = plateNoReportData.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const totalPages = Math.ceil(plateNoReportData.length / itemsPerPage);
  const paginatedData = plateNoReportData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            label: "MLA Reports",
            Icon: ReportSVG,
            link: "/super-admin/report/plate-number-sales",
          },
        ]}
      />

      {/* Search and Filter Section */}
      <CardContainer className={"flex flex-col gap-5"}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <InputWithLabel
            items={{
              id: "station",
              label: "Station",
              placeholder: "Station",
              type: "text",
              htmlfor: "station",
            }}
            value={inputValues.station}
            onChange={(e) =>
              setInputValues((prev) => ({
                ...prev,
                station: e.target.value,
              }))
            }
          />

          <DashboardCompSelect
            title={"Plate Type"}
            placeholder={"-- Select Type --"}
            items={["Private", "Commercial"]}
            selected={inputValues.plateType}
            onSelect={(selected) =>
              setInputValues((prev) => ({
                ...prev,
                plateType: selected ? String(selected) : "",
              }))
            }
          />
        </div>

        <div className={"grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 items-end"}>
          <DatePicker date={fromDate} setDate={setFromDate} title={"From"} />
          <DatePicker date={toDate} setDate={setToDate} title={"To"} />

          <Button>Download Report</Button>
        </div>
      </CardContainer>

      {/* Table Section */}
      <div className="flex flex-col gap-3 border border-primary-300 rounded-lg">
        <div className={"flex flex-row justify-between p-3"}>
          <p className={"text-sm"}>
            Total Plate Number Sales:{" "}
            <span className={"font-semibold"}>{plateNoReportData.length}</span>
          </p>
          <p className={"text-sm"}>
            Total Amount Sold:{" "}
            <span className={"font-semibold"}>
              {formattedAmount(totalAmount)}
            </span>
          </p>
        </div>
        <div>
          <DashboardTable headers={plateNoReportHeader} data={paginatedData} />
        </div>
        <div className="p-5 ml-auto">
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </main>
  );
}
