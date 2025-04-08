import { FC, Dispatch, SetStateAction } from "react";
import DashboardCompSelect from "../../dashboard-component-select";
import { inputSalesPropsStep3 } from "../sales-constants";

interface INewPlateSalesStep3 {
  inputValues: inputSalesPropsStep3;
  setInputValues: Dispatch<SetStateAction<inputSalesPropsStep3>>;
}

export const NewPlateSalesStep3: FC<INewPlateSalesStep3> = ({
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

      <DashboardCompSelect
        title={"Plate Number"}
        placeholder={"-- Select Plate Number --"}
        items={["Nigeria", "Camerron"]}
        selected={inputValues.plateNumber}
        onSelect={(selected) =>
          setInputValues((prev) => ({
            ...prev,
            plateNumber: (selected as string) ?? "",
          }))
        }
      />
    </div>
  );
};
