import { FC, Dispatch, SetStateAction } from "react";
import InputWithLabel from "@/components/auth/input-comp";

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
      <InputWithLabel
        items={{
          id: "plateNumberType",
          label: "Plate Number Type",
          placeholder: "Plate Number Type",
          type: "text",
          htmlfor: "plateNumberType",
        }}
        value={inputValues.plateNumberType || ""}
        onChange={(e) =>
          setInputValues((prev) => ({
            ...prev,
            plateNumberType: e.target.value,
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
        value={inputValues.plateNumber || ""}
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
