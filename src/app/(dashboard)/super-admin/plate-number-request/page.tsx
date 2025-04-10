"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, VICSSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import DashboardTable from "@/components/dashboard/dashboard-table";
import CreatePlateNumberRequest from "@/components/dashboard/verification-forms/Create-Plate-Request"; 

const tableColumns = [
  { key: "id" as const, title: "S/N" },
  { key: "trackingid" as const, title: "Tracking ID" },
  { key: "platenumbertype" as const, title: "Plate Number Type" },
  { key: "platerequested" as const, title: "No. of Plate Requested" },
  { key: "platerecommended" as const, title: "No. of Plate Recommended" },
  { key: "numberassigned" as const, title: "No. Assigned" },
  { key: "date" as const, title: "Date" },
  { key: "recommendingofficer" as const, title: "Recommending Officer" },
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
  },
];

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false); // ✅ Toggle form visibility
  const [inputValues, setInputValues] = useState({
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

  return (
    <main className="flex flex-col gap-8 md:gap-12 overflow-hidden">
      <div className="flex flex-col gap-5 md:flex-row justify-between items-center">
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
              link: "/super-admin/plate-number-request",
            },
          ]}
        />

        <Button onClick={() => setShowCreateForm(true)}>
          Create New Request
        </Button>
      </div>

      {/* ✅ Show the create form when button is clicked */}
      {showCreateForm && (
        <CardContainer className="mt-4">
          <CreatePlateNumberRequest />
        </CardContainer>
      )}

      {/* ✅ You can optionally hide the rest of the dashboard when the form is open */}
      {!showCreateForm && (
        <>
          <CardContainer className="flex flex-col gap-5">
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

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end">
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
              <DatePicker
                date={endDate}
                setDate={setEndDate}
                title={"End Date"}
              />

              <Button>Search</Button>
            </div>
          </CardContainer>

          <div className="flex flex-col gap-3 border-1 border-neutral-300 rounded-lg">
            <div className="border-t-1 border-neutral-300 rounded-lg overflow-hidden">
              <DashboardTable headers={tableColumns} data={paginatedData} />
            </div>
            <div className="p-5 ml-auto">
              <Pagination
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
