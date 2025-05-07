import { FC, Dispatch, SetStateAction } from "react";
import InputWithLabel from "@/components/auth/input-comp";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import { inputRenewPlateNumberPropsStep2 } from "./renew-plate-constant";
import {
  VehicleModels,
  VehicleCategory,
  VehicleMakes,
  EngineCapacity,
  LoadWeight,
} from "@/common/enum";
import { generateYears } from "@/common/helpers";

interface IRenewPlateNumberStep2 {
  inputValues: inputRenewPlateNumberPropsStep2;
  setInputValues: Dispatch<SetStateAction<inputRenewPlateNumberPropsStep2>>;
}

export const RenewPlateNumberStep2: FC<IRenewPlateNumberStep2> = ({
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
          value={inputValues.chasis_number ?? ""}
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
          }}
          value={inputValues.engine_number ?? ""}
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
          title={"Vehicle Make"}
          placeholder={"-- Select make --"}
          items={[...Object.values(VehicleMakes)]}
          selected={inputValues.make}
          onSelect={(selected) =>
            setInputValues((prev) => ({
              ...prev,
              make: (selected as string) ?? "",
            }))
          }
        />

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
      </div>

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
        <DashboardCompSelect
          title={"Model Year"}
          placeholder={"-- Select year --"}
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
          placeholder={"-- Select category --"}
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
        <DashboardCompSelect
          title={"Policy Sector"}
          placeholder={"-- Select sector --"}
          items={["Individual", "Group"]}
          selected={inputValues.policy_sector}
          onSelect={(selected) =>
            setInputValues((prev) => ({
              ...prev,
              policy_sector: (selected as string) ?? "",
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
          value={inputValues.color ?? ""}
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
          min={0}
          items={{
            id: "capacity",
            label: "No. of Persons Vehicle Can Carry",
            placeholder: "0",
            type: "number",
            htmlfor: "capacity",
          }}
          value={inputValues.capacity ?? ""}
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              capacity: e.target.value ?? "",
            }))
          }
        />

        <InputWithLabel
          items={{
            id: "weight",
            label: "Net Weight",
            placeholder: "Net Weight",
            type: "text",
            htmlfor: "weight",
          }}
          value={inputValues.weight ?? ""}
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
