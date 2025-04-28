"use client";

import _ from "lodash";
import { useState, useEffect } from "react";
import { isWithinInterval } from "date-fns";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, ConfigurationSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import {
  DataTableWButton,
  RowAction,
} from "@/components/dashboard/dashboard-table-w-button";
import { useSelector } from "react-redux";
import { selectServices } from "@/store/service-type/service-selector";

const tableColumns = [
  { key: "sid", title: "S/N" },
  { key: "name", title: "Service Name" },
  { key: "vehicle_category", title: "Category" },
  { key: "created_by", title: "Created By" },
  { key: "created_at", title: "Date Created" },
  { key: "duration_in_month", title: "Duration (in Months)" },
  { key: "service_price", title: "Amount" },
];

type inputValuesProp = {
  servicename: string;
  from: Date | undefined;
  to: Date | undefined;
};

const inputInitialValues = {
  servicename: "",
  from: undefined,
  to: undefined,
};

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputValues, setInputValues] =
    useState<inputValuesProp>(inputInitialValues);
  const serviceData = useSelector(selectServices);
  const [services, setServices] = useState(serviceData);

  const { servicename, from, to } = inputValues;
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (_.isEmpty(servicename) && _.isEmpty(from) && _.isEmpty(to)) {
      setServices(serviceData);
      return;
    }

    const filteredData = _.filter(serviceData, (service) => {
      let matches = false;

      if (!_.isEmpty(_.trim(servicename))) {
        matches =
          matches || _.toLower(service?.name || "") === _.toLower(servicename);
      }

      if (from && to) {
        matches =
          matches ||
          isWithinInterval(new Date(service?.created_at), {
            start: new Date(from),
            end: new Date(to),
          });
      }

      return matches;
    });
    setServices(filteredData);
  };

  useEffect(() => {
    if (_.isEmpty(servicename) && _.isEmpty(from) && _.isEmpty(to)) {
      setServices(serviceData);
    }
  }, [serviceData, inputValues]);

  const totalPages = Math.ceil(services.length / itemsPerPage);
  const paginatedData = services.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  interface TableRow {
    id: number;
    endCode: string;
    type: string;
    createdBy: string;
    date: Date;
    initialQuantity: number;
    currentQuantity: number;
    assigned: number;
    sold: number;
  }

  const getRowActions = (row: unknown): RowAction[] => {
    const tableRow = row as TableRow;
    return [
      {
        title: "View",
        action: () => console.log("Viewing details for:", tableRow),
      },
    ];
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
              label: "Manage Services",
              Icon: ConfigurationSVG,
              link: "/super-admin/configuration/manage-services",
            },
          ]}
        />

        <Button>Add New Service</Button>
      </div>

      <CardContainer className={"flex flex-col gap-5"}>
        <form action="#" onSubmit={handleSearch}>
          <div
            className={"grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end"}
          >
            <InputWithLabel
              items={{
                id: "servicename",
                label: "Service Name",
                placeholder: "Service Name",
                type: "text",
                htmlfor: "servicename",
              }}
              value={inputValues.servicename}
              onChange={(e) =>
                setInputValues((prev) => ({
                  ...prev,
                  servicename: e.target.value,
                }))
              }
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
    </main>
  );
}
