"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, subDays } from "date-fns";

enum DateRange {
  TODAY = "today",
  YESTERDAY = "yesterday",
  LAST_7_DAYS = "last7",
  LAST_30_DAYS = "last30",
}

const DATE_RANGES: Record<DateRange, { label: string; range: [Date, Date] }> = {
  [DateRange.TODAY]: { label: "Today", range: [new Date(), new Date()] },
  [DateRange.YESTERDAY]: {
    label: "Yesterday",
    range: [subDays(new Date(), 1), subDays(new Date(), 1)],
  },
  [DateRange.LAST_7_DAYS]: {
    label: "Last 7 Days",
    range: [subDays(new Date(), 7), new Date()],
  },
  [DateRange.LAST_30_DAYS]: {
    label: "Last 30 Days",
    range: [subDays(new Date(), 30), new Date()],
  },
};

const SelectDateRange = () => {
  const [selectedRange, setSelectedRange] = useState<DateRange>(
    DateRange.TODAY
  );

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
