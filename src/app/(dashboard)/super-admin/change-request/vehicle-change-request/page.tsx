"use client";

import _ from "lodash";
import { useState, useEffect } from "react";
import { isWithinInterval } from "date-fns";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, PenSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { useSelector } from "react-redux";
import { selectVehicles } from "@/store/vehicle/vehicle-selector";

const tableColumns = [
  { key: "sid", title: "S/N" },
  { key: "owner_name", title: "Name" },
  { key: "platenumber", title: "Plate Number" },
  { key: "category", title: "Category" },
  { key: "chasis_number", title: "Chasis Number" },
  { key: "engine_number", title: "Engine Number" },
  { key: "type", title: "Plate Type" },
  { key: "make", title: "Vehicle Make" },
  { key: "model", title: "Model" },
  { key: "year", title: "Year" },
  { key: "vio_approval", title: "Approval Status" },
];

type inputValuesProp = {
  platenumber: string;
  from: Date | undefined;
  to: Date | undefined;
};

const inputInitialValues = {
  platenumber: "",
  from: undefined,
  to: undefined,
};

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputValues, setInputValues] =
    useState<inputValuesProp>(inputInitialValues);
  const vehicleData = useSelector(selectVehicles);
  const [vehiclesInfo, setVehicleInfo] = useState(vehicleData);
  const { platenumber, from, to } = inputValues;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (_.isEmpty(_.trim(platenumber)) && _.isEmpty(from) && _.isEmpty(to)) {
      setVehicleInfo(vehicleData);
      return;
    }

    const filteredData = _.filter(vehicleData, (vehicle) => {
      let matches = false;

      if (!_.isEmpty(_.trim(platenumber))) {
        matches =
          matches ||
          _.toLower(vehicle?.platenumber || "") === _.toLower(platenumber);
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
    setVehicleInfo(filteredData);
  };

  useEffect(() => {
    if (_.isEmpty(_.trim(platenumber)) && _.isEmpty(from) && _.isEmpty(to)) {
      setVehicleInfo(vehicleData);
    }
  }, [vehicleData, platenumber, from, to]);

  const totalPages = Math.ceil(vehiclesInfo.length / itemsPerPage);
  const paginatedData = vehiclesInfo.slice(
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
            label: "Vehicle Change Requests",
            Icon: PenSVG,
            link: "/super-admin/change-request/vehicle-change-request",
          },
        ]}
      />

      <CardContainer>
        <form onSubmit={handleSearch} className={"flex flex-col gap-5"}>
          <div
            className={"grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end"}
          >
            <InputWithLabel
              items={{
                id: "platenumber",
                label: "Plate Number",
                placeholder: "Plate Number",
                type: "text",
                htmlfor: "platenumber",
              }}
              value={inputValues.platenumber}
              onChange={handleInputChange}
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

            <Button type={"submit"}>Search</Button>
          </div>
        </form>
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
