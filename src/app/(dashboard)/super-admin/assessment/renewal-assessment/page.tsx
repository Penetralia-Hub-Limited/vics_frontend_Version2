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
import { PaymentStatus } from "@/common/enum";

const tableColumns = [
  { key: "id", title: "S/N" },
  { key: "platenumber", title: "Plate Number" },
  { key: "platetype", title: "Plates Type" },
  { key: "amount", title: "Amount" },
  { key: "createdby", title: "Created By" },
  { key: "buyer", title: "Buyer" },
  { key: "paymentstatus", title: "Payment Status" },
  { key: "created_at", title: "Transaction Date" },
];

type inputValuesProp = {
  plateNumber: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
};

const inputInitialValues = {
  plateNumber: "",
  startDate: undefined,
  endDate: undefined,
};

const tableData = [
  {
    id: 1,
    platenumber: "IH-4FS-DEK",
    platetype: "Private (Direct)",
    amount: 13000,
    platerecommended: null,
    createdby: "Akanbi E",
    buyer: "Dave E ",
    paymentstatus: PaymentStatus.PAID,
    created_at: new Date(),
  },
  {
    id: 2,
    platenumber: "JK-347-FSK",
    platetype: "Private (Direct)",
    amount: 13000,
    platerecommended: 10,
    createdby: "Akanbi E",
    buyer: "Dave E ",
    paymentstatus: PaymentStatus.NOTPAID,
    created_at: new Date(),
  },
  {
    id: 3,
    platenumber: "AB-T34-FSK",
    platetype: "Private",
    amount: 12500,
    platerecommended: 30,
    createdby: "Akanbi E",
    buyer: "Dave E ",
    paymentstatus: PaymentStatus.PAID,
    created_at: "2023-04-23",
  },
];

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputValues, setInputValues] =
    useState<inputValuesProp>(inputInitialValues);
  const [renewalData, setRenewalData] = useState(tableData);
  const { plateNumber, startDate, endDate } = inputValues;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      _.isEmpty(_.trim(plateNumber)) &&
      _.isEmpty(startDate) &&
      _.isEmpty(endDate)
    ) {
      setRenewalData(tableData);
      return;
    }

    const filteredData = _.filter(tableData, (data) => {
      let matches = false;

      if (!_.isEmpty(_.trim(plateNumber))) {
        matches =
          matches ||
          _.toLower(data?.platenumber || "") === _.toLower(plateNumber);
      }

      if (startDate && endDate) {
        matches =
          matches ||
          isWithinInterval(new Date(data?.created_at as string), {
            start: new Date(startDate),
            end: new Date(endDate),
          });
      }

      return matches;
    });

    setRenewalData(filteredData);
  };

  useEffect(() => {
    if (
      _.isEmpty(_.trim(plateNumber)) &&
      _.isEmpty(startDate) &&
      _.isEmpty(endDate)
    ) {
      setRenewalData(tableData);
    }
  }, [plateNumber, startDate, endDate]);

  const totalPages = Math.ceil(renewalData.length / itemsPerPage);
  const paginatedData = renewalData.slice(
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
            label: "Renewal Assessment",
            Icon: PenSVG,
            link: "/super-admin/assessment/sales-assessment",
          },
        ]}
      />

      <CardContainer className={"flex flex-col gap-5"}>
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
        >
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
