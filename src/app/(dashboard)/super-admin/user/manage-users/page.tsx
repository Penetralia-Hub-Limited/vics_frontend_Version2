"use client";

import { useState } from "react";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, UsersSVG } from "@/common/svgs";
import { Button } from "@/components/ui/button";
import CardContainer from "@/components/general/card-container";
import InputWithLabel from "@/components/auth/input-comp";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import {
  DataTableWButton,
  TableData,
} from "@/components/dashboard/dashboard-table-w-button";
import { Role, UserStatus } from "@/common/enum";
import Pagination from "@/components/general/pagination";
import Modal from "@/components/general/modal";
import {
  AddUserModalProp,
  AddNewUserInfo,
  AddUserModalInitialState,
} from "@/components/dashboard/user/add-new-user-modal-info";
import { useSelector } from "react-redux";
import { selectUsers } from "@/store/user/user-selector";

const manageUserHeader = [
  { key: "sid", title: "S/N" },
  { key: "name", title: "Name" },
  { key: "phone", title: "Phone Number" },
  { key: "email", title: "Email Address" },
  { key: "role", title: "Role" },
  { key: "status", title: "Status" },
  { key: "created_at", title: "Date Created" },
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
  const [modalInput, setModalInput] = useState<AddUserModalProp>(
    AddUserModalInitialState
  );
  const userData = useSelector(selectUsers);

  console.log(userData);

  const totalPages = Math.ceil(userData.length / itemsPerPage);
  const paginatedData = userData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          content={
            <AddNewUserInfo input={modalInput} setInput={setModalInput} />
          }
          btnText={"Add New User"}
          footerBtn={<Button type="submit">Submit</Button>}
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

      <div className="flex flex-col gap-3 border border-primary-300 rounded-lg overflow-hidden">
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
