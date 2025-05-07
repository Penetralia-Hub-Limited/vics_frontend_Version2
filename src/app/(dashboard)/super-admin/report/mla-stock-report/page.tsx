"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DashboardPath from "@/components/dashboard/dashboard-path";
import DashboardTable from "@/components/dashboard/dashboard-table";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import { DashboardSVG, ReportSVG } from "@/common/svgs";
import { PlateNumberType, Role } from "@/common/enum";
import { useSelector } from "react-redux";
import { selectPlateNumberRequestTableData } from "@/store/plate-number-orders/plate-number-order-selector";
import { RootState } from "@/store/store";

const stockReportHeaders = [
  { title: "S/N", key: "sid" },
  { title: "MLA", key: "created_by" },
  { title: "Assigned Plates", key: "plate_number_type" },
  { title: "Sold Plates", key: "number_assigned" },
  { title: "Stock Level", key: "total_number_requested" },
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
  const mlaUsers = useSelector((state: RootState) => state.user.users);
  const filteredMLAs = mlaUsers
    .filter((user) => user.role === Role.MLA)
    .map((user) => `${user.firstname} ${user.lastname}`);
  const salesAssessmentData = useSelector(selectPlateNumberRequestTableData);
  const totalMLA = salesAssessmentData.length;
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
            items={["Office1", "Office2"]}
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
            items={filteredMLAs}
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
            items={[...Object.values(PlateNumberType)]}
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
      <div className="flex flex-col gap-3 border border-primary-300 rounded-lg">
        <div className={"p-3"}>
          <p className={"text-sm"}>
            Total Number of MLAs:{" "}
            <span className={"font-semibold"}>{totalMLA}</span>
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
