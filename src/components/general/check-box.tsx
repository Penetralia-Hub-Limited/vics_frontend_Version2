"use client";

import { FC } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { formattedAmount } from "@/common/helpers";

interface ICheckboxItem {
  label: string;
  id: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  amount?: number;
}

const CheckboxItem: FC<ICheckboxItem> = ({
  label,
  id,
  amount,
  isChecked,
  onChange,
}) => {
  return (
    <div className={"flex flex-row justify-between items-start"}>
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={isChecked}
          onCheckedChange={(checked) => onChange(!!checked)}
          id={id}
        />
        <label
          htmlFor={id}
          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      </div>

      {amount && (
        <div>
          <p className={"text-sm font-semibold"}>
            {formattedAmount(amount ?? undefined)}
          </p>
        </div>
      )}
    </div>
  );
};
export default CheckboxItem;
