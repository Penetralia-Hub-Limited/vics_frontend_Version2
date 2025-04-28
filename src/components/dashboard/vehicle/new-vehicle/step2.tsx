import { FC, Dispatch, SetStateAction } from "react";
import InputWithLabel from "@/components/auth/input-comp";
import { IAddVehicleStep2Props } from "../vehicle-constant";

interface IAddVehicleStep2 {
  inputValues: IAddVehicleStep2Props;
  setInputValues: Dispatch<SetStateAction<IAddVehicleStep2Props>>;
}

export const AddVehicleStep2: FC<IAddVehicleStep2> = ({
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
        <InputWithLabel
          items={{
            id: "model",
            label: "Vehicle Modal",
            placeholder: "Vehicle Modal",
            type: "text",
            htmlfor: "model",
          }}
          value={inputValues.model}
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              model: e.target.value,
            }))
          }
        />

        <InputWithLabel
          items={{
            id: "make",
            label: "Vehicle Make",
            placeholder: "Vehicle Make",
            type: "text",
            htmlfor: "make",
          }}
          value={inputValues.make}
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              make: e.target.value,
            }))
          }
        />
        {/* <DashboardCompSelect
          title={"Vehicle Make"}
          placeholder={"-- Select make --"}
          items={["Nigeria", "Camerron"]}
          selected={inputValues.vehicleMake}
          onSelect={(selected) =>
            setInputValues((prev) => ({
              ...prev,
              vehicleMake: (selected as string) ?? "",
            }))
          }
        /> */}

        {/* <DashboardCompSelect
          title={"Vehicle Model"}
          placeholder={"-- Select model --"}
          items={["Nigeria", "Camerron"]}
          selected={inputValues.vehicleModel}
          onSelect={(selected) =>
            setInputValues((prev) => ({
              ...prev,
              vehicleModel: (selected as string) ?? "",
            }))
          }
        /> */}
      </div>

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
        <InputWithLabel
          items={{
            id: "year",
            label: "Model Year",
            placeholder: "Model Year",
            type: "text",
            htmlfor: "year",
          }}
          value={inputValues.year || ""}
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              year: e.target.value,
            }))
          }
        />

        <InputWithLabel
          items={{
            id: "vehicleCategory",
            label: "Vehicle Category",
            placeholder: "Vehicle Category",
            type: "text",
            htmlfor: "vehicleCategory",
          }}
          value={inputValues.capacity}
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              vehicleCategory: e.target.value,
            }))
          }
        />

        {/* <DashboardCompSelect
          title={"Model Year"}
          placeholder={"-- Select year --"}
          items={["Nigeria", "Camerron"]}
          selected={inputValues.modelYear}
          onSelect={(selected) =>
            setInputValues((prev) => ({
              ...prev,
              modelYear: (selected as string) ?? "",
            }))
          }
        />

        <DashboardCompSelect
          title={"Vehicle Category"}
          placeholder={"-- Select category --"}
          items={["Nigeria", "Camerron"]}
          selected={inputValues.vehicleCategory}
          onSelect={(selected) =>
            setInputValues((prev) => ({
              ...prev,
              vehicleCategory: (selected as string) ?? "",
            }))
          }
        /> */}
      </div>

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
        <InputWithLabel
          items={{
            id: "policy_sector",
            label: "Policy Sector",
            placeholder: "Policy Sector",
            type: "text",
            htmlfor: "policy_sector",
          }}
          value={inputValues.policy_sector || ""}
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              policy_sector: e.target.value,
            }))
          }
        />{" "}
        <InputWithLabel
          items={{
            id: "color",
            label: "Vehicle Color",
            placeholder: "Vehicle Color",
            type: "text",
            htmlfor: "color",
          }}
          value={inputValues.color || ""}
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              color: e.target.value,
            }))
          }
        />
        {/* <DashboardCompSelect
          title={"Policy Sector"}
          placeholder={"-- Select sector --"}
          items={["Nigeria", "Camerron"]}
          selected={inputValues.policySector}
          onSelect={(selected) =>
            setInputValues((prev) => ({
              ...prev,
              policySector: (selected as string) ?? "",
            }))
          }
        />

        <DashboardCompSelect
          title={"Vehicle Color"}
          placeholder={"-- Select color --"}
          items={["Nigeria", "Camerron"]}
          selected={inputValues.vehicleColor}
          onSelect={(selected) =>
            setInputValues((prev) => ({
              ...prev,
              vehicleColor: (selected as string) ?? "",
            }))
          }
        /> */}
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
          value={inputValues.netweight || ""}
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              netweight: e.target.value,
            }))
          }
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
          value={inputValues.vehicleenginecapacity}
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              vehicleenginecapacity: e.target.value,
            }))
          }
        />

        <InputWithLabel
          items={{
            id: "load",
            label: "Vehicle Load Weight",
            placeholder: "Vehicle Load Weight",
            type: "text",
            htmlfor: "load",
          }}
          value={inputValues.load || ""}
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              load: e.target.value,
            }))
          }
        />
        {/* <DashboardCompSelect
          title={"Vehicle Load Weight"}
          placeholder={"-- Select Load Weight --"}
          items={["Nigeria", "Camerron"]}
          selected={inputValues.vehicleLoad}
          onSelect={(selected) =>
            setInputValues((prev) => ({
              ...prev,
              vehicleLoad: (selected as string) ?? "",
            }))
          }
        /> */}
      </div>
    </div>
  );
};
