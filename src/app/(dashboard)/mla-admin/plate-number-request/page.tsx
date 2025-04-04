"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, VICSSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";
import { InsuranceStatus, RequestStatus } from "@/common/enum";

const tableColumns = [
  { key: "id", title: "S/N" },
  { key: "trackingid", title: "Tracking ID" },
  { key: "platenumbertype", title: "Plate Number Type" },
  { key: "platerequested", title: "No. of Plate Requested" },
  { key: "platerecommended", title: "No. of Plate Recommended" },
  { key: "numberassigned", title: "No. Assigned" },
  { key: "date", title: "Date" },
  { key: "recommendingofficer", title: "Recommending Officer" },
  { key: "firstapprovalofficer", title: "First Approval Officer" },
  { key: "requeststatus", title: "Request Status Officer" },
  { key: "insurancestatus", title: "Insurance Status" },
];

const tableData = [
  {
    id: 1,
    trackingid: "JK",
    platenumbertype: "Private (Direct)",
    platerequested: "Akanbi S.",
    platerecommended: 401,
    numberassigned: 0,
    date: new Date(),
    recommendingofficer: "Dave E ",
    requeststatus: RequestStatus.PENDING,
    insurancestatus: InsuranceStatus.APPROVED,
  },
  {
    id: 2,
    trackingid: "JK",
    platenumbertype: "Private (Direct)",
    platerequested: "Akanbi S.",
    platerecommended: 401,
    numberassigned: 0,
    date: new Date(),
    recommendingofficer: "Dave E ",
    requeststatus: RequestStatus.PENDING,
    insurancestatus: InsuranceStatus.APPROVED,
  },
  {
    id: 3,
    trackingid: "JK",
    platenumbertype: "Private (Direct)",
    platerequested: "Akanbi S.",
    platerecommended: 401,
    numberassigned: 0,
    date: new Date(),
    recommendingofficer: "Dave E ",
    requeststatus: RequestStatus.PENDING,
    insurancestatus: InsuranceStatus.APPROVED,
  },
];

export default function Page() {
  const router = useRouter();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [inputValues, setInputValues] = useState<{
    trackingid: string;
    insuranceStatus: string;
    plateNumberType: string;
    requestStatus: string;
  }>({
    trackingid: "",
    insuranceStatus: "",
    plateNumberType: "",
    requestStatus: "",
  });

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // type TableData = {
  //   id: number;
  //   trackingid: string;
  //   platenumbertype: string;
  //   platerequested: string;
  //   platerecommended: string;
  //   numberassigned: string;
  //   date: Date;
  //   recommendingofficer: string;
  //   requeststatus: RequestStatus;
  //   insurancestatus: InsuranceStatus;
  // };

  interface RowAction {
    title: string;
    action: () => void;
  }

  const getRowActions = (row: unknown): RowAction[] => {
    console.log(row);
    return [
      {
        title: "View",
        action: () =>
          router.push("/super-admin/tax-payer/tax-payer-information"),
      },
    ];
  };

  // console.log(inputValues);

  return (
    <main className={"flex flex-col gap-8 md:gap-12 overflow-hidden"}>
      <div
        className={
          "flex flex-col gap-5 md:flex-row justify-between items-center"
        }
      >
        <DashboardPath
          pathdata={[
            {
              label: "Dashboard",
              Icon: DashboardSVG,
              link: "/mla-admin/dashboard",
            },
            {
              label: "Plate Number Request",
              Icon: VICSSVG,
              link: "/mla-admin/plate-number-request",
            },
          ]}
        />

        <Button>Create New Request</Button>
      </div>

      <CardContainer className={"flex flex-col gap-5"}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <InputWithLabel
            items={{
              id: "trackingid",
              label: "Tracking ID",
              placeholder: "Tracking ID",
              type: "text",
              htmlfor: "trackingid",
            }}
            value={inputValues.trackingid}
            onChange={(e) =>
              setInputValues((prev) => ({
                ...prev,
                trackingid: e.target.value,
              }))
            }
          />

          <DashboardCompSelect
            title={"Plate Number Type"}
            placeholder={"-- Select Type --"}
            items={["private", "commercial"]}
            selected={inputValues.plateNumberType}
            onSelect={(selected) =>
              setInputValues((prev) => ({
                ...prev,
                plateNumberType: selected ? String(selected) : "",
              }))
            }
          />

          <DashboardCompSelect
            title={"Insurance Status"}
            placeholder={"-- Select status --"}
            items={["lagos", "abuja"]}
            selected={inputValues.insuranceStatus}
            onSelect={(selected) =>
              setInputValues((prev) => ({
                ...prev,
                insuranceStatus: selected ? String(selected) : "",
              }))
            }
          />
        </div>

        <div className={"grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end"}>
          <DashboardCompSelect
            title={"Request Status"}
            placeholder={"-- Select status --"}
            items={["lagos", "abuja"]}
            selected={inputValues.requestStatus}
            onSelect={(selected) =>
              setInputValues((prev) => ({
                ...prev,
                requestStatus: selected ? String(selected) : "",
              }))
            }
          />

          <DatePicker
            date={startDate}
            setDate={setStartDate}
            title={"Start Date"}
          />
          <DatePicker date={endDate} setDate={setEndDate} title={"End Date"} />

          <Button>Search</Button>
        </div>
      </CardContainer>

      <div
        className={"flex flex-col gap-3 border-1 border-neutral-300 rounded-lg"}
      >
        <div
          className={"border-t-1 border-neutral-300 rounded-lg overflow-hidden"}
        >
          <DataTableWButton
            headers={tableColumns}
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
