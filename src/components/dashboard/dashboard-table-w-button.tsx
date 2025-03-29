import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import { PaymentStatus, PlateNumberStatus } from "@/common/enum";

interface TableHeader {
  title: string;
  key: string;
}

interface TableData {
  [key: string]: string | number | Date | PaymentStatus | PlateNumberStatus;
}

interface RowAction {
  title: string;
  action: () => void;
}

type DataTableProps = {
  headers: TableHeader[];
  data: TableData[];
  itemsPerPage?: number;
  rowActions?: (row: TableData) => RowAction[];
};

// Utility function to check if a value is of type PaymentStatus
const isPaymentStatus = (value: unknown): value is PaymentStatus => {
  return Object.values(PaymentStatus).includes(value as PaymentStatus);
};

const isPlateNumberStatus = (value: unknown): value is PlateNumberStatus => {
  return Object.values(PlateNumberStatus).includes(value as PlateNumberStatus);
};

export function DataTableWButton({
  headers,
  data,
  itemsPerPage,
  rowActions,
}: DataTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead
              className="text-center font-semibold text-xs w-[100px]"
              key={String(header.key)}
            >
              {header.title}
            </TableHead>
          ))}
          <TableHead className="text-center text-xs w-[100px]">
            Actions
          </TableHead>
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
                      <p>
                        {format(cellValue.toDateString(), "LLL. d yyyy") ??
                          "--"}
                      </p>
                      <p className="font-light">
                        {format(cellValue.toDateString(), "hh:mm:ss a") ?? ""}
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
            <TableCell className="text-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="border border-neutral-300 p-2 rounded-md"
                    variant="ghost"
                    size="icon"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {rowActions &&
                    rowActions(row).map((action, idx) => (
                      <DropdownMenuItem
                        key={idx}
                        onClick={action.action}
                        className="cursor-pointer hover:bg-neutral-50"
                      >
                        {action.title}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
