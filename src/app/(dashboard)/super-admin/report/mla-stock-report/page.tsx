"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DashboardPath from "@/components/dashboard/dashboard-path";
import DashboardTable from "@/components/dashboard/dashboard-table";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import { DashboardSVG, ReportSVG } from "@/common/svgs";
import { PlateNumberType } from "@/common/enum";

const stockReportHeaders = [
  { title: "S/N", key: "id" },
  { title: "MLA", key: "mla" },
  { title: "Station", key: "station" },
  { title: "Assigned Plates", key: "assignedplates" },
  { title: "Sold Plates", key: "soldplates" },
  { title: "Stock Level", key: "stocklevel" },
];

const stockReportHeadersData = [
  {
    id: 1,
    mla: "INV001",
    station: "South West",
    assignedplates: "Private (Direct)",
    soldplates: 76,
    stocklevel: 106,
  },
  {
    id: 2,
    mla: "INV001",
    station: "South West",
    assignedplates: "Private (Direct)",
    soldplates: 76,
    stocklevel: 106,
  },
  {
    id: 3,
    mla: "INV001",
    station: "South West",
    assignedplates: "Private (Direct)",
    soldplates: 76,
    stocklevel: 106,
  },
  {
    id: 4,
    mla: "INV001",
    station: "South West",
    assignedplates: "Private (Direct)",
    soldplates: 76,
    stocklevel: 106,
  },
  {
    id: 5,
    mla: "INV001",
    station: "South West",
    assignedplates: "Private (Direct)",
    soldplates: 76,
    stocklevel: 106,
  },
  {
    id: 6,
    mla: "INV001",
    station: "South West",
    assignedplates: "Private (Direct)",
    soldplates: 76,
    stocklevel: 106,
  },
  {
    id: 7,
    mla: "INV001",
    station: "South West",
    assignedplates: "Private (Direct)",
    soldplates: 76,
    stocklevel: 106,
  },
  {
    id: 8,
    mla: "INV001",
    station: "South West",
    assignedplates: "Private (Direct)",
    soldplates: 76,
    stocklevel: 106,
  },
  {
    id: 9,
    mla: "INV001",
    station: "South West",
    assignedplates: "Private (Direct)",
    soldplates: 76,
    stocklevel: 106,
  },
  {
    id: 10,
    mla: "INV001",
    station: "South West",
    assignedplates: "Private (Direct)",
    soldplates: 76,
    stocklevel: 106,
  },
  {
    id: 11,
    mla: "INV001",
    station: "South West",
    assignedplates: "Private (Direct)",
    soldplates: 76,
    stocklevel: 106,
  },
];

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputValues, setInputValues] = useState<{
    zoneOffice: string;
    mla: string;
    plateNumberType: PlateNumberType | undefined;
  }>({
    zoneOffice: "",
    mla: "",
    plateNumberType: undefined,
  });

  const totalPages = Math.ceil(stockReportHeadersData.length / itemsPerPage);
  const paginatedData = stockReportHeadersData.slice(
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
            label: "MLA Stock Report",
            Icon: ReportSVG,
            link: "/super-admin/dashboard/report",
          },
        ]}
      />

      {/* Search and Filter Section */}
      <CardContainer className={"flex flex-col gap-5"}>
        <div className={"grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end"}>
          <DashboardCompSelect
            title={"Zone Office"}
            placeholder={"-- Select Office --"}
            items={["Private", "Commercial"]}
            selected={inputValues.zoneOffice}
            onSelect={(selected) =>
              setInputValues((prev) => ({
                ...prev,
                zoneOffice: (selected as string) ?? "",
              }))
            }
          />

          <DashboardCompSelect
            title={"MLA"}
            placeholder={"-- Select MLA --"}
            items={["Private", "Commercial"]}
            selected={inputValues.mla}
            onSelect={(selected) =>
              setInputValues((prev) => ({
                ...prev,
                mla: (selected as string) ?? "",
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

          <Button>Download Report</Button>
        </div>
      </CardContainer>

      {/* Table Section */}
      <div className="flex flex-col gap-3 border border-neutral-300 rounded-lg">
        <div className={"p-3"}>
          <p className={"text-sm"}>
            Total Number of MLAs:{" "}
            <span className={"font-semibold"}>{totalPages}</span>
          </p>
        </div>
        <div>
          <DashboardTable headers={stockReportHeaders} data={paginatedData} />
        </div>
        <div className="p-5 ml-auto">
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </main>
  );
}
