import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { PlateNumberData } from "@/store/plateNumber/plate-number-types";

interface PlateRowProps {
  plate: { sid: number } & PlateNumberData;
  onSelectChange: (
    plate: PlateNumberData & { sid: number },
    selected: boolean
  ) => void;
  isSelected: boolean;
}

const PlateRow: React.FC<PlateRowProps> = ({
  plate,
  onSelectChange,
  isSelected,
}) => {
  return (
    <tr className="plate-row border-b border-primary-300 last:border-0">
      <td className="py-4 pl-6 text-xs text-gray-600">{plate.sid}</td>
      <td className="py-4 pl-6 text-xs font-medium">{plate.number}</td>
      <td className="py-4 pl-6 text-xs text-gray-500">{plate.type}</td>
      <td className="py-4 pr-6 text-right">
        <label className="inline-flex items-center">
          <Checkbox
            checked={isSelected}
            onCheckedChange={(checked) => onSelectChange(plate, !!checked)}
            className={
              isSelected
                ? "bg-primary-500 border-green-500 data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500"
                : ""
            }
          />
          <span className="sr-only">Select plate {plate.number}</span>
        </label>
      </td>
    </tr>
  );
};

export default PlateRow;
