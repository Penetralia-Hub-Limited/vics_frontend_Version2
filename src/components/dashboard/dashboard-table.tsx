import { FC } from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { PaymentStatus, PlateNumberStatus } from "@/common/enum";

interface TableHeader {
  title: string;
  key: string;
}

interface TableData {
  [key: string]: string | number | Date | PaymentStatus | PlateNumberStatus;
}

interface IDashboardTable {
  headers: TableHeader[];
  data: TableData[];
  itemsPerPage?: number;
}

const isPaymentStatus = (value: unknown): value is PaymentStatus => {
  return Object.values(PaymentStatus).includes(value as PaymentStatus);
};

const isPlateNumberStatus = (value: unknown): value is PlateNumberStatus => {
  return Object.values(PlateNumberStatus).includes(value as PlateNumberStatus);
};

const DashboardTable: FC<IDashboardTable> = ({
  headers,
  data,
  itemsPerPage,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead
              key={index}
              className="text-center font-semibold text-xs w-[100px]"
            >
              {header.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.slice(0, itemsPerPage).map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {headers.map((header, colIndex) => {
              const cellValue = row[header.key];

              return (
                <TableCell key={colIndex} className="text-xs text-center">
                  {/* Date Formatting */}
                  {cellValue instanceof Date ? (
                    <div className="flex flex-col gap-1">
                      <p>{format(cellValue.toDateString(), "LLL. d yyyy")}</p>
                      <p className="font-light">
                        {format(cellValue.toDateString(), "hh:mm:ss a")}
                      </p>
                    </div>
                  ) : isPaymentStatus(cellValue) ||
                    isPlateNumberStatus(cellValue) ? (
                    <span
                      className={cn(
                        "capitalize px-4 py-1 rounded-full",
                        cellValue === PaymentStatus.PAID ||
                          cellValue === PlateNumberStatus.ASSIGNED
                          ? "bg-success-100"
                          : "",
                        cellValue === PaymentStatus.UNPAID ||
                          cellValue === PlateNumberStatus.UNASSIGNED
                          ? "bg-failed"
                          : ""
                      )}
                    >
                      {cellValue}
                    </span>
                  ) : (
                    (cellValue?.toString() ?? "--")
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DashboardTable;
