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
import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";
import {
  RecommendPlateNoRequest,
  RecommendPlateNoRequestProp,
  RecommendPlateNoRequestInitialValues,
} from "@/components/dashboard/verification-forms/recommend-and-update";
import { ApprovalStatus, RequestStatus } from "@/common/enum";
import { getRowActions } from "@/common/helpers";
import { ModalX } from "@/components/general/modalX";

const tableColumns = [
  { key: "id", title: "S/N" },
  { key: "trackingid", title: "Tracking ID" },
  { key: "platenumbertype", title: "Plate Number Type" },
  { key: "platerequested", title: "No. of Plate Requested" },
  { key: "platerecommended", title: "No. of Plate Recommended" },
  { key: "numberassigned", title: "No. Assigned" },
  { key: "date", title: "Date" },
  { key: "recommendingofficer", title: "Recommending Officer" },
  { key: "finalApprovingOfficer", title: "Final Approving Officer" },
  { key: "requeststatus", title: "Request Status" },
  { key: "insuranceStatus", title: "Insurance Status" },
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
    finalApprovingOfficer: "Dave E ",
    requeststatus: RequestStatus.PENDING,
    insuranceStatus: ApprovalStatus.NOTAPPROVED,
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
    finalApprovingOfficer: "Dave E ",
    requeststatus: RequestStatus.PENDING,
    insuranceStatus: ApprovalStatus.NOTAPPROVED,
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
    finalApprovingOfficer: "Dave E ",
    requeststatus: RequestStatus.PENDING,
    insuranceStatus: ApprovalStatus.APPROVED,
  },
];

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [openModal, setOpenModal] = useState<boolean>(false);
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
  const [modalInput, setModalIinput] = useState<RecommendPlateNoRequestProp>(
    RecommendPlateNoRequestInitialValues
  );

  console.log(modalInput);

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const rowActions = [
    {
      title: "Approve",
      action: () => {},
    },
    {
      title: "Recommend & Approve",
      action: () => setOpenModal(true),
    },
    {
      title: "Disapprove",
      action: () => console.log("Disapprove"),
    },
  ];

  return (
    <main className={"flex flex-col gap-8 md:gap-12 overflow-hidden"}>
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
            rowActions={(row) => getRowActions(row, rowActions)}
          />
        </div>
        <div className={"p-5 ml-auto"}>
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>

      {openModal && (
        <ModalX
          open={openModal}
          onClose={() => setOpenModal(false)}
          content={
            <RecommendPlateNoRequest
              input={modalInput}
              setInput={setModalIinput}
            />
          }
          title={"Recommend and Update Plate Number Request"}
          footerBtn={
            <Button className="w-fit m-auto">Recommend and Update</Button>
          }
        />
      )}
    </main>
  );
}
