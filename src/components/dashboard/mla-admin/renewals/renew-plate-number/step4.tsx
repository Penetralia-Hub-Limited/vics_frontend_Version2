import { FC, Dispatch, SetStateAction } from "react";
import { inputRenewPlateNumberPropsStep4 } from "./renew-plate-constant";
import CheckboxItem from "@/components/general/check-box";
import { formattedAmount } from "@/common/helpers";

interface IRenewPlateNumberStep4 {
  inputValues: inputRenewPlateNumberPropsStep4;
  setInputValues: Dispatch<SetStateAction<inputRenewPlateNumberPropsStep4>>;
}

const checkboxItems = [
  {
    id: "roadWorthyNess",
    label: "Road Worthyness/Computerized Vehicle - Private Car Up to 2200cc",
    price: 3500,
  },
  {
    id: "vehicleLicense",
    label:
      "Vehicle License - Private Vehicle Cars, Mini Buses, & Vvehicles Up to 3.0 - 4.0",
    price: 1500,
  },
  {
    id: "insurancePrivate",
    label: "Insurance Private",
    price: 15500,
  },
  {
    id: "renewalFee",
    label: "Motor Vehicle Ownership Renewal Fee",
    price: 1500,
  },
];

export const RenewPlateNumberStep4: FC<IRenewPlateNumberStep4> = ({
  inputValues,
  setInputValues,
}) => {
  const totalAmount = checkboxItems.reduce((acc, item) => {
    if (inputValues.selectedServices[item.id]) {
      return acc + item.price;
    }
    return acc;
  }, 0);

  return (
    <div className={"flex flex-col gap-6 w-full"}>
      <div className={"flex flex-col gap-4"}>
        {checkboxItems.map((item, index) => (
          <CheckboxItem
            key={index}
            label={item.label}
            id={item.id}
            amount={item.price}
            isChecked={inputValues.selectedServices[item.id] || false}
            onChange={(checked) => {
              setInputValues((prev) => ({
                ...prev,
                selectedServices: {
                  ...prev.selectedServices,
                  [item.id]: checked,
                },
              }));
            }}
          />
        ))}
      </div>

      <div className={"flex flex-row gap-5 ml-auto pt-3"}>
        <p className={"font-bold"}>Total:</p>
        <p className={"font-bold"}>{formattedAmount(totalAmount) ?? "--"}</p>
      </div>
    </div>
  );
};
