import { FC, Dispatch, SetStateAction } from "react";
import DashboardCompSelect from "../../dashboard-component-select";

export type IAddVehicleStep3Props = {
  plateNumber: string;
  plateNumberType: string;
};

interface IAddVehicleStep3 {
  inputValues: IAddVehicleStep3Props;
  setInputValues: Dispatch<SetStateAction<IAddVehicleStep3Props>>;
}

export const AddVehicleStep3: FC<IAddVehicleStep3> = ({
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
