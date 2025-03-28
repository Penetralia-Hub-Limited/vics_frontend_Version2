"use client";

// import { useState } from "react";
import InputWithLabel from "@/components/auth/input-comp";
import DashboardCompSelect from "../../dashboard-component-select";

export const AddVehicleStep2 = () => {
  // const [dob, setDOB] = useState<Date | undefined>();

  return (
    <div className={"flex flex-col gap-6 w-full"}>
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
        <InputWithLabel
          items={{
            id: "chasisnumber",
            label: "Chasis Number",
            placeholder: "Chasis Number",
            type: "text",
            htmlfor: "chasisnumber",
          }}
        />

        <InputWithLabel
          items={{
            id: "enginenumber",
            label: "Engine Number",
            placeholder: "Engine Number",
            type: "text",
            htmlfor: "enginenumber",
          }}
        />
      </div>

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
        <DashboardCompSelect
          title={"Vehicle Make"}
          placeholder={"-- Select make --"}
          items={["Nigeria", "Camerron"]}
        />

        <DashboardCompSelect
          title={"Vehicle Model"}
          placeholder={"-- Select model --"}
          items={["Nigeria", "Camerron"]}
        />
      </div>

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
        <DashboardCompSelect
          title={"Model Year"}
          placeholder={"-- Select year --"}
          items={["Nigeria", "Camerron"]}
        />

        <DashboardCompSelect
          title={"Vehicle Category"}
          placeholder={"-- Select category --"}
          items={["Nigeria", "Camerron"]}
        />
      </div>

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
        <DashboardCompSelect
          title={"Policy Sector"}
          placeholder={"-- Select sector --"}
          items={["Nigeria", "Camerron"]}
        />

        <DashboardCompSelect
          title={"Vehicle Color"}
          placeholder={"-- Select color --"}
          items={["Nigeria", "Camerron"]}
        />
      </div>

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
        <InputWithLabel
          min={0}
          items={{
            id: "novehiclecapacity",
            label: "No. of Persons Vehicle Can Carry",
            placeholder: "0",
            type: "number",
            htmlfor: "novehiclecapacity",
          }}
        />

        <InputWithLabel
          items={{
            id: "netweight",
            label: "Net Weight",
            placeholder: "Net Weight",
            type: "text",
            htmlfor: "netweight",
          }}
        />
      </div>

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
        <InputWithLabel
          items={{
            id: "vehicleenginecapacity",
            label: "Vehicle Engine Capacity",
            placeholder: "Vehicle Engine Capacity",
            type: "text",
            htmlfor: "vehicleenginecapacity",
          }}
        />

        <DashboardCompSelect
          title={"Vehicle Load Weight"}
          placeholder={"-- Select Load Weight --"}
          items={["Nigeria", "Camerron"]}
        />
      </div>
    </div>
  );
};
