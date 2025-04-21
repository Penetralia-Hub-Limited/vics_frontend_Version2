"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, PenSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { useSelector } from "react-redux";
import { selectTaxPayers } from "@/store/user/user-selector";

const tableColumns = [
  { key: "sid", title: "S/N" },
  { key: "fullname", title: "Name" },
  { key: "email", title: "Email Address" },
  { key: "phone", title: "Phone Number" },
  { key: "approval_status", title: "Approval Status" },
  { key: "date_created", title: "Date Created" },
];

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [inputValues, setInputValues] = useState<{
    name: string;
    email: string;
    phoneNumber: string;
  }>({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const tasPayers = useSelector(selectTaxPayers);

  const totalPages = Math.ceil(tasPayers.length / itemsPerPage);
  const paginatedData = tasPayers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <main className={"flex flex-col gap-8 md:gap-12 overflow-hidden"}>
      <DashboardPath
        pathdata={[
          {
            label: "Dashboard",
            Icon: DashboardSVG,
            link: "/super-admin/dashboard",
          },
          {
            label: "Tax Payer Requests",
            Icon: PenSVG,
            link: "/super-admin/change-request/vehicle-change-request",
          },
        ]}
      />

      <CardContainer className={"flex flex-col gap-5"}>
        <div className={"grid grid-cols-1 md:grid-cols-3 gap-4 items-end"}>
          <InputWithLabel
            items={{
              id: "name",
              label: "Name",
              placeholder: "Name",
              type: "text",
              htmlfor: "name",
            }}
            value={inputValues.name}
            onChange={handleInputChange}
          />

          <InputWithLabel
            items={{
              id: "email",
              label: "Email Address",
              placeholder: "Email Address",
              type: "text",
              htmlfor: "email",
            }}
            value={inputValues.email}
            onChange={handleInputChange}
          />

          <InputWithLabel
            items={{
              id: "phoneNumber",
              label: "Phone Number",
              placeholder: "Phone Number",
              type: "text",
              htmlfor: "phoneNumber",
            }}
            value={inputValues.phoneNumber}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr] gap-4 mt-4 items-end">
          <DatePicker
            date={startDate}
            setDate={setStartDate}
            title="Start Date"
          />
          <DatePicker date={endDate} setDate={setEndDate} title="End Date" />
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
