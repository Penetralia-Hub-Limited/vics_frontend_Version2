"use client";

import { useState } from "react";
import InputWithLabel from "@/components/auth/input-comp";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import { tableInvoices, tableHeaders } from "@/common/constant";
import CardContainer from "@/components/general/card-container";
import DashboardTable from "@/components/dashboard/dashboard-table";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, VICSSVG } from "@/common/svgs";
import { PlateNumberType, PlateStatus } from "@/common/enum";

const tableColumns = [
  { key: "id", title: "S/N" },
  { key: "platenumber", title: "Plate Number" },
  { key: "platetype", title: "Type" },
  { key: "date", title: "Date" },
  { key: "status", title: "Status" },
  { key: "assignedto", title: "Assigned To" },
  { key: "soldto", title: "Sold To" },
];

const tableData = [
  {
    id: 1,
    platenumber: "GDT8W7367367",
    platetype: "Private (Direct)",
    date: new Date(),
    status: PlateStatus.SOLD,
    assignedto: "Akanbi S.",
    soldto: "Dave E ",
  },
  {
    id: 2,
    platenumber: "GDT8W7367367",
    platetype: "Private (Direct)",
    date: new Date(),
    status: PlateStatus.SOLD,
    assignedto: "Akanbi S.",
    soldto: "Dave E ",
  },
  {
    id: 3,
    platenumber: "GDT8W7367367",
    platetype: "Private (Direct)",
    date: new Date(),
    status: PlateStatus.SOLD,
    assignedto: "Akanbi S.",
    soldto: "Dave E ",
  },
];

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [inputValues, setInputValues] = useState<{
    plateNumber: string;
    lga: string;
    plateNumberType: PlateNumberType | undefined;
    status: string | undefined;
  }>({
    plateNumber: "",
    lga: "",
    plateNumberType: undefined,
    status: "",
  });

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className={"flex flex-col gap-8 md:gap-12"}>
      <DashboardPath
        pathdata={[
          {
            label: "Dashboard",
            Icon: DashboardSVG,
            link: "/super-admin/dashboard",
          },
          {
            label: "Plate Number Request",
            Icon: VICSSVG,
            link: "/super-admin/plate-number-request",
          },
          {
            label: "View Request",
            Icon: VICSSVG,
            link: "/super-admin/plate-number-request/view-request",
          },
        ]}
      />

      <CardContainer className={"flex flex-col gap-5"}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <InputWithLabel
            items={{
              id: "plateNumber",
              label: "Plate Number",
              placeholder: "Plate Number",
              type: "text",
              htmlfor: "plateNumber",
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
        </div>

        <div className={"grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end"}>
          <DashboardCompSelect
            title={"Status"}
            placeholder={"-- Select Status --"}
            items={["status1", "status2"]}
            selected={inputValues.status}
            onSelect={(selected) =>
              setInputValues((prev) => ({
                ...prev,
                status: selected as string | undefined,
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
          <DashboardTable headers={tableColumns} data={paginatedData} />
        </div>
        <div className={"p-5 ml-auto"}>
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </main>
  );
}
