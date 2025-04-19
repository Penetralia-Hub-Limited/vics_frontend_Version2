"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, ManagementSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const tableColumns = [
  { key: "id", title: "S/N" },
  { key: "endCode", title: "End Code" },
  { key: "type", title: "Type" },
  { key: "createdBy", title: "Created By" },
  { key: "date", title: "Date" },
  { key: "initialQuantity", title: "Initial Quantity" },
  { key: "currentQuantity", title: "Current Quantity" },
  { key: "assigned", title: "Quantity Assigned" },
  { key: "sold", title: "Quantity Sold" },
];

const tableData = [
  {
    id: 1,
    endCode: "JK",
    type: "Private (Direct)",
    createdBy: "Akanbi S.",
    date: new Date(),
    initialQuantity: 401,
    currentQuantity: 401,
    assigned: 0,
    sold: 0,
  },
  {
    id: 2,
    endCode: "EW",
    type: "Commercial",
    createdBy: "Sheik A.",
    date: new Date(),
    initialQuantity: 400,
    currentQuantity: 400,
    assigned: 0,
    sold: 0,
  },
  {
    id: 3,
    endCode: "IE",
    type: "Commercial",
    createdBy: "Lola S.",
    date: new Date(),
    initialQuantity: 101,
    currentQuantity: 101,
    assigned: 0,
    sold: 0,
  },
];

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const { lgas } = useSelector((state: RootState) => state?.lga);
  const filteredLGA = lgas.map((lga) => lga.name);
  const [value, setValue] = useState<{
    lgaValue: string;
    plateNumberType: string;
    plateNumberEndCode: string;
  }>({
    lgaValue: "",
    plateNumberType: "",
    plateNumberEndCode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({ ...prev, plateNumberEndCode: e.target.value }));
  };

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const paginatedData = tableData.slice(
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

  interface RowAction {
    title: string;
    action: () => void;
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
    <main className="flex flex-col gap-8 md:gap-12 overflow-hidden">
      <div className="flex flex-col gap-5 md:flex-row justify-between items-center">
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
        <Button>Create New Stock</Button>
      </div>

      <CardContainer className={"flex flex-col gap-5"}>
        <div className={"grid grid-cols-1 md:grid-cols-3 gap-4 items-end"}>
          <DashboardCompSelect
            title={"LGA"}
            placeholder={"-- Select LGA --"}
            items={filteredLGA}
            onSelect={(selected) =>
              setValue((prev) => ({
                ...prev,
                lgaValue: selected ? String(selected) : "",
              }))
            }
            selected={value.lgaValue}
          />

          <DashboardCompSelect
            title={"Plate Number Type"}
            placeholder={"-- Select Type --"}
            items={["private", "commercial"]}
            onSelect={(selected) =>
              setValue((prev) => ({
                ...prev,
                plateNumberType: selected ? String(selected) : "",
              }))
            }
            selected={value.plateNumberType}
          />

          <InputWithLabel
            items={{
              id: "platenumberendcode",
              label: "Plate Number End Code",
              placeholder: "Plate Number End Code",
              type: "text",
              htmlfor: "platenumberendcode",
            }}
            value={value.plateNumberEndCode}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr] gap-4 mt-4 items-end">
          <DatePicker
            date={startDate}
            setDate={setStartDate}
            title="Start Date"
          />
          <DatePicker date={endDate} setDate={setEndDate} title="End Date" />
          <Button>Search Store</Button>
        </div>
      </CardContainer>

      <div className="flex flex-col gap-3 border border-primary-300 rounded-lg">
        <div className="border-t border-primary-300 rounded-lg">
          <DataTableWButton
            headers={tableColumns}
            data={paginatedData}
            rowActions={getRowActions}
          />
        </div>
        <div className="p-5 ml-auto">
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </main>
  );
}
