"use client";

import _ from "lodash";
import { useState, useEffect } from "react";
import { isWithinInterval } from "date-fns";
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

type inputValuesProp = {
  plateNumberType: PlateNumberType | undefined;
  plateNumber: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
};

const inputInitialValues = {
  plateNumberType: undefined,
  plateNumber: "",
  startDate: undefined,
  endDate: undefined,
};

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputValues, setInputValues] =
    useState<inputValuesProp>(inputInitialValues);
  const salesAssessmentData = useSelector(selectPlateNumber);
  const [plateSalesData, setPlateSalesData] = useState(salesAssessmentData);

  const { plateNumber, plateNumberType, startDate, endDate } = inputValues;
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      _.isEmpty(_.trim(plateNumber)) &&
      _.isEmpty(_.trim(plateNumberType)) &&
      _.isEmpty(startDate) &&
      _.isEmpty(endDate)
    ) {
      setPlateSalesData(salesAssessmentData);
      return;
    }

    const filteredData = _.filter(salesAssessmentData, (salesData) => {
      let matches = false;

      if (!_.isEmpty(_.trim(plateNumber))) {
        matches =
          matches ||
          _.toLower(salesData?.number || "") === _.toLower(plateNumber);
      }

      if (!_.isEmpty(_.trim(plateNumberType))) {
        matches =
          matches ||
          _.toLower(salesData?.type || "") === _.toLower(plateNumberType);
      }

      if (startDate && endDate) {
        matches =
          matches ||
          isWithinInterval(new Date(salesData?.created_at as string), {
            start: new Date(startDate),
            end: new Date(endDate),
          });
      }

      return matches;
    });

    setPlateSalesData(filteredData);
  };

  useEffect(() => {
    if (
      _.isEmpty(_.trim(plateNumber)) &&
      _.isEmpty(_.trim(plateNumberType)) &&
      _.isEmpty(startDate) &&
      _.isEmpty(endDate)
    ) {
      setPlateSalesData(salesAssessmentData);
    }
  }, [salesAssessmentData, inputValues]);

  const totalAmount = plateSalesData.reduce(
    (sum, item) => sum + item.int_amount,
    0
  );

  const totalPages = Math.ceil(plateSalesData.length / itemsPerPage);
  const paginatedData = plateSalesData.slice(
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
        <form action="#" onSubmit={handleSearch}>
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

          <div
            className={"grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 items-end"}
          >
            <DatePicker
              title={"Start Date"}
              date={inputValues.startDate}
              setDate={(date) =>
                setInputValues((prev) => ({
                  ...prev,
                  startDate: date as Date | undefined,
                }))
              }
            />

            <DatePicker
              title={"End Date"}
              date={inputValues.endDate}
              setDate={(date) =>
                setInputValues((prev) => ({
                  ...prev,
                  endDate: date as Date | undefined,
                }))
              }
            />

            <Button type="submit">Download Report</Button>
          </div>
        </form>
      </CardContainer>

      {/* Table Section */}
      <div className="flex flex-col gap-3 border border-primary-300 rounded-lg">
        <div className={"flex flex-row justify-between p-3"}>
          <p className={"text-sm"}>
            Total Plate Number Sales:{" "}
            <span className={"font-semibold"}>{plateSalesData.length}</span>
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
