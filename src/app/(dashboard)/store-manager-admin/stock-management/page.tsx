"use client";

import _ from "lodash";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isWithinInterval } from "date-fns";
import InputWithLabel from "@/components/auth/input-comp";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import { ResponseModalX } from "@/components/general/response-modalx";
import CardContainer from "@/components/general/card-container";
import DashboardTable from "@/components/dashboard/dashboard-table";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, ManagementSVG } from "@/common/svgs";
import { PlateNumberType } from "@/common/enum";
import Modal from "@/components/general/modal";
import {
  CreateNewStock,
  CreateNewStockProps,
  CreateNewStockPropsInitialValues,
} from "@/components/dashboard/verification-forms/create-new-stock";
import { selectLGAFromName } from "@/store/lgas/lga-selector";
import { PlateNumberService } from "@/services/PlateNumberService";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { toast } from "sonner";
import { selectStateIDFromStateName } from "@/store/states/state-selector";
import { selectAllStock } from "@/store/stock/stock-selector";
import { StockService } from "@/services/StockService";
import { PlateNumberStatus } from "@/common/enum";

const tableHeaders = [
  { title: "S/N", key: "sid" },
  { title: "LGA", key: "lga_name" },
  { title: "Range", key: "range" },
  { title: "End Code", key: "end_code" },
  { title: "Type", key: "type" },
  { title: "Created By", key: "created_by" },
  { title: "Date", key: "created_at" },
  { title: "Initial Quantity", key: "intial_quantity" },
  { title: "Current Quantity", key: "current_quantity" },
];

type inputValuesProp = {
  plateNumberEndCode: string;
  lga: string;
  plateNumberType: PlateNumberType | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
};

const inputInitialValues = {
  plateNumberEndCode: "",
  lga: "",
  plateNumberType: undefined,
  startDate: undefined,
  endDate: undefined,
};

export default function Page() {
  const itemsPerPage = 10;
  const router = useRouter();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalInput, setModalInput] = useState<CreateNewStockProps>(
    CreateNewStockPropsInitialValues
  );
  const [inputValues, setInputValues] =
    useState<inputValuesProp>(inputInitialValues);

  const plateService = new PlateNumberService(dispatch);
  const stockService = new StockService(dispatch);
  const { lgas } = useSelector((state: RootState) => state?.lga);
  const filteredLGA = lgas.map((lga) => lga.name);
  const stockData = useSelector(selectAllStock);
  const [plateStock, setPlateStock] = useState(stockData);
  const state_id = useSelector((state) =>
    selectStateIDFromStateName(state, modalInput?.state)
  );
  const lgaInfo = useSelector((state) =>
    selectLGAFromName(state, modalInput?.lga)
  );

  const { plateNumberEndCode, lga, plateNumberType, startDate, endDate } =
    inputValues;
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      _.isEmpty(_.trim(plateNumberEndCode)) &&
      _.isEmpty(_.trim(lga)) &&
      _.isEmpty(_.trim(plateNumberType)) &&
      _.isEmpty(startDate) &&
      _.isEmpty(endDate)
    ) {
      setPlateStock(stockData);
      return;
    }

    const filteredData = _.filter(stockData, (stockData) => {
      let matches = false;

      if (!_.isEmpty(_.trim(plateNumberEndCode))) {
        matches =
          matches ||
          _.toLower(stockData?.end_code || "") ===
            _.toLower(plateNumberEndCode);
      }

      if (!_.isEmpty(_.trim(plateNumberType))) {
        matches =
          matches ||
          _.toLower(stockData?.type || "") === _.toLower(plateNumberType);
      }

      if (startDate && endDate) {
        matches =
          matches ||
          isWithinInterval(new Date(stockData?.created_at as string), {
            start: new Date(startDate),
            end: new Date(endDate),
          });
      }

      return matches;
    });

    setPlateStock(filteredData);
  };

  useEffect(() => {
    if (
      _.isEmpty(_.trim(plateNumberEndCode)) &&
      _.isEmpty(_.trim(lga)) &&
      _.isEmpty(_.trim(plateNumberType)) &&
      _.isEmpty(startDate) &&
      _.isEmpty(endDate)
    ) {
      setPlateStock(stockData);
    }
  }, [stockData, plateNumberEndCode, lga, plateNumberType, startDate, endDate]);

  const totalPages = Math.ceil(plateStock.length / itemsPerPage);
  const paginatedData = plateStock.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSubmit = async () => {
    try {
      const stockPayload = {
        state_id,
        lga_id: lgaInfo?.id,
        lga: lgaInfo,
        end_code: modalInput.endCode,
        type: modalInput.plate_number_type,
        status: "Active Created",
        range: `${modalInput.startNumber} - ${modalInput.endNoPlate}`,
        intial_quantity: modalInput.total_number_requested,
        current_quantity: modalInput.total_number_requested,
        plate_type: {
          type: modalInput.plate_number_type ?? "",
          stock_total: modalInput.total_number_requested,
        },
      };
      // store manager should create stock
      const stockRes = await stockService.createNewStock(stockPayload);

      const total = Number(modalInput?.total_number_requested);
      const start = Number(modalInput?.startNumber);

      const platePromises = [];

      if (stockRes.status) {
        for (let i = 0; i < total; i++) {
          const number = `${modalInput.lga.slice(0, 3).toUpperCase()}-${start + i}-${modalInput.endCode}`;

          const modifiedPayload = {
            state_id,
            agent_id: null,
            owner_id: null,
            number,
            number_status: null,
            assigned_status: PlateNumberStatus.UNASSIGNED,
            type: String(modalInput.plate_number_type) ?? null,
            sub_type: String(modalInput.plate_number_sub_type) ?? null,
            status: null,
            request_id: null,
            stock_id: stockRes?.data?.id,
            assigned_date: null,
          };

          platePromises.push(plateService.createPlateNumber(modifiedPayload));
        }

        const responses = await Promise.all(platePromises);
        console.log(responses);
        // Check if all the plate creation responses are successful
        const allSuccess = responses.every((response) => response.status);

        if (stockRes.status && allSuccess) {
          setOpenModal(true);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast(`Error Creating Stock. ${error.message}`);
      } else {
        toast("Error Creating Stock. An unknown error occurred.");
      }
    }
  };

  return (
    <main className={"flex flex-col gap-8 md:gap-12"}>
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
              link: "/store-manager-admin/dashboard",
            },
            {
              label: "Manage Stock",
              Icon: ManagementSVG,
              link: "/store-manager-admin/stock-management",
            },
          ]}
        />

        <Modal
          title={"Create New Stock"}
          content={
            <CreateNewStock input={modalInput} setInput={setModalInput} />
          }
          btnText={"Create New Stock"}
          footerBtn={
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          }
        />
      </div>

      <CardContainer className={"flex flex-col gap-5"}>
        <form action="" onSubmit={handleSearch}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
            <DashboardCompSelect
              title={"LGA"}
              placeholder={"-- Select LGA --"}
              items={filteredLGA}
              selected={inputValues.lga}
              onSelect={(selected) =>
                setInputValues((prev) => ({
                  ...prev,
                  lga: selected ? String(selected) : "",
                }))
              }
            />

            <DashboardCompSelect
              title={"Plate Number Type"}
              placeholder={"-- Select Type --"}
              items={[...Object.values(PlateNumberType)]}
              selected={inputValues.plateNumberType}
              onSelect={(selected) =>
                setInputValues((prev) => ({
                  ...prev,
                  plateNumberType: selected as PlateNumberType | undefined,
                }))
              }
            />

            <InputWithLabel
              items={{
                id: "plateNumber",
                label: "Plate Number End Code",
                placeholder: "Plate Number",
                type: "text",
                htmlfor: "plateNumber",
              }}
              value={inputValues.plateNumberEndCode}
              onChange={(e) =>
                setInputValues((prev) => ({
                  ...prev,
                  plateNumberEndCode: e.target.value,
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

            <Button type="submit">Search Store</Button>
          </div>
        </form>
      </CardContainer>

      <div
        className={"flex flex-col gap-3 border-1 border-primary-300 rounded-lg"}
      >
        <div
          className={"border-t-1 border-primary-300 rounded-lg overflow-hidden"}
        >
          <DashboardTable headers={tableHeaders} data={paginatedData} />
        </div>
        <div className={"p-5 ml-auto"}>
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>

      <ResponseModalX
        title={"Stock Created Successfully"}
        open={openModal}
        onClose={() => setOpenModal(false)}
        content={<>You have successfully created a new stock</>}
        status={"success"}
        footerBtnText={"Done"}
        footerTrigger={() =>
          router.push(
            "/store-manager-admin/plate-number-request/assign-plate-number"
          )
        }
      />
    </main>
  );
}
