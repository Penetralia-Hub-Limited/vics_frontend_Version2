import { FC, Dispatch, SetStateAction } from "react";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import { PlateNumberType, PlateNumberSubType } from "@/common/enum";
import InputWithLabel from "@/components/auth/input-comp";

export const CreatePlateRequestInitialValues = {
  plateNumberType: undefined,
  plateNumberSubType: undefined,
  noofplates: 0,
};

export type CreatePlateRequestProps = {
  plateNumberType: PlateNumberType | undefined;
  plateNumberSubType: PlateNumberSubType | undefined;
  noofplates: number;
};

interface ICreateNewStock {
  input: CreatePlateRequestProps;
  setInput: Dispatch<SetStateAction<CreatePlateRequestProps>>;
}

export const CreateNewPlatRequest: FC<ICreateNewStock> = ({
  input,
  setInput,
}) => {
  return (
    <div className="flex flex-col gap-5 p-4">
      <DashboardCompSelect
        title={"Plate Number Type"}
        placeholder={"-- Select Type --"}
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
        <div className={"flex flex-col w-full gap-6"}>
          <p className="font-semibold mx-auto">
            Enter plate Number Type Information
          </p>

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
                id: "noofplates",
                label: "Number of Plates",
                placeholder: "Enter Number of Plates",
                type: "number",
                htmlfor: "noofplates",
              }}
              value={input.noofplates}
              onChange={(e) =>
                setInput((prev) => ({
                  ...prev,
                  noofplates: parseInt(e.target.value) || 0,
                }))
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};
