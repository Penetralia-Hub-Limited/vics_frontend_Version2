import { useState, useEffect } from "react";
import _ from "lodash";
import { isWithinInterval } from "date-fns";

type DateRange = {
  startDate?: Date;
  endDate?: Date;
};

type FilterOptions = Record<string, string>;

export function useFilteredData<T>(
  data: T[],
  filters: FilterOptions,
  dateRange?: DateRange,
  dateFieldName?: keyof T
) {
  const [filteredData, setFilteredData] = useState<T[]>(data);

  type MatchMode = "all" | "any";

  const matchMode: MatchMode = "all";

  useEffect(() => {
    let result = data;

    if (filters && Object.keys(filters).length > 0) {
      result = result.filter((item) => {
        const comparisons = Object.entries(filters).map(([field, value]) => {
          if (_.isEmpty(_.trim(value))) return true; // Ignore empty filters
          return (
            _.toLower(String(item[field as keyof T] || "")) === _.toLower(value)
          );
        });

        return matchMode === "all"
          ? comparisons.every(Boolean)
          : comparisons.some(Boolean);
      });
    }

    if (dateRange?.startDate && dateRange?.endDate && dateFieldName) {
      result = result.filter((item) => {
        const itemDate = new Date(item[dateFieldName] as unknown as string);
        return isWithinInterval(itemDate, {
          start: dateRange.startDate!,
          end: dateRange.endDate!,
        });
      });
    }

    setFilteredData(result);
  }, [data, filters, dateRange, dateFieldName, matchMode]);

  return filteredData;
}
