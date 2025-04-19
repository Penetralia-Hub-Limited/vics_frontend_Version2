"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, PaymentSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import { ApprovalStatus } from "@/common/enum";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { useSelector } from "react-redux";
import { selectVehicles } from "@/store/vehicle/vehicle-selector";

const tableColumns = [
  { key: "sid", title: "S/N" },
  { key: "owner_name", title: "Name" },
  { key: "platenumber", title: "Plate Number" },
  { key: "phone", title: "Phone Number" },
  { key: "vio_approval", title: "Approval Status" },
  { key: "chasis_number", title: "Chasis Number" },
  { key: "engine_number", title: "Engine Number" },
  { key: "make", title: "Vehicle Make" },
  { key: "model", title: "Model" },
  { key: "amount", title: "Amount" },
  { key: "category", title: "Category" },
  { key: "payment_ref", title: "Payment Reference" },
  { key: "created_by", title: "MLA" },
  { key: "created_at", title: "Date Created" },
];

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [inputValues, setInputValues] = useState<{
    approvalStatus: string;
    name: string;
    phoneNumber: string;
    plateNumber: string;
  }>({
    approvalStatus: "",
    name: "",
    phoneNumber: "",
    plateNumber: "",
  });
  const vehiclesData = useSelector(selectVehicles);

  const totalPages = Math.ceil(vehiclesData.length / itemsPerPage);
  const paginatedData = vehiclesData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            label: "VIO Approval",
            Icon: PaymentSVG,
            link: "/super-admin/payment/vio-approval",
          },
        ]}
      />

      <CardContainer className={"flex flex-col gap-5"}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <DashboardCompSelect
            title={"Approval Status"}
            placeholder={"-- Select Status --"}
            items={[...Object.values(ApprovalStatus)]}
            selected={inputValues.approvalStatus}
            onSelect={(selected) =>
              setInputValues((prev) => ({
                ...prev,
                approvalStatus: selected ? String(selected) : "",
              }))
            }
          />

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
              id: "phoneNumber",
              label: "Phone Number",
              placeholder: "Phone Number",
              type: "text",
              htmlfor: "phoneNumber",
            }}
            value={inputValues.phoneNumber}
            onChange={(e) =>
              setInputValues((prev) => ({
                ...prev,
                phoneNumber: e.target.value,
              }))
            }
          />
        </div>

        <div className={"grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end"}>
          <InputWithLabel
            items={{
              id: "plateNumber",
              label: "Plate Number",
              placeholder: "Plate number",
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

          <DatePicker date={fromDate} setDate={setFromDate} title={"From"} />
          <DatePicker date={toDate} setDate={setToDate} title={"To"} />

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
