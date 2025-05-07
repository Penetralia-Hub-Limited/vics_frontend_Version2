import React from "react";
import PlateRow from "./dashboard-check-row";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { PlateNumberData } from "@/store/plateNumber/plate-number-types";

interface PlateTableProps {
  plates: (PlateNumberData & { sid: number })[];
  selectedPlates: (PlateNumberData & { sid: number })[];
  onSelectChange: (
    plate: PlateNumberData & { sid: number },
    selected: boolean
  ) => void;
  onSelectAll: (selected: boolean) => void;
}

const PlateTable: React.FC<PlateTableProps> = ({
  plates,
  selectedPlates,
  onSelectChange,
  onSelectAll,
}) => {
  const allSelected =
    plates.length > 0 &&
    plates.every((plate) =>
      selectedPlates.some((selected) => selected.sid === plate.sid)
    );
  const someSelected = selectedPlates.length > 0 && !allSelected;

  const tableHeader = [
    { label: "S/N", key: "sid" },
    { label: "Plate Number", key: "number" },
    { label: "Plate Type", key: "type" },
  ];

  return (
    <div className="w-full overflow-hidden rounded-lg border border-primary-300 bg-white animate-fade-in">
      <table className="w-full">
        <thead>
          <tr>
            {tableHeader.map((header) => (
              <th
                key={header.key}
                className="py-3.5 pl-6 text-left text-xs font-medium capitalize tracking-wider bg-primary-100"
              >
                {header.label}
              </th>
            ))}
            <th className="py-3.5 pr-6 text-right bg-primary-100">
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
                    className={cn("rounded-sm border-primary-500")}
                  />
                  <span className="ml-2 text-xs font-medium capitalize tracking-wider">
                    Select all
                  </span>
                </label>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {plates.length === 0 ? (
            <tr>
              <td
                colSpan={tableHeader.length + 1}
                className="font-semibold text-sm py-4 text-center"
              >
                No data available
              </td>
            </tr>
          ) : (
            plates.map((plate) => (
              <PlateRow
                key={plate.sid}
                plate={plate}
                isSelected={selectedPlates.some(
                  (selected) => selected.sid === plate.sid
                )}
                onSelectChange={onSelectChange}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PlateTable;
