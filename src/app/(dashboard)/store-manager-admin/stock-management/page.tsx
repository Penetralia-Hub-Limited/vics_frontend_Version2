"use client";

import { useState } from "react";
import InputWithLabel from "@/components/auth/input-comp";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import { tableInvoices } from "@/common/constant";
import CardContainer from "@/components/general/card-container";
import DashboardTable from "@/components/dashboard/dashboard-table";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, ManagementSVG } from "@/common/svgs";
import { PlateNumberType } from "@/common/enum";
import Modal from "@/components/general/modal";
import {
  CreateNewStock,
  CreateNewStockProps,
  CreateNewStockPropsInitialValues,
} from "@/components/dashboard/verification-forms/create-new-stock";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const tableHeaders = [
  { title: "S/N", key: "id" },
  { title: "LGA", key: "lga" },
  { title: "Range", key: "range" },
  { title: "End Code", key: "end_code" },
  { title: "Type", key: "type" },
  { title: "Created By", key: "createdby" },
  { title: "Date", key: "Date" },
  { title: "Initial Quantity", key: "initialQty" },
  { title: "Current Quantity", key: "currentQty" },
];

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [modalInput, setModalInput] = useState<CreateNewStockProps>(
    CreateNewStockPropsInitialValues
  );
  const [inputValues, setInputValues] = useState<{
    plateNumberEndCode: string;
    lga: string;
    plateNumberType: PlateNumberType | undefined;
  }>({
    plateNumberEndCode: "",
    lga: "",
    plateNumberType: undefined,
  });
  const { lgas } = useSelector((state: RootState) => state?.lga);
  const filteredLGA = lgas.map((lga) => lga.name);

  const totalPages = Math.ceil(tableInvoices.length / itemsPerPage);
  const paginatedData = tableInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
              link: "/store-manager-admin/dashboard",
            },
            {
              label: "Manage Stock",
              Icon: ManagementSVG,
              link: "/store-manager-admin/stock-management",
            },
          ]}
        />

        <Modal
          title={"Create New Plate Number Request"}
          content={
            <CreateNewStock input={modalInput} setInput={setModalInput} />
          }
          btnText={"Create New Request"}
          footerBtn={<Button type="submit">Submit</Button>}
        />
      </div>

      <CardContainer className={"flex flex-col gap-5"}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
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

          <InputWithLabel
            items={{
              id: "plateNumber",
              label: "Plate Number End Code",
              placeholder: "Plate Number",
              type: "text",
              htmlfor: "plateNumber",
            }}
            value={inputValues.plateNumberEndCode}
            onChange={(e) =>
              setInputValues((prev) => ({
                ...prev,
                plateNumberEndCode: e.target.value,
              }))
            }
          />
        </div>

        <div
          className={
            "grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr] gap-4 mt-4 items-end"
          }
        >
          <DatePicker
            date={startDate}
            setDate={setStartDate}
            title={"Start Date"}
          />
          <DatePicker date={endDate} setDate={setEndDate} title={"End Date"} />

          <Button>Search Store</Button>
        </div>
      </CardContainer>

      <div
        className={"flex flex-col gap-3 border-1 border-primary-300 rounded-lg"}
      >
        <div
          className={"border-t-1 border-primary-300 rounded-lg overflow-hidden"}
        >
          <DashboardTable headers={tableHeaders} data={paginatedData} />
        </div>
        <div className={"p-5 ml-auto"}>
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </main>
  );
}
