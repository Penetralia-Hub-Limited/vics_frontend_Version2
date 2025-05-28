"use client";

import _ from "lodash";
import { useState, useEffect } from "react";
import { isWithinInterval } from "date-fns";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, PrintSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { PaymentStatus } from "@/common/enum";

const tableColumns = [
  { key: "id", title: "S/N" },
  { key: "payername", title: "Payer Name" },
  { key: "invoicenumber", title: "Invoice Number" },
  { key: "amount", title: "Amount" },
  { key: "createdby", title: "Created By" },
  { key: "datecreated", title: "Date Created" },
  { key: "datepaid", title: "Date Paid" },
  { key: "paymentstatus", title: "Payent Status" },
];

type inputValuesProp = {
  name: string;
  mla: string;
  invoiceNumber: string;
  from: Date | undefined;
  to: Date | undefined;
};

const inputInitialValues = {
  name: "",
  mla: "",
  invoiceNumber: "",
  from: undefined,
  to: undefined,
};

const tableData = [
  {
    id: 1,
    payername: "Threse Ukot",
    invoicenumber: "234232CDS",
    amount: 13500,
    createdby: "Akanbi S.",
    datecreated: "2022-04-12",
    datepaid: "2022-04-12",
    paymentstatus: PaymentStatus.PAID,
  },
  {
    id: 2,
    payername: "Jay K.",
    invoicenumber: "345CDS2543",
    amount: 12563,
    createdby: "Akanbi S.",
    datecreated: "2023-08-12",
    datepaid: "2023-08-15",
    paymentstatus: PaymentStatus.PAID,
  },
  {
    id: 3,
    payername: "Moses Etim",
    invoicenumber: "256C88723",
    amount: 13500,
    createdby: "Akanbi S.",
    datecreated: "2023-10-03",
    datepaid: null,
    paymentstatus: PaymentStatus.NOTPAID,
  },
];

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputValues, setInputValues] =
    useState<inputValuesProp>(inputInitialValues);
  const [documentData, setDocumentData] = useState(tableData);

  const { name, mla, invoiceNumber, from, to } = inputValues;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      _.isEmpty(_.trim(name)) &&
      _.isEmpty(_.trim(mla)) &&
      _.isEmpty(_.trim(invoiceNumber)) &&
      _.isEmpty(from) &&
      _.isEmpty(to)
    ) {
      setDocumentData(tableData);
      return;
    }

    const filteredData = _.filter(tableData, (document) => {
      let matches = false;

      if (!_.isEmpty(_.trim(name))) {
        matches =
          matches || _.toLower(document?.payername || "") === _.toLower(name);
      }

      if (!_.isEmpty(_.trim(mla))) {
        matches =
          matches || _.toLower(document?.createdby || "") === _.toLower(mla);
      }

      if (!_.isEmpty(_.trim(invoiceNumber))) {
        matches =
          matches ||
          _.toLower(document?.invoicenumber || "") === _.toLower(invoiceNumber);
      }

      if (from && to) {
        matches =
          matches ||
          isWithinInterval(
            !isNaN(Date.parse(document?.datecreated))
              ? new Date(document.datecreated)
              : new Date(),
            {
              start: new Date(from),
              end: new Date(to),
            }
          );
      }

      return matches;
    });

    setDocumentData(filteredData);
  };

  useEffect(() => {
    if (
      _.isEmpty(_.trim(name)) &&
      _.isEmpty(_.trim(mla)) &&
      _.isEmpty(_.trim(invoiceNumber)) &&
      _.isEmpty(from) &&
      _.isEmpty(to)
    ) {
      setDocumentData(tableData);
    }
  }, [name, mla, invoiceNumber, from, to]);

  const totalPages = Math.ceil(documentData.length / itemsPerPage);
  const paginatedData = documentData.slice(
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
            link: "/store-manager-admin/dashboard",
          },
          {
            label: "Print Management",
            Icon: PrintSVG,
            link: "/super-admin/print-management/print-document",
          },
        ]}
      />

      <CardContainer className={"flex flex-col gap-5"}>
        <form action="" onSubmit={handleSearch}>
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
                id: "mla",
                label: "MLA",
                placeholder: "MLA",
                type: "text",
                htmlfor: "mla",
              }}
              value={inputValues.mla}
              onChange={(e) =>
                setInputValues((prev) => ({
                  ...prev,
                  mla: e.target.value,
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
          <DashboardTable headers={tableColumns} data={paginatedData} />
        </div>
        <div className={"p-5 ml-auto"}>
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </main>
  );
}
