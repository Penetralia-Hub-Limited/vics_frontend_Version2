"use client";

import { useState } from "react";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, UsersSVG } from "@/common/svgs";
import { Button } from "@/components/ui/button";
import CardContainer from "@/components/general/card-container";
import InputWithLabel from "@/components/auth/input-comp";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";
import { Role, UserStatus } from "@/common/enum";
import Pagination from "@/components/general/pagination";
import Modal from "@/components/general/modal";

export const manageUserHeader = [
  { key: "id", title: "S/N" },
  { key: "name", title: "Name" },
  { key: "phonenumber", title: "Phone Number" },
  { key: "email", title: "Email Address" },
  { key: "role", title: "Role" },
  { key: "status", title: "Status" },
  { key: "date", title: "Date Created" },
];

export const manageUserData = [
  {
    id: 1,
    name: "Lola K",
    phonenumber: "Private (Direct)",
    email: "user@example@example.com",
    role: Role.STOREADMIN,
    status: UserStatus.ACTIVE,
    date: new Date(),
  },
  {
    id: 2,
    name: "Lola K",
    phonenumber: "Private (Direct)",
    email: "user@example@example.com",
    role: Role.STOREADMIN,
    status: UserStatus.ACTIVE,
    date: new Date(),
  },
  {
    id: 3,
    name: "Lola K",
    phonenumber: "Private (Direct)",
    email: "user@example@example.com",
    role: Role.STOREADMIN,
    status: UserStatus.ACTIVE,
    date: new Date(),
  },
  {
    id: 4,
    name: "Lola K",
    phonenumber: "Private (Direct)",
    email: "user@example@example.com",
    role: Role.STOREADMIN,
    status: UserStatus.ACTIVE,
    date: new Date(),
  },
  {
    id: 5,
    name: "Lola K",
    phonenumber: "Private (Direct)",
    email: "user@example@example.com",
    role: Role.SMR,
    status: UserStatus.DEACTIVATED,
    date: new Date(),
  },
  {
    id: 6,
    name: "Lola K",
    phonenumber: "Private (Direct)",
    email: "user@example@example.com",
    role: Role.STOREADMIN,
    status: UserStatus.DEACTIVATED,
    date: new Date(),
  },
];

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [inputValues, setInputValues] = useState<{
    name: string;
    email: string;
    status: string;
    role: string;
  }>({
    name: "",
    email: "",
    status: "",
    role: "",
  });

  const totalPages = Math.ceil(manageUserData.length / itemsPerPage);
  const paginatedData = manageUserData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  type TableData = {
    id: number;
    platenumber: string;
    platetype: string;
    mla: string;
    platenostatus: string;
    date: Date;
  };

  interface RowAction {
    title: string;
    action: () => void;
  }

  const getRowActions = (row: unknown): RowAction[] => {
    const tableRow = row as TableData;
    return [
      {
        title: "Edit Role",
        action: () => {},
      },
      {
        title: "Deactivate User",
        action: () => console.log("Viewing details for:", tableRow),
      },
    ];
  };

  console.log(inputValues);

  return (
    <main className={"flex flex-col gap-8 md:gap-12"}>
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
              label: "User Management",
              Icon: UsersSVG,
              link: "/super-admin/user/manage-users",
            },
          ]}
        />

        <Modal
          title={"Create A New Workflow Stage"}
          content={undefined}
          buttonText={"Add New User"}
        />
      </div>

      <CardContainer className={"flex flex-col gap-5"}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <InputWithLabel
            items={{
              id: "name",
              label: "Name",
              placeholder: "Name",
              type: "text",
              htmlfor: "name",
            }}
            value={inputValues.name}
            onChange={(e) =>
              setInputValues((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
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
            onChange={(e) =>
              setInputValues((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />

          <DashboardCompSelect
            title={"Status"}
            placeholder={"-- Select Status --"}
            items={[UserStatus.ACTIVE, UserStatus.DEACTIVATED]}
            selected={inputValues.status}
            onSelect={(selected) =>
              setInputValues((prev) => ({
                ...prev,
                status: selected ? String(selected) : "",
              }))
            }
          />
        </div>

        <div className={"grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end"}>
          <DashboardCompSelect
            title={"Role"}
            placeholder={"-- Select Role --"}
            items={[
              Role.Chairman,
              Role.MLA,
              Role.SMR,
              Role.STOREADMIN,
              Role.SUPERADMIN,
            ]}
            selected={inputValues.role}
            onSelect={(selected) =>
              setInputValues((prev) => ({
                ...prev,
                status: selected ? String(selected) : "",
              }))
            }
          />

          <DatePicker date={fromDate} setDate={setFromDate} title={"From"} />

          <DatePicker date={toDate} setDate={setToDate} title={"To"} />

          <Button>Search</Button>
        </div>
      </CardContainer>

      <div className="flex flex-col gap-3 border border-neutral-300 rounded-lg overflow-hidden">
        <DataTableWButton
          headers={manageUserHeader}
          data={paginatedData}
          rowActions={getRowActions}
        />

        <div className="p-5 ml-auto">
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </main>
  );
}
