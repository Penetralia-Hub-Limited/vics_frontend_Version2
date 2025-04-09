"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DashboardPath from "@/components/dashboard/dashboard-path";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import { DashboardSVG, VICSSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import {
  PlateNumberType,
  InsuranceStatus,
  ApprovalStatus,
} from "@/common/enum";
import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";
import {
  RowAction,
  TableData,
} from "@/components/dashboard/dashboard-table-w-button";

const tableHeaders = [
  { key: "id", title: "S/N" },
  { key: "mla", title: "MLA" },
  { key: "mlaStations", title: "MLA Stations" },
  { key: "trackingid", title: "Tracking ID" },
  { key: "platenumbertype", title: "Plate Number Type" },
  { key: "noPlateRequested", title: "No. of Plate Requested" },
  { key: "noPlateRecommended", title: "No. of Plate Recommended" },
  { key: "noAssigned", title: "No. Assigned" },
  { key: "date", title: "Date Sold" },
  { key: "recommendingOfficer", title: "Recommending Officer" },
  { key: "finalApprovingOfficer", title: "Final Approving Officer" },
  { key: "requestStatus", title: "Request Status" },
  { key: "insuranceStatus", title: "Insurance Status" },
];

const tableData = [
  {
    id: 1,
    mla: "Akanbi S.",
    mlaStations: "FEDDSS",
    trackingid: "HSDGJG3434",
    platenumbertype: "Private (Direct)",
    noPlateRequested: 40,
    noPlateRecommended: 30,
    noAssigned: 30,
    date: new Date(),
    recommendingOfficer: "David E",
    finalApprovingOfficer: "David E",
    requestStatus: ApprovalStatus.APPROVED,
    insuranceStatus: InsuranceStatus.NOTAPPROVED,
  },
  {
    id: 2,
    mla: "Akanbi S.",
    mlaStations: "FEDDSS",
    trackingid: "HSDGJG3434",
    platenumbertype: "Private (Direct)",
    noPlateRequested: 40,
    noPlateRecommended: 30,
    noAssigned: 30,
    date: new Date(),
    recommendingOfficer: "David E",
    finalApprovingOfficer: "David E",
    requestStatus: ApprovalStatus.APPROVED,
    insuranceStatus: InsuranceStatus.NOTAPPROVED,
  },
  {
    id: 3,
    mla: "Akanbi S.",
    mlaStations: "FEDDSS",
    trackingid: "HSDGJG3434",
    platenumbertype: "Private (Direct)",
    noPlateRequested: 40,
    noPlateRecommended: 30,
    noAssigned: 30,
    date: new Date(),
    recommendingOfficer: "David E",
    finalApprovingOfficer: "David E",
    requestStatus: ApprovalStatus.NOTAPPROVED,
    insuranceStatus: InsuranceStatus.NOTAPPROVED,
  },
];

export default function Page() {
  const router = useRouter();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [inputValues, setInputValues] = useState<{
    plateNumberEndCode: string;
    lga: string;
    plateNumberType: PlateNumberType | undefined;
  }>({
    plateNumberEndCode: "",
    lga: "",
    plateNumberType: undefined,
  });

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRowActions = (row: unknown): RowAction[] => {
    const tableRow = row as TableData;

    return [
      {
        title: "View Details",
        action: () =>
          router.push(
            `/store-manager-admin/plate-number-request/assign-plate-number?${tableRow}`
          ),
      },
    ];
  };

  return (
    <main className={"flex flex-col gap-8 md:gap-12"}>
      <DashboardPath
        pathdata={[
          {
            label: "Dashboard",
            Icon: DashboardSVG,
            link: "/store-manager-admin/dashboard",
          },
          {
            label: "Plate Number Request",
            Icon: VICSSVG,
            link: "/store-manager-admin/plate-number-request",
          },
        ]}
      />

      <CardContainer className={"flex flex-col gap-5"}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <DashboardCompSelect
            title={"LGA"}
            placeholder={"-- Select LGA --"}
            items={["lagos", "abuja"]}
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
              id: "plateNumber",
              label: "Plate Number End Code",
              placeholder: "Plate Number",
              type: "text",
              htmlfor: "plateNumber",
            }}
            value={inputValues.plateNumberEndCode}
            onChange={(e) =>
              setInputValues((prev) => ({
                ...prev,
                plateNumberEndCode: e.target.value,
              }))
            }
          />
        </div>

        <div
          className={
            "grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr] gap-4 mt-4 items-end"
          }
        >
          <DatePicker
            date={startDate}
            setDate={setStartDate}
            title={"Start Date"}
          />
          <DatePicker date={endDate} setDate={setEndDate} title={"End Date"} />

          <Button>Search Store</Button>
        </div>
      </CardContainer>

      <div
        className={"flex flex-col gap-3 border-1 border-neutral-300 rounded-lg"}
      >
        <div
          className={"border-t-1 border-neutral-300 rounded-lg overflow-hidden"}
        >
          <DataTableWButton
            headers={tableHeaders}
            data={paginatedData}
            rowActions={getRowActions}
          />
        </div>
        <div className={"p-5 ml-auto"}>
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </main>
  );
}
