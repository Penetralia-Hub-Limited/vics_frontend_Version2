import React from "react";
import { IPlateData } from "@/common/types";
import { Checkbox } from "@/components/ui/checkbox";

interface PlateRowProps {
  plate: IPlateData;
  onSelectChange: (plate: IPlateData, selected: boolean) => void;
  isSelected: boolean;
}

const PlateRow: React.FC<PlateRowProps> = ({
  plate,
  onSelectChange,
  isSelected,
}) => {
  return (
    <tr className="plate-row border-b border-gray-200">
      <td className="py-4 pl-6 text-xs text-gray-600">{plate.sn}</td>
      <td className="py-4 pl-6 text-xs font-medium">{plate.plateNumber}</td>
      <td className="py-4 pl-6 text-xs text-gray-500">{plate.plateType}</td>
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
          <span className="sr-only">Select plate {plate.plateNumber}</span>
        </label>
      </td>
    </tr>
  );
};

export default PlateRow;
