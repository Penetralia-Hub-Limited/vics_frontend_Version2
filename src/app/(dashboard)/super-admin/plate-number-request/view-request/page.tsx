"use client";

import { useState } from "react";
import InputWithLabel from "@/components/auth/input-comp";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DashboardTable from "@/components/dashboard/dashboard-table";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, VICSSVG } from "@/common/svgs";
import { PlateNumberType, PlateNumberStatus } from "@/common/enum";
import { useSelector } from "react-redux";
import { selectSoldPlateNumber } from "@/store/plateNumber/plate-number-selector";
import { RootState } from "@/store/store";

const tableColumns = [
  { key: "sid", title: "S/N" },
  { key: "number", title: "Plate Number" },
  { key: "type", title: "Type" },
  { key: "created_at", title: "Date" },
  { key: "status", title: "Status" },
  { key: "assignedto", title: "Assigned To" },
  { key: "soldto", title: "Sold To" },
];

interface InputValuesProp {
  plateNumber: string;
  lga: string;
  plateNumberType: PlateNumberType | undefined;
  status: string | undefined;
  startDate?: Date | undefined;
  endDate?: Date | undefined;
}

const inputInitialValues = {
  plateNumber: "",
  lga: "",
  plateNumberType: undefined as PlateNumberType | undefined,
  status: "",
  startDate: undefined,
  endDate: undefined,
};

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputValues, setInputValues] =
    useState<InputValuesProp>(inputInitialValues);
  const soldPlateNumbers = useSelector(selectSoldPlateNumber);
  const { lgas } = useSelector((state: RootState) => state?.lga);
  const filteredLGA = lgas.map((lga) => lga.name);

  const totalPages = Math.ceil(soldPlateNumbers.length / itemsPerPage);
  const paginatedData = soldPlateNumbers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className={"flex flex-col gap-8 md:gap-12"}>
      <DashboardPath
        pathdata={[
          {
            label: "Dashboard",
            Icon: DashboardSVG,
            link: "/super-admin/dashboard",
          },
          {
            label: "Plate Number Request",
            Icon: VICSSVG,
            link: "/super-admin/plate-number-request",
          },
          {
            label: "View Request",
            Icon: VICSSVG,
            link: "/super-admin/plate-number-request/view-request",
          },
        ]}
      />

      <form action="" onSubmit={(e) => e.preventDefault()}>
        <CardContainer className={"flex flex-col gap-5"}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <InputWithLabel
              items={{
                id: "plateNumber",
                label: "Plate Number",
                placeholder: "Plate Number",
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

            <DashboardCompSelect
              title={"LGA"}
              placeholder={"-- Select LGA --"}
              items={filteredLGA}
              selected={inputValues.lga}
              onSelect={(selected) =>
                setInputValues((prev) => ({
                  ...prev,
                  lga: selected ? String(selected) : "",
                }))
              }
            />

            <DashboardCompSelect
              title={"Plate Number Type"}
              placeholder={"-- Select Type --"}
              items={[...Object.values(PlateNumberType)]}
              selected={inputValues.plateNumberType}
              onSelect={(selected) =>
                setInputValues((prev) => ({
                  ...prev,
                  plateNumberType: selected as PlateNumberType | undefined,
                }))
              }
            />
          </div>

          <div
            className={"grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end"}
          >
            <DashboardCompSelect
              title={"Status"}
              placeholder={"-- Select Status --"}
              items={[...Object.values(PlateNumberStatus)]}
              selected={inputValues.status}
              onSelect={(selected) =>
                setInputValues((prev) => ({
                  ...prev,
                  status: selected as string | undefined,
                }))
              }
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
              title={"End Date"}
              date={inputValues.endDate}
              setDate={(date) =>
                setInputValues((prev) => ({
                  ...prev,
                  endDate: date as Date | undefined,
                }))
              }
            />

            <Button type="submit">Search</Button>
          </div>
        </CardContainer>
      </form>

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
