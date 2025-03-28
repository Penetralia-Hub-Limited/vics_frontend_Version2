"use client";

// import { useState } from "react";
import DashboardCompSelect from "../../dashboard-component-select";

export const AddVehicleStep3 = () => {
  return (
    <div className={"flex flex-col gap-6 w-full"}>
      <DashboardCompSelect
        title={"Plate Number Type"}
        placeholder={"-- Select Plate Type --"}
        items={["Nigeria", "Camerron"]}
      />

      <DashboardCompSelect
        title={"Plate Number"}
        placeholder={"-- Select Plate Number --"}
        items={["Nigeria", "Camerron"]}
      />
    </div>
  );
};
