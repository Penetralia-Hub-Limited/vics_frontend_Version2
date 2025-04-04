import { FC, Dispatch, SetStateAction } from "react";
import InputWithLabel from "@/components/auth/input-comp";
import DashboardCompSelect from "../../dashboard-component-select";
import { inputSalesPropsStep2 } from "../sales-constants";

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
            id: "chasisnumber",
            label: "Chasis Number",
            placeholder: "Chasis Number",
            type: "text",
            htmlfor: "chasisnumber",
          }}
          value={inputValues.chasisnumber}
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              chasisnumber: e.target.value,
            }))
          }
        />

        <InputWithLabel
          items={{
            id: "enginenumber",
            label: "Engine Number",
            placeholder: "Engine Number",
            type: "text",
            htmlfor: "enginenumber",
          }}
          value={inputValues.enginenumber}
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              enginenumber: e.target.value,
            }))
          }
        />
      </div>

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
        <DashboardCompSelect
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
        />

        <DashboardCompSelect
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
        />
      </div>

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
        <DashboardCompSelect
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
        />
      </div>

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
        <DashboardCompSelect
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
          value={inputValues.novehiclecapacity}
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              novehiclecapacity: parseInt(e.target.value) || 0,
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
          value={inputValues.netweight}
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

        <DashboardCompSelect
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
        />
      </div>
    </div>
  );
};
