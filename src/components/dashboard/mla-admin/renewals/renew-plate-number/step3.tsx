import { FC, Dispatch, SetStateAction } from "react";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import { inputRenewPlateNumberPropsStep3 } from "./renew-plate-constant";
import InputWithLabel from "@/components/auth/input-comp";

interface IRenewPlateNumberStep3 {
  inputValues: inputRenewPlateNumberPropsStep3;
  setInputValues: Dispatch<SetStateAction<inputRenewPlateNumberPropsStep3>>;
}

export const RenewPlateNumberStep3: FC<IRenewPlateNumberStep3> = ({
  inputValues,
  setInputValues,
}) => {
  return (
    <div className={"flex flex-col gap-6 w-full"}>
      <DashboardCompSelect
        title={"Plate Number Type"}
        placeholder={"-- Select Plate Type --"}
        items={["Nigeria", "Camerron"]}
        selected={inputValues.plateNumberType}
        onSelect={(selected) =>
          setInputValues((prev) => ({
            ...prev,
            plateNumberType: (selected as string) ?? "",
          }))
        }
      />

      <InputWithLabel
        items={{
          id: "plateNumber",
          label: "Plate Number",
          placeholder: "Plate Number",
          type: "text",
          htmlfor: "plateNumber",
        }}
        value={inputValues.plateNumber}
        onChange={(e) =>
          setInputValues((prev) => ({
            ...prev,
            plateNumber: e.target.value,
          }))
        }
      />
    </div>
  );
};
