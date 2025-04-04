import { FC, Dispatch, SetStateAction } from "react";
import DashboardCompSelect from "../../dashboard-component-select";
import { inputSalesPropsStep4 } from "../sales-constants";

interface INewPlateSalesStep4 {
  inputValues: inputSalesPropsStep4;
  setInputValues: Dispatch<SetStateAction<inputSalesPropsStep4>>;
}

export const NewPlateSalesStep4: FC<INewPlateSalesStep4> = ({
  inputValues,
  setInputValues,
}) => {
  return (
    <div className={"w-full"}>
      <DashboardCompSelect
        title={"Include Insurance"}
        placeholder={"-- Choose --"}
        items={["Insurance1", "Insurance2", "Insurance3"]}
        selected={inputValues.insurance}
        onSelect={(selected) =>
          setInputValues((prev) => ({
            ...prev,
            insurance: (selected as string) ?? "",
          }))
        }
      />
    </div>
  );
};
