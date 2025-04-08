import { FC } from "react";
import { cn } from "@/lib/utils";
import { formattedAmount } from "@/common/helpers";

interface IAmountDisplay {
  amount: number;
}

export const AmountDisplay: FC<IAmountDisplay> = ({ amount }) => {
  return (
    <div className={cn("flex flex-row justify-end")}>
      <div
        className={cn(
          "flex items-center justify-center py-3 px-6py-3 px-6 border-1 border-primary-500"
        )}
      >
        <p className="text-sm font-semibold">Total Amount</p>
      </div>
      <div
        className={cn(
          "flex items-center justify-center py-3 px-6 bg-primary-500"
        )}
      >
        <p className="font-semibold text-sm text-white">
          {formattedAmount(amount)}
        </p>
      </div>
    </div>
  );
};
