"use client";

import _ from "lodash";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, PenSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import { PaymentStatus } from "@/common/enum";
import Modal from "@/components/general/modal";
import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";
import { RowAction } from "@/components/dashboard/dashboard-table-w-button";
import { VerifyPlateNumber } from "@/components/dashboard/verification-forms/verify-plate-number";
import { selectVehicles } from "@/store/vehicle/vehicle-selector";
import { selectValidPlateNumber } from "@/store/plateNumber/plate-number-selector";
import { ResponseModalX } from "@/components/general/response-modalx";

interface TableRow {
  id: number;
  platenumber: string;
  platetype: string;
  amount: string;
  platerecommended: number | string;
  createdby: string;
  buyer: string;
  paymentstatus: PaymentStatus;
  date: Date;
}

const tableColumns = [
  { key: "sid", title: "S/N" },
  { key: "platenumber", title: "Plate Number" },
  { key: "type", title: "Plates Type" },
  { key: "amount", title: "Amount" },
  { key: "vio_approval", title: "Approval Status" },
  { key: "owner_name", title: "Buyer" },
  { key: "updated_at", title: "Date Sold" },
  { key: "payment_status", title: "Payment Status" },
];

interface InputValuesProps {
  plateNumber: string;
  paymentStatus: string;
  invoiceNumber: string;
  fromDate: Date | undefined;
  toDate: Date | undefined;
}

const InitialInputValues = {
  plateNumber: "",
  paymentStatus: "",
  invoiceNumber: "",
  fromDate: undefined,
  toDate: undefined,
};

export default function Page() {
  const itemsPerPage = 10;
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [plateNumber, setPlateNumber] = useState<string>("");
  const [inputValues, setInputValues] =
    useState<InputValuesProps>(InitialInputValues);

  const vehicles = useSelector(selectVehicles);
  const isPlateValid = useSelector((state) =>
    selectValidPlateNumber(state, plateNumber)
  );

  const handlePlateValidation = () => {
    if (isPlateValid) {
      setOpenModal(true);
    }
  };

  const totalPages = Math.ceil(vehicles.length / itemsPerPage);
  const paginatedData = vehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRowActions = (row: unknown): RowAction[] => {
    const tableRow = row as TableRow;
    return [
      {
        title: "View Details",
        action: () => console.log("Viewing details for:", tableRow),
      },
      {
        title: "Print Receipt",
        action: () => console.log("Viewing details for:", tableRow),
      },
    ];
  };

  const handleSearch = () => {};

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
              link: "/mla-admin/dashboard",
            },
            {
              label: "Change of Ownership",
              Icon: PenSVG,
              link: "/mla-admin/change-of-ownership",
            },
          ]}
        />

        <Modal
          title={"Request New Change of Ownership"}
          content={
            <VerifyPlateNumber
              plateNumber={plateNumber}
              setPlateNumber={setPlateNumber}
            />
          }
          btnText={"Request new C-of-O"}
          footerBtn={
            <Button onClick={handlePlateValidation} type="submit">
              Validate Plate Number
            </Button>
          }
        />
      </div>

      <CardContainer className={"flex flex-col gap-5"}>
        <form action="" onSubmit={handleSearch}>
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
              title={"Payment Status"}
              placeholder={"-- Select Status --"}
              items={[...Object.values(PaymentStatus)]}
              selected={inputValues.paymentStatus}
              onSelect={(selected) =>
                setInputValues((prev) => ({
                  ...prev,
                  paymentStatus: selected ? String(selected) : "",
                }))
              }
            />

            <InputWithLabel
              items={{
                id: "invoiceNumber",
                label: "Invoice Number",
                placeholder: "Invoice Number",
                type: "text",
                htmlfor: "invoiceNumber",
              }}
              value={inputValues.invoiceNumber}
              onChange={(e) =>
                setInputValues((prev) => ({
                  ...prev,
                  invoiceNumber: e.target.value,
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
              date={inputValues.fromDate}
              setDate={(date) =>
                setInputValues((prev) => ({
                  ...prev,
                  fromDate: date as Date | undefined,
                }))
              }
              title={"From"}
            />

            <DatePicker
              date={inputValues.toDate}
              setDate={(date) =>
                setInputValues((prev) => ({
                  ...prev,
                  toDate: date as Date | undefined,
                }))
              }
              title={"To"}
            />

            <Button type="submit">Search</Button>
          </div>
        </form>
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

      {/* response modal */}
      <ResponseModalX
        title={"Plate Number Validated"}
        open={openModal}
        onClose={() => setOpenModal(false)}
        content={<>You have successfully validated plate number</>}
        status={"success"}
        footerBtnText={"Search"}
        footerTrigger={() =>
          router.push(
            `/mla-admin/change-of-ownership/current-owners-details/${isPlateValid?.id}`
          )
        }
      />
    </main>
  );
}
