"use client";

import _ from "lodash";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, VICSSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import Modal from "@/components/general/modal";
import { useSelector, useDispatch } from "react-redux";
import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";
import { RowAction } from "@/components/dashboard/dashboard-table-w-button";
import { InsuranceStatus, RequestStatus, PlateNumberType } from "@/common/enum";
import { selectPlateNumberRequestTableData } from "@/store/plate-number-orders/plate-number-order-selector";
import {
  CreatePlateRequestInitialValues,
  CreatePlateRequestProps,
  CreateNewPlatRequest,
} from "@/components/dashboard/verification-forms/Create-Plate-Request";
import { PlateNumberOrderService } from "@/services/PlateNumberOrdersService";
import { selectStateIDFromStateName } from "@/store/states/state-selector";
import { generateTrackingId } from "@/common/helpers";
import { toast } from "sonner";
import { ResponseModalX } from "@/components/general/response-modalx";
import { isWithinInterval } from "date-fns";

const tableColumns = [
  { key: "sid", title: "S/N" },
  { key: "tracking_id", title: "Tracking ID" },
  { key: "plate_number_type", title: "Plate Number Type" },
  { key: "total_number_requested", title: "No. of Plate Requested" },
  { key: "recommended_number", title: "No. of Plate Recommended" },
  { key: "number_assigned", title: "No. Assigned" },
  { key: "date_created", title: "Date" },
  { key: "recommender", title: "Recommending Officer" },
  { key: "approver", title: "Final Approving Officer" },
  { key: "status", title: "Request Status" },
  { key: "insurance_status", title: "Insurance Status" },
];

type inputValuesProp = {
  trackingid: string;
  insuranceStatus: string;
  plateNumberType: string;
  requestStatus: string;
  startDate?: Date | undefined;
  endDate?: Date | undefined;
};

const inputInitialValues = {
  trackingid: "",
  insuranceStatus: "",
  plateNumberType: "",
  requestStatus: "",
  startDate: undefined,
  endDate: undefined,
};

export default function Page() {
  const dispatch = useDispatch();
  const plateOrderService = new PlateNumberOrderService(dispatch);
  const router = useRouter();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [inputValues, setInputValues] =
    useState<inputValuesProp>(inputInitialValues);
  const [modalInput, setModalInput] = useState<CreatePlateRequestProps>(
    CreatePlateRequestInitialValues
  );
  const state_id = useSelector((state) =>
    selectStateIDFromStateName(state, modalInput?.state)
  );
  const plateNumbertableData = useSelector(selectPlateNumberRequestTableData);
  const [plateNumberData, setPlateNumberData] = useState(plateNumbertableData);
  const {
    trackingid,
    insuranceStatus,
    plateNumberType,
    requestStatus,
    startDate,
    endDate,
  } = inputValues;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      _.isEmpty(_.trim(trackingid)) &&
      _.isEmpty(_.trim(insuranceStatus)) &&
      _.isEmpty(_.trim(plateNumberType)) &&
      _.isEmpty(_.trim(requestStatus)) &&
      _.isEmpty(startDate) &&
      _.isEmpty(endDate)
    ) {
      setPlateNumberData(plateNumbertableData);
      return;
    }

    const filteredData = _.filter(plateNumbertableData, (plateData) => {
      let matches = false;

      if (!_.isEmpty(_.trim(trackingid))) {
        matches =
          matches ||
          _.toLower(plateData?.tracking_id || "") === _.toLower(trackingid);
      }

      if (!_.isEmpty(_.trim(insuranceStatus))) {
        matches =
          matches ||
          _.toLower(plateData?.insurance_status || "") ===
            _.toLower(insuranceStatus);
      }

      if (!_.isEmpty(_.trim(plateNumberType))) {
        matches =
          matches ||
          _.toLower(plateData?.plate_number_type || "") ===
            _.toLower(plateNumberType);
      }

      if (!_.isEmpty(_.trim(requestStatus))) {
        matches =
          matches ||
          _.toLower(plateData?.status || "") === _.toLower(requestStatus);
      }

      if (startDate && endDate) {
        matches =
          matches ||
          isWithinInterval(new Date(plateData?.created_at), {
            start: new Date(startDate),
            end: new Date(endDate),
          });
      }

      return matches;
    });

    setPlateNumberData(filteredData);
  };

  useEffect(() => {
    if (
      _.isEmpty(_.trim(trackingid)) &&
      _.isEmpty(_.trim(insuranceStatus)) &&
      _.isEmpty(_.trim(plateNumberType)) &&
      _.isEmpty(_.trim(requestStatus)) &&
      _.isEmpty(startDate) &&
      _.isEmpty(endDate)
    ) {
      setPlateNumberData(plateNumbertableData);
    }
  }, [
    plateNumbertableData,
    trackingid,
    insuranceStatus,
    plateNumberType,
    requestStatus,
    startDate,
    endDate,
  ]);

  const totalPages = Math.ceil(plateNumberData.length / itemsPerPage);
  const paginatedData = plateNumberData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRowActions = (row: unknown): RowAction[] => {
    console.log(row);
    return [
      {
        title: "View",
        action: () =>
          router.push(`/super-admin/plate-number-request/view-request`),
      },
    ];
  };

  const handleSubmit = async () => {
    try {
      const res = await plateOrderService.createPlateNumberOrder({
        tracking_id: generateTrackingId(),
        state_id: state_id,
        ...modalInput,
      });

      if (res.status) {
        setOpenModal(true);
      }
    } catch (error) {
      console.error("Failed:", error);
      toast(error as unknown as string);
    }
  };

  return (
    <main className="flex flex-col gap-8 md:gap-12 overflow-hidden">
      <div className="flex flex-col gap-5 md:flex-row justify-between items-center">
        <DashboardPath
          pathdata={[
            {
              label: "Dashboard",
              Icon: DashboardSVG,
              link: "/super-admin/dashboard",
            },
            {
              label: "Plate Number Request",
              Icon: VICSSVG,
              link: "/super-admin/plate-number-request",
            },
          ]}
        />

        <ResponseModalX
          title={"Request Created Successfully"}
          open={openModal}
          onClose={() => setOpenModal(false)}
          content={<>You have successfully created a new request</>}
          status={"success"}
          footerBtnText={"Done"}
          footerTrigger={() =>
            router.push("/mla-admin/plate-number-request/view-request")
          }
        />

        <Modal
          title={"Create New Plate Number Request"}
          content={
            <CreateNewPlatRequest input={modalInput} setInput={setModalInput} />
          }
          btnText={"Create New Request"}
          footerBtn={
            <Button onClick={handleSubmit} type="submit">
              Submit
            </Button>
          }
        />
      </div>

      <CardContainer className="flex flex-col gap-5">
        <form action="" onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <InputWithLabel
              items={{
                id: "trackingid",
                label: "Tracking ID",
                placeholder: "Tracking ID",
                type: "text",
                htmlfor: "trackingid",
              }}
              value={inputValues.trackingid}
              onChange={(e) =>
                setInputValues((prev) => ({
                  ...prev,
                  trackingid: e.target.value,
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
                  plateNumberType: selected ? String(selected) : "",
                }))
              }
            />

            <DashboardCompSelect
              title={"Insurance Status"}
              placeholder={"-- Select status --"}
              items={[...Object.values(InsuranceStatus)]}
              selected={inputValues.insuranceStatus}
              onSelect={(selected) =>
                setInputValues((prev) => ({
                  ...prev,
                  insuranceStatus: selected ? String(selected) : "",
                }))
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end">
            <DashboardCompSelect
              title={"Request Status"}
              placeholder={"-- Select status --"}
              items={[...Object.values(RequestStatus)]}
              selected={inputValues.requestStatus}
              onSelect={(selected) =>
                setInputValues((prev) => ({
                  ...prev,
                  requestStatus: selected ? String(selected) : "",
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
          </div>
        </form>
      </CardContainer>

      <div className="flex flex-col gap-3 border-1 border-primary-300 rounded-lg">
        <div className="border-t-1 border-primary-300 rounded-lg overflow-hidden scrollbar-width">
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
