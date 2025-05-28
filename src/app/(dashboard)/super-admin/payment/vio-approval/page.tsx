"use client";

import _ from "lodash";
import { useState, useEffect } from "react";
import { isWithinInterval } from "date-fns";
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

type inputValuesProp = {
  approvalStatus: string;
  name: string;
  phone: string;
  number: string;
  from: Date | undefined;
  to: Date | undefined;
};

const inputInitialValues = {
  approvalStatus: "",
  name: "",
  phone: "",
  number: "",
  from: undefined,
  to: undefined,
};

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputValues, setInputValues] =
    useState<inputValuesProp>(inputInitialValues);
  const vehiclesData = useSelector(selectVehicles);
  const [vehicles, setVehicles] = useState(vehiclesData);
  const { name, approvalStatus, number, from, to } = inputValues;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      _.isEmpty(_.trim(name)) &&
      _.isEmpty(_.trim(approvalStatus)) &&
      _.isEmpty(_.trim(number)) &&
      _.isEmpty(from) &&
      _.isEmpty(to)
    ) {
      setVehicles(vehiclesData);
      return;
    }

    const filteredData = _.filter(vehiclesData, (vehicle) => {
      let matches = false;

      if (!_.isEmpty(_.trim(name))) {
        matches =
          matches || _.toLower(vehicle?.owner_name || "") === _.toLower(name);
      }

      if (!_.isEmpty(_.trim(approvalStatus))) {
        matches =
          matches ||
          _.toLower(vehicle?.vio_approval || "") === _.toLower(approvalStatus);
      }

      if (!_.isEmpty(_.trim(number))) {
        matches =
          matches ||
          _.toLower(vehicle?.platenumber || "") === _.toLower(number);
      }

      if (from && to) {
        matches =
          matches ||
          isWithinInterval(
            new Date(vehicle.created_at ? vehicle?.created_at : ""),
            {
              start: new Date(from),
              end: new Date(to),
            }
          );
      }
      return matches;
    });
    setVehicles(filteredData);
  };

  useEffect(() => {
    if (
      _.isEmpty(_.trim(name)) &&
      _.isEmpty(_.trim(approvalStatus)) &&
      _.isEmpty(_.trim(number)) &&
      _.isEmpty(from) &&
      _.isEmpty(to)
    ) {
      setVehicles(vehiclesData);
    }
  }, [vehiclesData, name, approvalStatus, number, from, to]);

  const totalPages = Math.ceil(vehicles.length / itemsPerPage);
  const paginatedData = vehicles.slice(
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

      <CardContainer>
        <form
          className={"flex flex-col gap-5"}
          action=""
          onSubmit={handleSearch}
        >
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
                id: "phone",
                label: "Phone Number",
                placeholder: "Phone Number",
                type: "text",
                htmlfor: "phone",
              }}
              value={inputValues.phone}
              onChange={(e) =>
                setInputValues((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
            />
          </div>

          <div
            className={"grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end"}
          >
            <InputWithLabel
              items={{
                id: "number",
                label: "Plate Number",
                placeholder: "Plate number",
                type: "text",
                htmlfor: "number",
              }}
              value={inputValues.number}
              onChange={(e) =>
                setInputValues((prev) => ({
                  ...prev,
                  number: e.target.value,
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

      <div
        className={"flex flex-col gap-3 border-1 border-primary-300 rounded-lg"}
      >
        <div
          className={
            "border-t-1 border-primary-300 rounded-lg overflow-hidden scrollbar-width"
          }
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
