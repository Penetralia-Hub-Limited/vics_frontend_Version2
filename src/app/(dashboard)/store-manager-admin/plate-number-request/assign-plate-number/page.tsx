"use client";

import React, { useState, useEffect } from "react";
import PlateTable from "@/components/dashboard/check-table/dashboard-check-table";
import ArrowButton from "@/components/general/arrow-button";
import { IPlateData } from "@/common/types";
import { Button } from "@/components/ui/button";
import DashboardPath from "@/components/dashboard/dashboard-path";
import CardContainer from "@/components/general/card-container";
import { DashboardSVG, VICSSVG } from "@/common/svgs";

const generatePlates = (): IPlateData[] => {
  return [
    { sn: 1, plateNumber: "ASA113JK", plateType: "Private (Direct)" },
    { sn: 2, plateNumber: "ASA114JK", plateType: "Private (Direct)" },
    { sn: 3, plateNumber: "ASA115JK", plateType: "Private (Direct)" },
    { sn: 4, plateNumber: "ASA116JK", plateType: "Private (Direct)" },
    { sn: 5, plateNumber: "ASA117JK", plateType: "Private (Direct)" },
    { sn: 6, plateNumber: "ASA118JK", plateType: "Private (Direct)" },
    { sn: 7, plateNumber: "ASA119JK", plateType: "Private (Direct)" },
    { sn: 8, plateNumber: "ASA120JK", plateType: "Private (Direct)" },
    { sn: 9, plateNumber: "ASA121JK", plateType: "Private (Direct)" },
    { sn: 10, plateNumber: "ASA122JK", plateType: "Private (Direct)" },
    { sn: 11, plateNumber: "ASA123JK", plateType: "Private (Direct)" },
    { sn: 12, plateNumber: "ASA124JK", plateType: "Private (Direct)" },
  ];
};

const PlateSelectionPage: React.FC = () => {
  const [allPlates, setAllPlates] = useState<IPlateData[]>([]);
  const [selectedPlates, setSelectedPlates] = useState<Set<number>>(new Set());

  // Initialize plates data
  useEffect(() => {
    const plates = generatePlates();
    setAllPlates(plates);
  }, []);

  const totalPlates = allPlates.length;
  const totalSelectedPlates = selectedPlates.size;

  const handleSelectChange = (plate: IPlateData, selected: boolean) => {
    const newSelectedPlates = new Set(selectedPlates);

    if (selected) {
      newSelectedPlates.add(plate.sn);
    } else {
      newSelectedPlates.delete(plate.sn);
    }

    setSelectedPlates(newSelectedPlates);
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      const allSNs = new Set(allPlates.map((plate) => plate.sn));
      setSelectedPlates(allSNs);
    } else {
      setSelectedPlates(new Set());
    }
  };

  return (
    <div className="flex flex-col gap-8 mx-auto w-full max-w-7xl">
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
          <div className="grid grid-cols-1 md:grid-cols-[2.5fr_auto] gap-4 items-end">
            <div className={"flex flex-col gap-3"}>
              <p className={"font-semibold"}>
                Enter the number of the plate you wish to assign
              </p>
              <div
                className={
                  "grid grid-cols-[3fr_1fr] items-center jusity-between border border-neutral-300 rounded-md"
                }
              >
                <input
                  type={"text"}
                  placeholder={"placeholder"}
                  className={"border-0 p-3 focus:none w-full text-sm ring-0"}
                />
                <p className={"px-2 text-sm font-semibold ml-auto"}>
                  of {allPlates.length} plates in store
                </p>
              </div>
            </div>
            <Button>Assign Plate Numbers</Button>
          </div>
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

          <Button onClick={() => {}}>Assign</Button>
        </div>

        <PlateTable
          plates={allPlates}
          selectedPlates={selectedPlates}
          onSelectChange={handleSelectChange}
          onSelectAll={handleSelectAll}
        />
      </div>
    </div>
  );
};

export default PlateSelectionPage;
