"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, ConfigurationSVG } from "@/common/svgs";
import DashboardTable from "@/components/dashboard/dashboard-table";
import InputWithLabel from "@/components/auth/input-comp";
import CardContainer from "@/components/general/card-container";
import Modal from "@/components/general/modal";
import {
  CreateVehiceMakeAndModel,
  CreatePlateRequestInitialValues,
  CreateVehiceMakeAndModelProps,
} from "@/components/dashboard/verification-forms/create-vehicle-make";
import { useSelector, useDispatch } from "react-redux";
import { selectVehicles } from "@/store/vehicle/vehicle-selector";
import { VehicleService } from "@/services/VehicleService";
import { selectStateIDFromStateName } from "@/store/states/state-selector";
import { toast } from "sonner";
import _ from "lodash";
// import { useRouter } from "next/navigation";
// import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";
// import {
//   RowAction,
//   TableData,
// } from "@/components/dashboard/dashboard-table-w-button";

const tableColumns = [
  { key: "sid", title: "S/N" },
  { key: "make", title: "Vehicle Make" },
  { key: "model", title: "Vehicle Model" },
];

export default function Page() {
  const itemsPerPage = 10;
  // const router = useRouter();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [vehicleMake, setVehicleMake] = useState<string>("");
  const [modalInput, setModalInput] = useState<CreateVehiceMakeAndModelProps>(
    CreatePlateRequestInitialValues
  );
  const vehiclesData = useSelector(selectVehicles);
  const vehicleService = new VehicleService(dispatch);
  const [filteredVehicleInfo, setFilteredVehicleInfo] = useState(vehiclesData);
  const state_id = useSelector((state) =>
    selectStateIDFromStateName(state, modalInput?.state)
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (_.isEmpty(vehicleMake)) {
      setFilteredVehicleInfo(vehiclesData);
      return;
    }

    const filteredData = _.filter(vehiclesData, (vehicle) => {
      let matches = false;

      if (!_.isEmpty(_.trim(vehicleMake))) {
        matches =
          matches || _.toLower(vehicle?.make || "") === _.toLower(vehicleMake);
      }

      return matches;
    });

    setFilteredVehicleInfo(filteredData);
  };

  useEffect(() => {
    if (_.isEmpty(vehicleMake)) {
      setFilteredVehicleInfo(vehiclesData);
    }
  }, [vehiclesData, vehicleMake]);

  const totalPages = Math.ceil(filteredVehicleInfo.length / itemsPerPage);
  const paginatedData = filteredVehicleInfo.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreateMakeModel = async () => {
    try {
      const payload = {
        state_id: state_id,
        status: "active",
        capacity: "5",
        chasis_number: "ABC123456",
        make: modalInput.make,
        model: modalInput.model,
        year: "2023",
        color: "Green",
        policy_sector: "Green Emission Policy",
      };

      const response = await vehicleService.createVehicle(payload);

      if (response.status) {
        setModalInput(CreatePlateRequestInitialValues);
      }
    } catch (error) {
      console.log(error as unknown as string);
      toast("Error Creating new Vehicle Make and Model");
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
              label: "Vehicle Make & Model",
              Icon: ConfigurationSVG,
              link: "/super-admin/configuration/vehicle-make-model",
            },
          ]}
        />

        <Modal
          title={"Create A New Vehicle Make and Model"}
          content={
            <CreateVehiceMakeAndModel
              input={modalInput}
              setInput={setModalInput}
            />
          }
          btnText={"Add new Vehicle Make"}
          footerBtn={
            <Button onClick={handleCreateMakeModel} type="submit">
              Submit
            </Button>
          }
        />
      </div>

      <CardContainer className={"flex flex-col gap-5"}>
        <form
          onSubmit={handleSubmit}
          className={
            "grid grid-cols-1 md:grid-cols-[2.1fr_0.9fr] gap-4 mt-4 items-end"
          }
        >
          <InputWithLabel
            items={{
              id: "vehiclemake",
              label: "Enter Vehicle Make",
              placeholder: "Enter Vehicle Make",
              type: "text",
              htmlfor: "vehiclemake",
            }}
            value={vehicleMake}
            onChange={(e) => setVehicleMake(e.target.value)}
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
          <DashboardTable
            headers={tableColumns}
            data={paginatedData}
            // rowActions={getRowActions}
          />
        </div>
        <div className={"p-5 ml-auto"}>
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </main>
  );
}
