"use client";

import { FC, Dispatch, SetStateAction } from "react";
import InputWithLabel from "@/components/auth/input-comp";
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
          value={inputValues.category}
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              category: e.target.value,
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
      </div>
    </div>
  );
};
