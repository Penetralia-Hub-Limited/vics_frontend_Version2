"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, TaxPayerSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";

import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";

const tableColumns = [
  { key: "id" as const, title: "S/N" },
  { key: "firstname" as const, title: "First Name" },
  { key: "lastname" as const, title: "last Name" },
  { key: "phonenumber" as const, title: "Phone Number" },
  { key: "email" as const, title: "Email" },
  { key: "date" as const, title: "Date" },
];

const tableData = [
  {
    id: 1,
    firstname: "Ikedichuks",
    lastname: "Bernard",
    phonenumber: "0902222222",
    email: "example@example.com",
    date: new Date(),
  },
  {
    id: 2,
    firstname: "Ikedichuks",
    lastname: "Bernard",
    phonenumber: "0902222222",
    email: "example@example.com",
    date: new Date(),
  },
  {
    id: 3,
    firstname: "Ikedichuks",
    lastname: "Bernard",
    phonenumber: "0902222222",
    email: "example@example.com",
    date: new Date(),
  },
];

export default function Page() {
  const router = useRouter();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  interface TableRow {
    id: number;
    firstname: string;
    lastname: string;
    phonenumber: string;
    email: string;
    date: Date;
  }

  interface RowAction {
    title: string;
    action: () => void;
  }

  const getRowActions = (row: unknown): RowAction[] => {
    const tableRow = row as TableRow;
    return [
      {
        title: "Preview",
        action: () =>
          router.push("/super-admin/tax-payer/tax-payer-information"),
      },
      {
        title: "Edit",
        action: () => console.log("Viewing details for:", tableRow),
      },
    ];
  };

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
              link: "/store-manager-admin/dashboard",
            },
            {
              label: "Tax Payer Dashboard",
              Icon: TaxPayerSVG,
              link: "/store-manager-admin/tax-payer",
            },
          ]}
        />

        <Button>Create New Tax Payer</Button>
      </div>

      <CardContainer className={"flex flex-col gap-5"}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <InputWithLabel
            items={{
              id: "firstname",
              label: "First Name",
              placeholder: "First Name",
              type: "text",
              htmlfor: "firstname",
            }}
          />
          <InputWithLabel
            items={{
              id: "lastname",
              label: "Last Name",
              placeholder: "Last Name",
              type: "text",
              htmlfor: "lastname",
            }}
          />
          <InputWithLabel
            items={{
              id: "email",
              label: "email",
              placeholder: "example@gmail.com",
              type: "email",
              htmlfor: "email",
            }}
          />
        </div>

        <div className={"grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end"}>
          <InputWithLabel
            items={{
              id: "phonenumber",
              label: "Phone Number",
              placeholder: "phone number",
              type: "text",
              htmlfor: "phonenumber",
            }}
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
        className={"flex flex-col gap-3 border-1 border-primary-300 rounded-lg"}
      >
        <div
          className={"border-t-1 border-primary-300 rounded-lg overflow-hidden"}
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
