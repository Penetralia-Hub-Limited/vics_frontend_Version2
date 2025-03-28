import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { PaymentStatus } from "@/common/enum";

interface TableHeader {
  title: string;
  key: string;
}

interface TableData {
  [key: string]: string | number | Date | PaymentStatus;
}

interface IDashboardTable {
  headers: TableHeader[];
  data: TableData[];
  itemsPerPage?: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isPaymentStatus = (value: any): value is PaymentStatus => {
  return Object.values(PaymentStatus).includes(value as PaymentStatus);
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
                      <p>{format(cellValue, "LLL. d yyyy")}</p>
                      <p className="font-light">
                        {format(cellValue, "hh:mm:ss a")}
                      </p>
                    </div>
                  ) : isPaymentStatus(cellValue) ? (
                    <span
                      className={`capitalize px-3 py-1 rounded-full ${
                        cellValue === PaymentStatus.PAID
                          ? "bg-success-100"
                          : cellValue === PaymentStatus.PENDING
                            ? "bg-pending"
                            : "bg-failed"
                      }`}
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
