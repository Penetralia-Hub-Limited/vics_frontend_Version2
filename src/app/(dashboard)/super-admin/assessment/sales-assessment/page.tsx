"use client";

import _ from "lodash";
import { useState, useEffect } from "react";
import { isWithinInterval } from "date-fns";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, PenSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { PaymentStatus } from "@/common/enum";
import { useSelector } from "react-redux";
import { selectPlateNumber } from "@/store/plateNumber/plate-number-selector";

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
  startDate: Date | undefined;
  endDate: Date | undefined;
};

const inputInitialValues = {
  plateNumber: "",
  paymentStatus: "",
  invoiceNumber: "",
  startDate: undefined,
  endDate: undefined,
};

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputValues, setInputValues] =
    useState<inputValuesProp>(inputInitialValues);
  const salesAssessmentData = useSelector(selectPlateNumber);
  const [salesAssessment, setSalesAssessment] = useState(salesAssessmentData);
  const { plateNumber, paymentStatus, invoiceNumber, startDate, endDate } =
    inputValues;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      _.isEmpty(_.trim(plateNumber)) &&
      _.isEmpty(_.trim(paymentStatus)) &&
      _.isEmpty(_.trim(invoiceNumber)) &&
      _.isEmpty(startDate) &&
      _.isEmpty(endDate)
    ) {
      setSalesAssessment(salesAssessmentData);
      return;
    }

    const filteredData = _.filter(salesAssessmentData, (salesData) => {
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

      if (startDate && endDate) {
        matches =
          matches ||
          isWithinInterval(new Date(salesData?.created_at as string), {
            start: new Date(startDate),
            end: new Date(endDate),
          });
      }

      return matches;
    });

    setSalesAssessment(filteredData);
  };

  useEffect(() => {
    if (
      _.isEmpty(_.trim(plateNumber)) &&
      _.isEmpty(_.trim(paymentStatus)) &&
      _.isEmpty(_.trim(invoiceNumber)) &&
      _.isEmpty(startDate) &&
      _.isEmpty(endDate)
    ) {
      setSalesAssessment(salesAssessmentData);
    }
  }, [
    salesAssessmentData,
    plateNumber,
    paymentStatus,
    invoiceNumber,
    startDate,
    endDate,
  ]);

  const totalPages = Math.ceil(salesAssessment.length / itemsPerPage);
  const paginatedData = salesAssessment.slice(
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
            label: "Sales Assessment",
            Icon: PenSVG,
            link: "/super-admin/assessment/sales-assessment",
          },
        ]}
      />

      <CardContainer className={"flex flex-col gap-5"}>
        <form action="#" onSubmit={handleSearch}>
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
