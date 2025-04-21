"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, SalesSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import { PaymentStatus } from "@/common/enum";
import Modal from "@/components/general/modal";
import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";
import { RowAction } from "@/components/dashboard/dashboard-table-w-button";
import { VerifyPhoneNumber } from "@/components/dashboard/verification-forms/verify-phone-number";
import { selectValidatePhoneNumber } from "@/store/plateNumber/plate-number-selector";
import { useSelector } from "react-redux";
import { ResponseModalX } from "@/components/general/response-modalx";
import { selectPlateNumber } from "@/store/plateNumber/plate-number-selector";

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
  { key: "number", title: "Plate Number" },
  { key: "type", title: "Plates Type" },
  { key: "amount", title: "Amount" },
  { key: "buyer", title: "Buyer" },
  { key: "created_at", title: "Date Sold" },
  { key: "number_status", title: "Payment Status" },
];

export default function Page() {
  const router = useRouter();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState<{
    plateNumber: string;
    paymentStatus: string;
    invoiceNumber: string;
  }>({
    plateNumber: "",
    paymentStatus: "",
    invoiceNumber: "",
  });
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const salesData = useSelector(selectPlateNumber);

  const totalPages = Math.ceil(salesData.length / itemsPerPage);
  const paginatedData = salesData.slice(
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

  const doesPhoneExist = useSelector((plateNumber) =>
    selectValidatePhoneNumber(plateNumber, phoneNumber)
  );

  const handleSubmit = () => {
    if (doesPhoneExist !== null) {
      setOpenModal(true);
    }
  };

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
              link: "/mla-admin/dasboard",
            },
            {
              label: "Sales Dashboard",
              Icon: SalesSVG,
              link: "/mla-admin/sales/dashboard",
            },
          ]}
        />

        <Modal
          title={"New Plate Sales"}
          content={
            <VerifyPhoneNumber
              label="Validate Vehicle Owner Phone Number"
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
          }
          btnText={"New Sales"}
          footerBtn={
            <Button onClick={handleSubmit} type="submit">
              Submit
            </Button>
          }
        />
      </div>

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
            title={"Payment Status"}
            placeholder={"-- Select Status --"}
            items={["private", "commercial"]}
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

      <ResponseModalX
        title={"Phone Number Verified Successfully"}
        open={openModal}
        onClose={() => setOpenModal(false)}
        content={
          <div className="flex flex-col gap-4 py-5">
            <div className={"grid grid-cols-[1fr_2fr]"}>
              <p className={"text-sm"}>Name:</p>
              <p className={"text-sm font-semibold justify-self-end"}>
                {doesPhoneExist?.owner?.firstname}{" "}
                {doesPhoneExist?.owner?.lastname}
              </p>
            </div>
            <div className={"grid grid-cols-[1fr_2fr]"}>
              <p className={"text-sm"}>Phone Number: </p>
              <p className={"text-sm font-semibold justify-self-end"}>
                {doesPhoneExist?.owner?.phone}
              </p>
            </div>
            <div className={"grid grid-cols-[1fr_2fr]"}>
              <p className={"text-sm"}>Address:</p>
              <p className={"text-sm font-semibold justify-self-end ml-auto"}>
                {doesPhoneExist?.owner?.address}
              </p>
            </div>
          </div>
        }
        status={"success"}
        footerBtnText={"Continue"}
        footerTrigger={() => router.push("/mla-admin/sales/new-sales")}
      />
    </main>
  );
}
