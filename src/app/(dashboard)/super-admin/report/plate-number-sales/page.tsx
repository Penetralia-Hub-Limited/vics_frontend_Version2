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
import { selectPlateNumber } from "@/store/plateNumber/plate-number-selector";
import { useSelector } from "react-redux";

const plateNoReportHeader = [
  { title: "S/N", key: "sid" },
  { title: "MLA", key: "created_by" },
  { title: "Plate Number", key: "number" },
  { title: "Plate Type", key: "type" },
  { title: "Transaction Date", key: "created_at" },
  { title: "Amount", key: "amount" },
];

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [inputValues, setInputValues] = useState<{
    plateNumberType: PlateNumberType | undefined;
    plateNumber: string;
  }>({
    plateNumberType: undefined,
    plateNumber: "",
  });
  const salesAssessmentData = useSelector(selectPlateNumber);

  const totalAmount = salesAssessmentData.reduce(
    (sum, item) => sum + parseInt(item.amount),
    0
  );

  const totalPages = Math.ceil(salesAssessmentData.length / itemsPerPage);
  const paginatedData = salesAssessmentData.slice(
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
            label: "Plate Number Sales Report",
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
              id: "platenumber",
              label: "Plate Number",
              placeholder: "Plate number",
              type: "text",
              htmlfor: "platenumber",
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
            title={"Plate Number Type"}
            placeholder={"-- Select Type --"}
            items={["Private", "Commercial"]}
            selected={inputValues.plateNumberType}
            onSelect={(selected) =>
              setInputValues((prev) => ({
                ...prev,
                plateNumberType: selected as PlateNumberType | undefined,
              }))
            }
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
      <div className="flex flex-col gap-3 border border-primary-300 rounded-lg">
        <div className={"flex flex-row justify-between p-3"}>
          <p className={"text-sm"}>
            Total Plate Number Sales:{" "}
            <span className={"font-semibold"}>
              {salesAssessmentData.length}
            </span>
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
