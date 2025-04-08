import { FC, Dispatch, SetStateAction } from "react";
import InputWithLabel from "@/components/auth/input-comp";

export const RecommendPlateNoRequestInitialValues = {
  mlaplaterequest: "",
  plateNumberType: "",
  availablePlateNumber: "",
  plateQty: "",
};

export interface RecommendPlateNoRequestProp {
  mlaplaterequest: string;
  plateNumberType: string;
  availablePlateNumber: string;
  plateQty: string;
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
          items={{
            id: "mlaplaterequest",
            label: "MLA Plate Request",
            placeholder: "MLA Plate Request",
            type: "text",
            htmlfor: "mlaplaterequest",
          }}
          value={input.mlaplaterequest}
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              mlaplaterequest: e.target.value,
            }))
          }
        />
        <InputWithLabel
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
              plateNumberType: e.target.value,
            }))
          }
        />
      </div>

      <InputWithLabel
        items={{
          id: "availablePlateNumber",
          label: "Number of Privvate Plate Number Available in the Store",
          placeholder: "Email Address",
          type: "number",
          htmlfor: "availablePlateNumber",
        }}
        value={input.availablePlateNumber}
        onChange={(e) =>
          setInput((prev) => ({
            ...prev,
            availablePlateNumber: e.target.value,
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
        value={input.plateQty}
        onChange={(e) =>
          setInput((prev) => ({
            ...prev,
            plateQty: e.target.value,
          }))
        }
      />
    </div>
  );
};
