"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DashboardPath from "@/components/dashboard/dashboard-path";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import { DashboardSVG, ReportSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";
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
  { key: "date", title: "Date Assigned" },
];

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [inputValues, setInputValues] = useState<{
    plateNumberType: PlateNumberType | undefined;
    plateNumber: string;
    lga: string;
  }>({
    plateNumberType: undefined,
    plateNumber: "",
    lga: "",
  });
  const assignedPlateNumber = useSelector(selectPlateNumber);
  const { lgas } = useSelector((state: RootState) => state?.lga);
  const filteredLGA = lgas.map((lga) => lga.name);

  const totalPages = Math.ceil(assignedPlateNumber.length / itemsPerPage);
  const paginatedData = assignedPlateNumber.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  type TableData = {
    id: number;
    platenumber: string;
    platetype: string;
    mla: string;
    platenostatus: string;
    date: Date;
  };

  interface RowAction {
    title: string;
    action: () => void;
  }

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
        <div className={"p-3"}>
          <p className={"text-sm"}>
            Total Number of Plates Assigned:{" "}
            <span className={"font-semibold"}>{totalPages}</span>
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
