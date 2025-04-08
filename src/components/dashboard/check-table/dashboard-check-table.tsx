import React from "react";
import { IPlateData } from "@/common/types";
import PlateRow from "./dashboard-check-row";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface PlateTableProps {
  plates: IPlateData[];
  selectedPlates: Set<number>;
  onSelectChange: (plate: IPlateData, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
}

const PlateTable: React.FC<PlateTableProps> = ({
  plates,
  selectedPlates,
  onSelectChange,
  onSelectAll,
}) => {
  const allSelected =
    plates.length > 0 && selectedPlates.size === plates.length;
  const someSelected =
    selectedPlates.size > 0 && selectedPlates.size < plates.length;

  const tableHeader = [
    { label: "S/N", key: "sn" },
    { label: "Plate Number", key: "plateNumber" },
    { label: "Plate Type", key: "plateType" },
  ];

  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm animate-fade-in">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-secondary/50">
          <tr>
            {tableHeader.map((header) => (
              <th
                key={header.key}
                className="py-3.5 pl-6 text-left text-xs font-medium capitalize tracking-wider  bg-neutral-300"
              >
                {header.label}
              </th>
            ))}
            <th className="py-3.5 pr-6 text-right bg-neutral-300">
              <div className="flex items-center justify-end">
                <label className="inline-flex items-center">
                  <Checkbox
                    checked={allSelected}
                    data-state={
                      someSelected
                        ? "indeterminate"
                        : allSelected
                          ? "checked"
                          : "unchecked"
                    }
                    onCheckedChange={(checked) => onSelectAll(!!checked)}
                    className={cn("rounded-sm border-neutral-900")}
                  />
                  <span className="ml-2 text-xs font-medium capitalize tracking-wider">
                    Select all
                  </span>
                </label>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {plates.map((plate) => (
            <PlateRow
              key={plate.sn}
              plate={plate}
              isSelected={selectedPlates.has(plate.sn)}
              onSelectChange={onSelectChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlateTable;
