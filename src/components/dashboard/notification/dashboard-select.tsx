"use client";

import { FC, Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { DateRange } from "@/common/enum";
import { DATE_RANGES } from "@/common/helpers";

interface ISelectDateRange {
  selectedRange: DateRange;
  setSelectedRange: Dispatch<SetStateAction<DateRange>>;
}

const SelectDateRange: FC<ISelectDateRange> = ({
  selectedRange,
  setSelectedRange,
}) => {
  const handleSelect = (value: DateRange) => {
    setSelectedRange(value);
    console.log(
      `Selected Range: ${format(DATE_RANGES[value].range[0], "PPP")} - ${format(DATE_RANGES[value].range[1], "PPP")}`
    );
  };

  return (
    <Select onValueChange={handleSelect} defaultValue={selectedRange}>
      <SelectTrigger className="text-neutral-700 w-fit">
        <SelectValue placeholder="Select Date Range">
          {DATE_RANGES[selectedRange].label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(DATE_RANGES).map(([key, { label }]) => (
          <SelectItem key={key} value={key}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectDateRange;
