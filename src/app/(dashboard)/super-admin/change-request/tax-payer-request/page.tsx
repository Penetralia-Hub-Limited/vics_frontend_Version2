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
import { selectTaxPayers } from "@/store/user/user-selector";

const tableColumns = [
  { key: "sid", title: "S/N" },
  { key: "fullname", title: "Name" },
  { key: "email", title: "Email Address" },
  { key: "phone", title: "Phone Number" },
  { key: "approval_status", title: "Approval Status" },
  { key: "date_created", title: "Date Created" },
];

type inputValuesProp = {
  name: string;
  email: string;
  phone: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
};

const inputInitialValues = {
  name: "",
  email: "",
  phone: "",
  startDate: undefined,
  endDate: undefined,
};

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputValues, setInputValues] =
    useState<inputValuesProp>(inputInitialValues);
  const taxPayers = useSelector(selectTaxPayers);
  const [taxPayerData, setTaxPayerData] = useState(taxPayers);
  const { name, email, phone, startDate, endDate } = inputValues;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      _.isEmpty(_.trim(name)) &&
      _.isEmpty(_.trim(email)) &&
      _.isEmpty(_.trim(phone)) &&
      _.isEmpty(startDate) &&
      _.isEmpty(endDate)
    ) {
      setTaxPayerData(taxPayers);
      return;
    }

    const filteredData = _.filter(taxPayers, (tax) => {
      let matches = false;

      if (!_.isEmpty(_.trim(phone))) {
        matches = matches || _.toLower(tax?.phone || "") === _.toLower(phone);
      }

      if (!_.isEmpty(_.trim(email))) {
        matches = matches || _.toLower(tax?.email || "") === _.toLower(email);
      }

      if (!_.isEmpty(_.trim(name))) {
        matches = matches || _.toLower(tax?.fullname || "") === _.toLower(name);
      }

      if (startDate && endDate) {
        matches =
          matches ||
          isWithinInterval(new Date(tax.created_at ? tax?.created_at : ""), {
            start: new Date(startDate),
            end: new Date(endDate),
          });
      }

      return matches;
    });

    setTaxPayerData(filteredData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(() => {
    if (
      _.isEmpty(_.trim(name)) &&
      _.isEmpty(_.trim(email)) &&
      _.isEmpty(_.trim(phone)) &&
      _.isEmpty(startDate) &&
      _.isEmpty(endDate)
    ) {
      setTaxPayerData(taxPayers);
      return;
    }
  }, [taxPayers, startDate, endDate, name, email, phone]);

  const totalPages = Math.ceil(taxPayerData.length / itemsPerPage);
  const paginatedData = taxPayerData.slice(
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
            label: "Tax Payer Requests",
            Icon: PenSVG,
            link: "/super-admin/change-request/vehicle-change-request",
          },
        ]}
      />

      <CardContainer className={"flex flex-col gap-5"}>
        <form action="" onSubmit={handleSearch}>
          <div className={"grid grid-cols-1 md:grid-cols-3 gap-4 items-end"}>
            <InputWithLabel
              items={{
                id: "name",
                label: "Name",
                placeholder: "Name",
                type: "text",
                htmlfor: "name",
              }}
              value={inputValues.name}
              onChange={handleInputChange}
            />

            <InputWithLabel
              items={{
                id: "email",
                label: "Email Address",
                placeholder: "Email Address",
                type: "text",
                htmlfor: "email",
              }}
              value={inputValues.email}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr] gap-4 mt-4 items-end">
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
            <Button>Search</Button>
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
