"use client";

import { FC, Dispatch, SetStateAction } from "react";
import InputWithLabel from "@/components/auth/input-comp";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import { inputSalesPropsStep2 } from "../sales-constants";
import {
  VehicleModels,
  VehicleCategory,
  VehicleMakes,
  EngineCapacity,
  LoadWeight,
} from "@/common/enum";
import { generateYears } from "@/common/helpers";

interface INewPlateSalesStep2 {
  inputValues: inputSalesPropsStep2;
  setInputValues: Dispatch<SetStateAction<inputSalesPropsStep2>>;
}

export const NewPlateSalesStep2: FC<INewPlateSalesStep2> = ({
  inputValues,
  setInputValues,
}) => {
  return (
    <div className={"flex flex-col gap-6 w-full"}>
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
        <InputWithLabel
          items={{
            id: "chasis_number",
            label: "Chasis Number",
            placeholder: "Chasis Number",
            type: "text",
            htmlfor: "chasis_number",
            compulsory: true,
          }}
          value={inputValues.chasis_number}
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              chasis_number: e.target.value,
            }))
          }
        />

        <InputWithLabel
          items={{
            id: "engine_number",
            label: "Engine Number",
            placeholder: "Engine Number",
            type: "text",
            htmlfor: "engine_number",
            compulsory: true,
          }}
          value={inputValues.engine_number}
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              engine_number: e.target.value,
            }))
          }
        />
      </div>

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
        <DashboardCompSelect
          title={"Vehicle Model"}
          placeholder={"-- Select model --"}
          items={[...Object.values(VehicleModels)]}
          selected={inputValues.model}
          onSelect={(selected) =>
            setInputValues((prev) => ({
              ...prev,
              model: (selected as string) ?? "",
            }))
          }
        />

        <DashboardCompSelect
          title={"Vehicle Make"}
          placeholder={"-- Select Make --"}
          items={[...Object.values(VehicleMakes)]}
          selected={inputValues.make}
          onSelect={(selected) =>
            setInputValues((prev) => ({
              ...prev,
              make: (selected as string) ?? "",
            }))
          }
        />
      </div>

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
        <DashboardCompSelect
          title={"Model Year"}
          placeholder={"-- Select Year --"}
          items={generateYears()}
          selected={inputValues.year}
          onSelect={(selected) =>
            setInputValues((prev) => ({
              ...prev,
              year: (selected as string) ?? "",
            }))
          }
        />

        <DashboardCompSelect
          title={"Vehicle Category"}
          placeholder={"-- Select Category --"}
          items={[...Object.values(VehicleCategory)]}
          selected={inputValues.category}
          onSelect={(selected) =>
            setInputValues((prev) => ({
              ...prev,
              category: (selected as string) ?? "",
            }))
          }
        />
      </div>

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
        <InputWithLabel
          items={{
            id: "policy_sector",
            label: "Policy Sector",
            placeholder: "Policy Sector",
            type: "text",
            htmlfor: "policy_sector",
            compulsory: true,
          }}
          value={inputValues.policy_sector || ""}
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              policy_sector: e.target.value,
            }))
          }
        />

        <InputWithLabel
          items={{
            id: "color",
            label: "Vehicle Color",
            placeholder: "Vehicle Color",
            type: "text",
            htmlfor: "color",
            compulsory: true,
          }}
          value={inputValues.color || ""}
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              color: e.target.value,
            }))
          }
        />
      </div>

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
        <InputWithLabel
          items={{
            id: "capacity",
            label: "No. of Persons Vehicle Can Carry",
            placeholder: "0",
            type: "text",
            htmlfor: "capacity",
          }}
          value={inputValues.capacity || 0}
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              capacity: e.target.value ?? "",
            }))
          }
        />

        <InputWithLabel
          items={{
            id: "netweight",
            label: "Net Weight",
            placeholder: "Net Weight",
            type: "text",
            htmlfor: "netweight",
          }}
          value={inputValues.weight || ""}
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              weight: e.target.value,
            }))
          }
        />
      </div>

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
        <DashboardCompSelect
          title={"Vehicle Engine Capacity"}
          placeholder={"-- Select Engine Capacity --"}
          items={[...Object.values(EngineCapacity)]}
          selected={inputValues.engine_capacity}
          onSelect={(selected) =>
            setInputValues((prev) => ({
              ...prev,
              engine_capacity: (selected as string) ?? "",
            }))
          }
        />

        <DashboardCompSelect
          title={"Vehicle Load Weight"}
          placeholder={"-- Select Load Weight --"}
          items={[...Object.values(LoadWeight)]}
          selected={inputValues.load}
          onSelect={(selected) =>
            setInputValues((prev) => ({
              ...prev,
              load: (selected as string) ?? "",
            }))
          }
        />
      </div>
    </div>
  );
};
