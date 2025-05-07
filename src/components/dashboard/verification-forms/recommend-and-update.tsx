import { FC, Dispatch, SetStateAction } from "react";
import InputWithLabel from "@/components/auth/input-comp";
import { PlateNumberOrderType } from "@/common/enum";

export const RecommendPlateNoRequestInitialValues = {
  mlaplaterequest: undefined,
  plateNumberType: undefined,
  availablePlateNumber: undefined,
  plateQty: undefined,
};

export interface RecommendPlateNoRequestProp {
  mlaplaterequest: number | undefined;
  plateNumberType: PlateNumberOrderType | undefined;
  availablePlateNumber: number | undefined;
  plateQty: number | undefined;
}

interface IRecommendPlateNoRequest {
  input: RecommendPlateNoRequestProp;
  setInput: Dispatch<SetStateAction<RecommendPlateNoRequestProp>>;
}

export const RecommendPlateNoRequest: FC<IRecommendPlateNoRequest> = ({
  input,
  setInput,
}) => {
  return (
    <div className={"p-4 flex flex-col gap-5"}>
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-3"}>
        <InputWithLabel
          disabled
          items={{
            id: "mlaplaterequest",
            label: "MLA Plate Request",
            placeholder: "MLA Plate Request",
            type: "text",
            htmlfor: "mlaplaterequest",
          }}
          value={input.mlaplaterequest || 0}
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              mlaplaterequest: Number(e.target.value),
            }))
          }
        />
        <InputWithLabel
          disabled
          items={{
            id: "plateNumberType",
            label: "Plate Number Type",
            placeholder: "Plate Number Type",
            type: "text",
            htmlfor: "plateNumberType",
          }}
          value={input.plateNumberType}
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              plateNumberType: e.target.value as PlateNumberOrderType,
            }))
          }
        />
      </div>

      <InputWithLabel
        disabled
        items={{
          id: "availablePlateNumber",
          label: "Number of Private Plate Number Available in the Store",
          placeholder: "Plate Number Available in the Store",
          type: "number",
          htmlfor: "availablePlateNumber",
        }}
        value={input.availablePlateNumber || 0}
        onChange={(e) =>
          setInput((prev) => ({
            ...prev,
            availablePlateNumber: Number(e.target.value),
          }))
        }
      />

      <InputWithLabel
        min={0}
        items={{
          id: "plateQty",
          label: "Enter Quantity of Plates You Wish to Recommend",
          placeholder: "Plate Quantity",
          type: "number",
          htmlfor: "plateQty",
        }}
        value={input.plateQty ?? ""}
        onChange={(e) =>
          setInput((prev) => ({
            ...prev,
            plateQty: Number(e.target.value),
          }))
        }
      />
    </div>
  );
};
