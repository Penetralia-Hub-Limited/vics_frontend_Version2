"use client";

import _ from "lodash";
import { useState, useEffect } from "react";
import { isWithinInterval } from "date-fns";
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
import { selectValidUser } from "@/store/vehicle/vehicle-selector";
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
  { key: "created_by", title: "Created By" },
  { key: "buyer", title: "Buyer" },
  { key: "number_status", title: "Payment Status" },
  { key: "created_at", title: "Transaction Date" },
];

type inputValuesProp = {
  plateNumber: string;
  paymentStatus: string;
  invoiceNumber: string;
  from: Date | undefined;
  to: Date | undefined;
};

const inputInitialValues = {
  plateNumber: "",
  paymentStatus: "",
  invoiceNumber: "",
  from: undefined,
  to: undefined,
};

export default function Page() {
  const router = useRouter();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isNumberVerified, setIsNumberVerified] = useState<boolean>(false);
  const [inputValues, setInputValues] =
    useState<inputValuesProp>(inputInitialValues);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const salesReportData = useSelector(selectPlateNumber);
  const [salesReport, setSalesReport] = useState(salesReportData);

  const { plateNumber, paymentStatus, invoiceNumber, from, to } = inputValues;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      _.isEmpty(_.trim(plateNumber)) &&
      _.isEmpty(_.trim(paymentStatus)) &&
      _.isEmpty(_.trim(invoiceNumber)) &&
      _.isEmpty(from) &&
      _.isEmpty(to)
    ) {
      setSalesReport(salesReportData);
      return;
    }

    const filteredData = _.filter(salesReportData, (salesData) => {
      let matches = false;

      if (!_.isEmpty(_.trim(plateNumber))) {
        matches =
          matches ||
          _.toLower(salesData?.number || "") === _.toLower(plateNumber);
      }

      if (!_.isEmpty(_.trim(paymentStatus))) {
        matches =
          matches ||
          _.toLower(salesData?.number_status || "") ===
            _.toLower(paymentStatus);
      }

      if (from && to) {
        matches =
          matches ||
          isWithinInterval(new Date(salesData?.created_at as string), {
            start: new Date(from),
            end: new Date(to),
          });
      }

      return matches;
    });

    setSalesReport(filteredData);
  };

  useEffect(() => {
    if (
      _.isEmpty(_.trim(plateNumber)) &&
      _.isEmpty(_.trim(paymentStatus)) &&
      _.isEmpty(_.trim(invoiceNumber)) &&
      _.isEmpty(from) &&
      _.isEmpty(to)
    ) {
      setSalesReport(salesReportData);
    }
  }, [salesReportData, inputValues]);

  const totalPages = Math.ceil(salesReport.length / itemsPerPage);
  const paginatedData = salesReport.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRowActions = (row: unknown): RowAction[] => {
    const tableRow = row as TableRow;
    return [
      {
        title: "View Details",
        action: () => router.push("/super-admin/sales/sales-preview"),
      },
      {
        title: "Print Receipt",
        action: () => console.log("Viewing details for:", tableRow),
      },
    ];
  };
  const doesUserExist = useSelector((vehicle) =>
    selectValidUser(vehicle, {
      phoneNumber: phoneNumber,
    })
  );

  const handleSubmit = () => {
    setTimeout(() => {
      setOpenModal(true);
    }, 2000);

    if (doesUserExist !== undefined) {
      setIsNumberVerified(true);
    } else {
      setIsNumberVerified(false);
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
              link: "/super-admin/dashboard",
            },
            {
              label: "Sales Dashboard",
              Icon: SalesSVG,
              link: "/super-admin/sales/sales-report",
            },
          ]}
        />

        <Modal
          title={"New Plate Sales"}
          content={
            <VerifyPhoneNumber
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
          }
          btnText={"New Sales"}
          footerBtn={
            <Button onClick={handleSubmit} type="submit">
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
        title={
          isNumberVerified
            ? "Phone Number Verified Successfully"
            : "Failed to Verify Phone Number"
        }
        open={openModal}
        onClose={() => setOpenModal(false)}
        content={
          <>
            {isNumberVerified ? (
              <div className="flex flex-col gap-4 py-5">
                <div className={"grid grid-cols-[1fr_2fr]"}>
                  <p className={"text-sm"}>Name:</p>
                  <p className={"text-sm font-semibold justify-self-end"}>
                    {doesUserExist?.owner?.firstname}{" "}
                    {doesUserExist?.owner?.lastname}
                  </p>
                </div>
                <div className={"grid grid-cols-[1fr_2fr]"}>
                  <p className={"text-sm"}>Phone Number: </p>
                  <p className={"text-sm font-semibold justify-self-end"}>
                    {doesUserExist?.owner?.phone}
                  </p>
                </div>
                <div className={"grid grid-cols-[1fr_2fr]"}>
                  <p className={"text-sm"}>Address:</p>
                  <p
                    className={"text-sm font-semibold justify-self-end ml-auto"}
                  >
                    {doesUserExist?.owner?.address}
                  </p>
                </div>
              </div>
            ) : (
              <>Please enter the correct number, and try again</>
            )}
          </>
        }
        status={isNumberVerified ? "success" : "failed"}
        footerBtnText={"Continue"}
        footerTrigger={() => {
          if (isNumberVerified && doesUserExist?.owner_id) {
            router.push(
              `/super-admin/sales/newsales/${doesUserExist.owner_id}`
            );
          }
        }}
      />
    </main>
  );
}
