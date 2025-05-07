import { FC, Dispatch, SetStateAction } from "react";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import { inputRenewPlateNumberPropsStep3 } from "./renew-plate-constant";
import InputWithLabel from "@/components/auth/input-comp";
import { PlateNumberType } from "@/common/enum";

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
        items={[...Object.values(PlateNumberType)]}
        selected={inputValues.type}
        onSelect={(selected) =>
          setInputValues((prev) => ({
            ...prev,
            type: (selected as string) ?? "",
          }))
        }
      />

      <InputWithLabel
        items={{
          id: "number",
          label: "Plate Number",
          placeholder: "Plate Number",
          type: "text",
          htmlfor: "number",
        }}
        value={inputValues.number}
        onChange={(e) =>
          setInputValues((prev) => ({
            ...prev,
            number: e.target.value,
          }))
        }
      />
    </div>
  );
};
