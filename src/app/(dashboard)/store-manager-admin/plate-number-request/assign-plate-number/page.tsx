"use client";

import _ from "lodash";
import { useState, useEffect } from "react";
import PlateTable from "@/components/dashboard/check-table/dashboard-check-table";
import ArrowButton from "@/components/general/arrow-button";
import { Button } from "@/components/ui/button";
import DashboardPath from "@/components/dashboard/dashboard-path";
import CardContainer from "@/components/general/card-container";
import { DashboardSVG, VICSSVG } from "@/common/svgs";
import { useSelector, useDispatch } from "react-redux";
import { selectUnassignedPlates } from "@/store/plateNumber/plate-number-selector";
import { PlateNumberData } from "@/store/plateNumber/plate-number-types";
import { PlateNumberService } from "@/services/PlateNumberService";
import { toast } from "sonner";
import { PlateNumberStatus } from "@/common/enum";
import { ResponseModalX } from "@/components/general/response-modalx";

const PlateSelectionPage: React.FC = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const unassignedPlates = useSelector(selectUnassignedPlates);
  const [plateNumber, setPlateNumber] = useState("");
  const [allPlates, setAllPlates] = useState(unassignedPlates);
  const [selectedPlates, setSelectedPlates] = useState<
    (PlateNumberData & { sid: number })[]
  >([]);
  const plateNumberService = new PlateNumberService(dispatch);

  const handleAssignedPlate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (_.isEmpty(_.trim(plateNumber))) {
      setAllPlates(unassignedPlates);
      return;
    }

    const filteredData = _.filter(unassignedPlates, (plateData) => {
      let matches = false;

      if (!_.isEmpty(_.trim(plateNumber))) {
        matches =
          matches ||
          _.toLower(plateData?.number || "") === _.toLower(plateNumber);
      }
      return matches;
    });
    setAllPlates(filteredData);

    const payload = {
      assigned_status: PlateNumberStatus.ASSIGNED,
      assigned_date: new Date().toDateString(),
    };

    try {
      const response = await plateNumberService.updatePlateNumber(
        filteredData[0]?.id,
        payload
      );

      if (response.status) {
        setOpenModal(true);
      }
    } catch (error) {
      console.error("Failed:", error);
      if (error instanceof Error) {
        toast(`Error assigning Plate. ${error.message}`);
      } else {
        toast("Error assigning Plate. An unknown error occurred.");
      }
    }
  };

  useEffect(() => {
    if (_.isEmpty(_.trim(plateNumber))) {
      setAllPlates(unassignedPlates);
      return;
    }
  }, [unassignedPlates, plateNumber]);

  const handleSelectChange = (
    plate: PlateNumberData & { sid: number },
    selected: boolean
  ) => {
    if (selected) {
      if (!selectedPlates.some((p) => p.sid === plate.sid)) {
        setSelectedPlates((prev) => [...prev, plate]);
      }
    } else {
      setSelectedPlates((prev) => prev.filter((p) => p.sid !== plate.sid));
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedPlates(allPlates);
    } else {
      setSelectedPlates([]);
    }
  };

  const handleAssignPlateSelected = async () => {
    const updates = selectedPlates.map((plate) => {
      const payload = {
        assigned_status: PlateNumberStatus.ASSIGNED,
      };

      return plateNumberService.updatePlateNumber(plate.id, payload);
    });
    try {
      const response = await Promise.all(updates);

      if (response) {
        setOpenModal(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast(`Error assigning Plate. ${error.message}`);
      } else {
        toast("Error assigning Plate. An unknown error occurred.");
      }
    }
  };

  const totalPlates = allPlates.length;
  const totalSelectedPlates = selectedPlates.length;

  return (
    <div className="flex flex-col gap-8 mx-auto w-full max-w-7xl h-full min-h-screen">
      <DashboardPath
        pathdata={[
          {
            label: "Dashboard",
            Icon: DashboardSVG,
            link: "/store-manager-admin/dashboard",
          },
          {
            label: "Plate Number Request",
            Icon: VICSSVG,
            link: "/store-manager-admin/plate-number-request",
          },
          {
            label: "Assign Plate Number",
            Icon: VICSSVG,
            link: "/store-manager-admin/assessment",
          },
        ]}
      />

      <div className="flex flex-col gap-8 mx-auto w-full max-w-7xl">
        <CardContainer>
          <form action="#" onSubmit={handleAssignedPlate}>
            <div className="grid grid-cols-1 md:grid-cols-[2.5fr_auto] gap-4 items-end">
              <div className={"flex flex-col gap-3"}>
                <p className={"font-semibold"}>
                  Enter the number of the plate you wish to assign
                </p>
                <div
                  className={
                    "grid grid-cols-[3fr_1fr] items-center justify-between border border-primary-300 rounded-md"
                  }
                >
                  <input
                    type={"text"}
                    placeholder={"placeholder"}
                    className={
                      "border-0 p-3 focus:none w-full text-sm ring-0 focus:outline-0"
                    }
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                  />
                  <p
                    className={"px-2 text-xs md:text-sm font-semibold ml-auto"}
                  >
                    of {allPlates.length} plates in store
                  </p>
                </div>
              </div>
              <Button onClick={() => {}} type="submit">
                Assign Plate Numbers
              </Button>
            </div>
          </form>
        </CardContainer>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
          <div className="flex items-center">
            <label
              htmlFor="requestedNumber"
              className="mr-2 text-xs md:text-sm font-medium text-gray-700"
            >
              Requested Number
            </label>
            <div className="flex items-center justify-center h-8 w-12 rounded-sm border border-neutral-300 p-2 text-sm">
              <p>{allPlates.length}</p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-4 text-xs md:text-sm">
            <p>Total Selected:</p>
            <div className="flex items-center justify-center h-8 w-18 md:w-20 rounded-sm border border-neutral-300 p-2 text-xs md:text-sm">
              <span className="font-medium text-neutral-700">
                {totalSelectedPlates ?? "--"}{" "}
                <span className="text-gray-500 text-xs">of {totalPlates}</span>
              </span>
            </div>
            <div className={"flex flex-row items-center gap-2 text-sm"}>
              <ArrowButton
                classname={"hover:bg-neutral-100"}
                direction={"left"}
                onClick={() => {}}
              />
              <ArrowButton
                classname={"hover:bg-neutral-100"}
                direction={"right"}
                onClick={() => {}}
              />
            </div>
          </div>

          <Button onClick={handleAssignPlateSelected}>Assign</Button>
        </div>

        <PlateTable
          plates={allPlates}
          selectedPlates={selectedPlates}
          onSelectChange={handleSelectChange}
          onSelectAll={handleSelectAll}
        />
      </div>

      <ResponseModalX
        title={"Updated Successfully"}
        open={openModal}
        onClose={() => setOpenModal(false)}
        content={<>You have successfully updated the new request</>}
        status={"success"}
        footerBtnText={"Done"}
        footerTrigger={() => setOpenModal(false)}
      />
    </div>
  );
};

export default PlateSelectionPage;
