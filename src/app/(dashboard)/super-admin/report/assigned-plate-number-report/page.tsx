"use client";

import _ from "lodash";
import { useState, useEffect } from "react";
import { isWithinInterval } from "date-fns";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DashboardPath from "@/components/dashboard/dashboard-path";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import { DashboardSVG, ReportSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import {
  DataTableWButton,
  TableData,
  RowAction,
} from "@/components/dashboard/dashboard-table-w-button";
import { PlateNumberType } from "@/common/enum";
import { useSelector } from "react-redux";
import { selectPlateNumber } from "@/store/plateNumber/plate-number-selector";
import { RootState } from "@/store/store";

const assignedReportHeader = [
  { key: "sid", title: "S/N" },
  { key: "number", title: "Plate Number" },
  { key: "type", title: "Plate Type" },
  { key: "created_by", title: "MLA" },
  { key: "status", title: "Plate Number Status" },
  { key: "assigned_date", title: "Date Assigned" },
];

type inputValuesProp = {
  plateNumberType: PlateNumberType | undefined;
  plateNumber: string;
  lga: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
};

const inputInitialValues = {
  plateNumberType: undefined,
  plateNumber: "",
  lga: "",
  startDate: undefined,
  endDate: undefined,
};

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputValues, setInputValues] =
    useState<inputValuesProp>(inputInitialValues);
  const { lgas } = useSelector((state: RootState) => state?.lga);
  const filteredLGA = lgas.map((lga) => lga.name);
  const assignedPlateNumber = useSelector(selectPlateNumber);
  const [assignedPlateData, setAssignedPlateData] =
    useState(assignedPlateNumber);

  const { plateNumber, plateNumberType, lga, startDate, endDate } = inputValues;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      _.isEmpty(_.trim(plateNumber)) &&
      _.isEmpty(_.trim(plateNumberType)) &&
      _.isEmpty(_.trim(lga)) &&
      _.isEmpty(startDate) &&
      _.isEmpty(endDate)
    ) {
      setAssignedPlateData(assignedPlateNumber);
      return;
    }

    const filteredData = _.filter(assignedPlateNumber, (assignedData) => {
      let matches = false;

      if (!_.isEmpty(_.trim(plateNumber))) {
        matches =
          matches ||
          _.toLower(assignedData?.number || "") === _.toLower(plateNumber);
      }

      if (!_.isEmpty(_.trim(plateNumberType))) {
        matches =
          matches ||
          _.toLower(assignedData?.type || "") === _.toLower(plateNumberType);
      }

      if (startDate && endDate) {
        matches =
          matches ||
          isWithinInterval(new Date(assignedData?.assigned_date as string), {
            start: new Date(startDate),
            end: new Date(endDate),
          });
      }

      return matches;
    });

    setAssignedPlateData(filteredData);
  };

  useEffect(() => {
    if (
      _.isEmpty(_.trim(plateNumber)) &&
      _.isEmpty(_.trim(plateNumberType)) &&
      _.isEmpty(_.trim(lga)) &&
      _.isEmpty(startDate) &&
      _.isEmpty(endDate)
    ) {
      setAssignedPlateData(assignedPlateNumber);
    }
  }, [
    assignedPlateNumber,
    plateNumber,
    plateNumberType,
    lga,
    startDate,
    endDate,
  ]);

  const length = assignedPlateData.length;
  const totalPages = Math.ceil(length / itemsPerPage);
  const paginatedData = assignedPlateData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRowActions = (row: unknown): RowAction[] => {
    const tableRow = row as TableData;
    return [
      {
        title: "Preview",
        action: () => {},
      },
      {
        title: "Edit",
        action: () => console.log("Viewing details for:", tableRow),
      },
    ];
  };

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
            label: "Assigned Plate Number Report",
            Icon: ReportSVG,
            link: "/super-admin/report/plate-number-sales",
          },
        ]}
      />

      {/* Search and Filter Section */}
      <CardContainer className={"flex flex-col gap-5"}>
        <form action="" onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <DashboardCompSelect
              title={"LGA"}
              placeholder={"-- Select LGA --"}
              items={filteredLGA}
              selected={inputValues.lga}
              onSelect={(selected) =>
                setInputValues((prev) => ({
                  ...prev,
                  lga: selected ? String(selected) : "",
                }))
              }
            />

            <DashboardCompSelect
              title={"Plate Number Type"}
              placeholder={"-- Select Type --"}
              items={[...Object.values(PlateNumberType)]}
              selected={inputValues.plateNumberType}
              onSelect={(selected) =>
                setInputValues((prev) => ({
                  ...prev,
                  plateNumberType: selected as PlateNumberType | undefined,
                }))
              }
            />

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
        <div className={"p-3"}>
          <p className={"text-sm"}>
            Total Number of Plates Assigned:{" "}
            <span className={"font-semibold"}>{length}</span>
          </p>
        </div>
        <div>
          <DataTableWButton
            headers={assignedReportHeader}
            data={paginatedData}
            rowActions={getRowActions}
          />
        </div>
        <div className="p-5 ml-auto">
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </main>
  );
}
