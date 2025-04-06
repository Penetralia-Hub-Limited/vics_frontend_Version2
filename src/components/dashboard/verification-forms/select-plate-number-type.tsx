import { FC, Dispatch, SetStateAction } from "react";
import DashboardCompSelect from "../dashboard-component-select";
import { PlateNumberType, PlateNumberSubType } from "@/common/enum";
import InputWithLabel from "@/components/auth/input-comp";

export const PlateNumberInitialValues = {
  plateNumberType: undefined,
  plateNumberSubType: undefined,
  numberOfPlates: 0,
};

export type PlateNumberTypeProps = {
  plateNumberType: PlateNumberType | undefined;
  plateNumberSubType: PlateNumberSubType | undefined;
  numberOfPlates: number;
};

interface ICreatePlateNumber {
  input: PlateNumberTypeProps;
  setInput: Dispatch<SetStateAction<PlateNumberTypeProps>>;
}

export const CreatePlateNumber: FC<ICreatePlateNumber> = ({
  input,
  setInput,
}) => {
  return (
    <div className="flex flex-col gap-5 p-4">
      <DashboardCompSelect
        title={"Plate Number Type"}
        placeholder={"-- Select Status --"}
        items={[...Object.values(PlateNumberType)]}
        selected={input.plateNumberType}
        onSelect={(selected) =>
          setInput((prev) => ({
            ...prev,
            plateNumberType: selected as PlateNumberType,
          }))
        }
      />

      {input.plateNumberType && (
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-3"}>
          <DashboardCompSelect
            title={"Select Plate Number Sub. Type"}
            placeholder={"-- Select Type --"}
            items={[...Object.values(PlateNumberSubType)]}
            selected={input.plateNumberSubType}
            onSelect={(selected) =>
              setInput((prev) => ({
                ...prev,
                plateNumberSubType: selected as PlateNumberSubType,
              }))
            }
          />

          <InputWithLabel
            min={0}
            items={{
              id: "phoneNumber",
              label: "Phone Number",
              placeholder: "Phone Number",
              type: "number",
              htmlfor: "phoneNumber",
            }}
            value={input.numberOfPlates}
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                numberOfPlates: parseInt(e.target.value) || 0,
              }))
            }
          />
        </div>
      )}
    </div>
  );
};
