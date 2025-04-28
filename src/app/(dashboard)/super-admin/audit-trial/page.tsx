"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, AuditTrialSVG } from "@/common/svgs";
import DashboardTable from "@/components/dashboard/dashboard-table";
import CardContainer from "@/components/general/card-container";
import InputWithLabel from "@/components/auth/input-comp";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const tableColumns = [
  { key: "id", title: "S/N" },
  { key: "actor", title: "Actor" },
  { key: "action", title: "Action" },
  { key: "description", title: "Description" },
  { key: "date", title: "Date" },
];

const tableData = [
  {
    id: 1,
    actor: "System",
    action: "Login",
    description: "Admin Login",
    date: new Date(),
  },
  {
    id: 2,
    actor: "System",
    action: "Log Out",
    description: "Super Admin Logout",
    // date: new Date("2024-10-01"),
  },
  {
    id: 3,
    actor: "System",
    action: "Login",
    description: "Admin Login",
    // date: new Date("2024-15-01"),
  },
];

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [inputValues, setInputValues] = useState<{
    actorsname: string;
    lga: string;
  }>({
    actorsname: "",
    lga: "",
  });
  const { lgas } = useSelector((state: RootState) => state?.lga);
  const filteredLGA = lgas.map((lga) => lga.name);

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
              link: "/super-admin/dashboard",
            },
            {
              label: "Audit Trial",
              Icon: AuditTrialSVG,
              link: "/super-admin/configuration/vehicle-make-model",
            },
          ]}
        />
      </div>

      <CardContainer className={"flex flex-col gap-5"}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <InputWithLabel
            items={{
              id: "actorsname",
              label: "Actor's Name",
              placeholder: "Actor's Name",
              type: "text",
              htmlfor: "actorsname",
            }}
            value={inputValues.actorsname}
            onChange={(e) =>
              setInputValues((prev) => ({
                ...prev,
                actorsname: e.target.value,
              }))
            }
          />

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
        </div>

        <div className={"grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 items-end"}>
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
        className={"flex flex-col gap-3 border-1 border-primary-300 rounded-lg"}
      >
        <div
          className={"border-t-1 border-primary-300 rounded-lg overflow-hidden"}
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
