"use client";

import _ from "lodash";
import { useReactToPrint } from "react-to-print";
import { useRef, useState, useEffect, forwardRef } from "react";
import { useRouter } from "next/navigation";
import { isWithinInterval } from "date-fns";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, PrintSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import { CardStatus, CardPrintStatus, SelectCardType } from "@/common/enum";
import { RowAction } from "@/components/dashboard/dashboard-table-w-button";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";
import { CardstableData } from "@/common/constant";

const tableColumns = [
  { key: "id", title: "S/N" },
  { key: "platenumber", title: "Plate Number" },
  { key: "cardowner", title: "Card Owner" },
  { key: "cardtype", title: "Card Type" },
  { key: "zonaloffice", title: "Zonal Office" },
  { key: "createdby", title: "Created By" },
  { key: "activationdate", title: "Activation Date" },
  { key: "expirydate", title: "Expiry Date" },
  { key: "cardstatus", title: "Card Status" },
];

type inputValuesProp = {
  plateNumber: string;
  // zonalOffice: string;
  cardType: string;
  cardStatus: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
};

const inputInitialValues = {
  plateNumber: "",
  // zonalOffice: "",
  cardType: "",
  cardStatus: "",
  startDate: undefined,
  endDate: undefined,
};

export default function Page() {
  const itemsPerPage = 10;
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputValues, setInputValues] =
    useState<inputValuesProp>(inputInitialValues);
  const [printData, setPrintData] = useState(CardstableData);

  const { plateNumber, cardType, cardStatus, startDate, endDate } = inputValues;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      _.isEmpty(_.trim(plateNumber)) &&
      _.isEmpty(_.trim(cardType)) &&
      _.isEmpty(_.trim(cardStatus)) &&
      _.isEmpty(startDate) &&
      _.isEmpty(endDate)
    ) {
      setPrintData(CardstableData);
      return;
    }

    const filteredData = _.filter(CardstableData, (print) => {
      let matches = false;

      if (!_.isEmpty(_.trim(plateNumber))) {
        matches =
          matches ||
          _.toLower(print?.platenumber || "") === _.toLower(plateNumber);
      }

      if (!_.isEmpty(_.trim(cardType))) {
        matches =
          matches || _.toLower(print?.cardtype || "") === _.toLower(cardType);
      }

      if (!_.isEmpty(_.trim(cardStatus))) {
        matches =
          matches ||
          _.toLower(print?.cardstatus || "") === _.toLower(cardStatus);
      }

      if (startDate && endDate) {
        matches =
          matches ||
          isWithinInterval(new Date(print?.activationdate), {
            start: new Date(startDate),
            end: new Date(endDate),
          });
      }

      return matches;
    });

    setPrintData(filteredData);
  };

  useEffect(() => {
    if (
      _.isEmpty(_.trim(plateNumber)) &&
      _.isEmpty(_.trim(cardType)) &&
      _.isEmpty(_.trim(cardStatus)) &&
      _.isEmpty(startDate) &&
      _.isEmpty(endDate)
    ) {
      setPrintData(CardstableData);
    }
  }, [plateNumber, cardType, cardStatus, startDate, endDate]);

  const totalPages = Math.ceil(printData.length / itemsPerPage);
  const paginatedData = printData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  interface TableRow {
    id: number;
    platenumber: string;
    cardowner: string;
    cardtype: string;
    zonaloffice: string;
    createdby: string;
    activationdate: Date;
    expirydate: Date;
    cardstatus: CardStatus;
  }

  const getRowActions = (row: unknown): RowAction[] => {
    const tableRow = row as TableRow;
    return [
      {
        title: "Preview",
        action: () =>
          router.push(
            `/super-admin/print-management/print-cards-stickers/${tableRow.id}`
          ),
      },
    ];
  };

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
            label: "Print Management",
            Icon: PrintSVG,
            link: "/super-admin/print-management/print-cards-&-stickers",
          },
        ]}
      />

      {/* <div className={cn("hidden")}>
        <div ref={contentRef}>
          <CardPrint back={{}} front={} />
        </div>
      </div> */}

      <CardContainer className={"flex flex-col gap-5"}>
        <form action="" onSubmit={handleSearch}>
          <div className={"grid grid-cols-1 md:grid-cols-3 gap-4 items-end"}>
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
              title={"Card Status"}
              placeholder={"-- Select Status --"}
              items={[...Object.values(CardPrintStatus)]}
              selected={inputValues.cardStatus}
              onSelect={(selected) =>
                setInputValues((prev) => ({
                  ...prev,
                  cardStatus: selected ? String(selected) : "",
                }))
              }
            />

            <DashboardCompSelect
              title={"Card Type"}
              placeholder={"-- Select Type --"}
              items={[...Object.values(SelectCardType)]}
              selected={inputValues.cardType}
              onSelect={(selected) =>
                setInputValues((prev) => ({
                  ...prev,
                  cardType: selected ? String(selected) : "",
                }))
              }
            />
          </div>

          <div
            className={"grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 items-end"}
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

          {/* <div className="grid grid-cols-2 gap-4 mt-4 items-end">
            <Button variant={"outline"}>Bulk Download</Button>
            <Button variant={"default"}>Print Item</Button>
          </div> */}
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
