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
import { PlateNumberType } from "@/common/enum";
import { useSelector } from "react-redux";
import { selectPlateNumber } from "@/store/plateNumber/plate-number-selector";

const plateNoReportHeader = [
  { title: "S/N", key: "sid" },
  { title: "MLA", key: "mla" },
  { title: "Plate Number", key: "number" },
  { title: "Plate Type", key: "type" },
  // { title: "Station", key: "station" },
  { title: "Transaction Date", key: "created_at" },
  { title: "Amount", key: "amount" },
];

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const mlaReportData = useSelector(selectPlateNumber);

  const [inputValues, setInputValues] = useState<{
    station: string;
    plateType: PlateNumberType | undefined;
  }>({
    station: "",
    plateType: undefined,
  });

  // finding the total amount
  const totalAmount = mlaReportData.reduce(
    (acc, sum) => acc + sum.int_amount,
    0
  );

  console.log(totalAmount);

  const totalPages = Math.ceil(mlaReportData.length / itemsPerPage);
  const paginatedData = mlaReportData.slice(
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
            link: "/mla-admin/dashboard",
          },
          {
            label: "MLA Reports",
            Icon: ReportSVG,
            link: "/mla-admin/report",
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
            items={[...Object.values(PlateNumberType)]}
            selected={inputValues.plateType}
            onSelect={(selected) =>
              setInputValues((prev) => ({
                ...prev,
                plateType: (selected as PlateNumberType) ?? undefined,
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
            <span className={"font-semibold"}>{mlaReportData.length}</span>
          </p>
          <p className={"text-sm"}>
            Total Amount Sold:{" "}
            <span className={"font-semibold"}>
              {formattedAmount(isNaN(totalAmount) ? 0 : totalAmount)}
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
