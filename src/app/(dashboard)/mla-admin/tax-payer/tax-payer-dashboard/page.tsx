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
import { RowAction } from "@/components/dashboard/dashboard-table-w-button";
import { useSelector } from "react-redux";
import { selectTaxPayers } from "@/store/user/user-selector";

const tableColumns = [
  { key: "sid" as const, title: "S/N" },
  { key: "firstname" as const, title: "First Name" },
  { key: "lastname" as const, title: "last Name" },
  { key: "phone" as const, title: "Phone Number" },
  { key: "email" as const, title: "Email" },
  { key: "date_created" as const, title: "Date" },
];

export default function Page() {
  const router = useRouter();
  const itemsPerPage = 10;
  const taxPayers = useSelector(selectTaxPayers);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputValues, setInputValues] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    startDate: undefined,
    endDate: undefined,
  });

  const totalPages = Math.ceil(taxPayers.length / itemsPerPage);
  const paginatedData = taxPayers.slice(
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

  const getRowActions = (row: unknown): RowAction[] => {
    const tableRow = row as TableRow;
    return [
      {
        title: "Preview",
        action: () => router.push("/mla-admin/tax-payer/tax-payer-information"),
      },
      {
        title: "Edit",
        action: () => console.log("Viewing details for:", tableRow),
      },
    ];
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;

    let parsedValue: string | Date | undefined = value;

    if (type === "date") {
      parsedValue = value ? (new Date(value) as Date) : undefined;
    } else {
      parsedValue = value || undefined;
    }

    setInputValues((prev) => ({
      ...prev,
      [id]: parsedValue,
    }));
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
              link: "/mla-manager-admin/dashboard",
            },
            {
              label: "Tax Payer Dashboard",
              Icon: TaxPayerSVG,
              link: "/mla-manager-admin/tax-payer/dashboard",
            },
          ]}
        />

        <Button>Create New Tax Payer</Button>
      </div>

      <CardContainer className={"flex flex-col gap-5"}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <InputWithLabel
            items={{
              id: "firstName",
              label: "First Name",
              placeholder: "First Name",
              type: "text",
              htmlfor: "firstName",
            }}
            value={inputValues.firstName}
            onChange={handleInputChange}
          />
          <InputWithLabel
            items={{
              id: "lastName",
              label: "Last Name",
              placeholder: "Last Name",
              type: "text",
              htmlfor: "lastName",
            }}
            value={inputValues.lastName}
            onChange={handleInputChange}
          />
          <InputWithLabel
            items={{
              id: "email",
              label: "email",
              placeholder: "example@gmail.com",
              type: "email",
              htmlfor: "email",
            }}
            value={inputValues.email}
            onChange={handleInputChange}
          />
        </div>

        <div className={"grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end"}>
          <InputWithLabel
            items={{
              id: "phoneNumber",
              label: "Phone Number",
              placeholder: "phone number",
              type: "text",
              htmlfor: "phoneNumber",
            }}
            value={inputValues.phoneNumber}
            onChange={handleInputChange}
          />

          <DatePicker
            title={"Start Date"}
            date={inputValues.startDate}
            setDate={(date) =>
              setInputValues((prev) => ({
                ...prev,
                startDate: date as Date | undefined,
              }))
            }
          />

          <DatePicker
            date={inputValues.endDate}
            title={"End Date"}
            setDate={(date) =>
              setInputValues((prev) => ({
                ...prev,
                endDate: date as Date | undefined,
              }))
            }
          />

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
