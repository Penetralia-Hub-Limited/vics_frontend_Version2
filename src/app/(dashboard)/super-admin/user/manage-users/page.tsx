"use client";

import _ from "lodash";
import { useState, useEffect } from "react";
import { isWithinInterval } from "date-fns";
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
  RowAction,
} from "@/components/dashboard/dashboard-table-w-button";
import { Role, UserStatus } from "@/common/enum";
import Pagination from "@/components/general/pagination";
import Modal from "@/components/general/modal";
import { ResponseModalX } from "@/components/general/response-modalx";
import {
  AddUserModalProp,
  AddNewUserInfo,
  AddUserModalInitialState,
} from "@/components/dashboard/user/add-new-user-modal-info";
import { useSelector, useDispatch } from "react-redux";
import { selectUsers } from "@/store/user/user-selector";
import { UserService } from "@/services/UserService";
import { toast } from "sonner";
import { selectStateIDFromStateName } from "@/store/states/state-selector";

const manageUserHeader = [
  { key: "sid", title: "S/N" },
  { key: "name", title: "Name" },
  { key: "phone", title: "Phone Number" },
  { key: "email", title: "Email Address" },
  { key: "role", title: "Role" },
  { key: "status", title: "Status" },
  { key: "created_at", title: "Date Created" },
];

type inputValuesProp = {
  name: string;
  email: string;
  status: string;
  role: string;
  from: Date | undefined;
  to: Date | undefined;
};

const inputInitialValues = {
  name: "",
  email: "",
  status: "",
  role: "",
  from: undefined,
  to: undefined,
};

export default function Page() {
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const userService = new UserService(dispatch);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputValues, setInputValues] =
    useState<inputValuesProp>(inputInitialValues);
  const [modalInput, setModalInput] = useState<AddUserModalProp>(
    AddUserModalInitialState
  );
  const state_id = useSelector((state) =>
    selectStateIDFromStateName(state, modalInput?.state)
  );
  const userData = useSelector(selectUsers);
  const [users, setUsers] = useState(userData);

  const { name, email, status, role, from, to } = inputValues;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      _.isEmpty(_.trim(name)) &&
      _.isEmpty(_.trim(email)) &&
      _.isEmpty(_.trim(status)) &&
      _.isEmpty(role) &&
      _.isEmpty(from) &&
      _.isEmpty(to)
    ) {
      setUsers(userData);
      return;
    }

    const filteredData = _.filter(userData, (user) => {
      let matches = false;

      if (!_.isEmpty(_.trim(name))) {
        matches = matches || _.toLower(user?.name || "") === _.toLower(name);
      }
      if (!_.isEmpty(_.trim(email))) {
        matches = matches || _.toLower(user?.email || "") === _.toLower(email);
      }
      if (!_.isEmpty(_.trim(status))) {
        matches =
          matches || _.toLower(user?.status || "") === _.toLower(status);
      }
      if (!_.isEmpty(_.trim(role))) {
        matches = matches || _.toLower(user?.role || "") === _.toLower(role);
      }
      if (from && to) {
        matches =
          matches ||
          isWithinInterval(new Date(user?.created_at), {
            start: new Date(from),
            end: new Date(to),
          });
      }

      return matches;
    });

    setUsers(filteredData);
  };

  useEffect(() => {
    if (
      _.isEmpty(_.trim(name)) &&
      _.isEmpty(_.trim(email)) &&
      _.isEmpty(_.trim(status)) &&
      _.isEmpty(role) &&
      _.isEmpty(from) &&
      _.isEmpty(to)
    ) {
      setUsers(userData);
    }
  }, [userData, inputValues]);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedData = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSubmit = async () => {
    try {
      const res = await userService.createUser({
        state_id: state_id,
        area_id: null,
        creator_id: null,
        lga_id: null,
        office_id: null,
        othername: "Other",
        image: "image-src-url",
        nin: "762356467874",
        password: "Password@1234",
        gender: "male",
        status: UserStatus.ACTIVE,
        approval_status: null,
        registeration_type: "registration",
        state_verification_no: "6t4hsdjf",
        date_of_birth: "2025-03-21 09:59:32",
        is_email_verified: false,
        email_verified_at: "2025-03-21 09:59:32",
        date_deactivated: "2025-03-21 09:59:32",
        ...modalInput,
      });

      console.log("Creating user ", res);
      if (res.status) {
        setOpenModal(true);
      }
    } catch (error) {
      console.error("Failed:", error);
      toast(error as unknown as string);
    }
  };

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
          title={"Create A New User"}
          content={
            <AddNewUserInfo input={modalInput} setInput={setModalInput} />
          }
          btnText={"Add New User"}
          footerBtn={
            <Button onClick={handleSubmit} type="submit">
              Submit
            </Button>
          }
        />
      </div>

      <CardContainer className={"flex flex-col gap-5"}>
        <form action="#" onSubmit={handleSearch}>
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
              items={[...Object.values(UserStatus)]}
              selected={inputValues.status}
              onSelect={(selected) =>
                setInputValues((prev) => ({
                  ...prev,
                  status: (selected as UserStatus) ?? "",
                }))
              }
            />
          </div>

          <div
            className={"grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end"}
          >
            <DashboardCompSelect
              title={"Role"}
              placeholder={"-- Select Role --"}
              items={[...Object.values(Role)]}
              selected={inputValues.role}
              onSelect={(selected) =>
                setInputValues((prev) => ({
                  ...prev,
                  role: (selected as Role) ?? "",
                }))
              }
            />

            <DatePicker
              title={"From"}
              date={inputValues.from}
              setDate={(date) =>
                setInputValues((prev) => ({
                  ...prev,
                  from: date as Date | undefined,
                }))
              }
            />

            <DatePicker
              title={"To"}
              date={inputValues.to}
              setDate={(date) =>
                setInputValues((prev) => ({
                  ...prev,
                  to: date as Date | undefined,
                }))
              }
            />

            <Button type="submit">Search</Button>
          </div>
        </form>
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

      <ResponseModalX
        title={"User Created Successfully"}
        open={openModal}
        onClose={() => setOpenModal(false)}
        content={<>You have successfully created a new user</>}
        status={"success"}
        footerBtnText={"Done"}
        footerTrigger={() => setOpenModal(false)}
      />
    </main>
  );
}
