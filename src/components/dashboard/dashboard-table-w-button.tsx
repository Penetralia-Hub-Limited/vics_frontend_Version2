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
import {
  PaymentStatus,
  PlateNumberStatus,
  Role,
  UserStatus,
  ApprovalStatus,
  CardStatus,
  PlateStatus,
} from "@/common/enum";
import CircularProgress from "@mui/material/CircularProgress";
import Loading from "@/app/(dashboard)/loading";

interface TableHeader {
  title: string;
  key: string;
}

export interface TableData {
  [key: string]:
    | null
    | undefined
    | string
    | number
    | Date
    | PaymentStatus
    | PlateNumberStatus
    | Role
    | UserStatus
    | ApprovalStatus
    | CardStatus
    | PlateStatus
    | object;
}

export interface RowAction {
  title: string;
  action: () => void;
  rowData?: TableData;
}

type DataTableProps = {
  headers: TableHeader[];
  data: TableData[];
  itemsPerPage?: number;
  rowActions?: (row: TableData) => RowAction[];
  isLoading?: boolean;
};

// Utility function to check if a value is of type PaymentStatus
const isPaymentStatus = (value: unknown): value is PaymentStatus => {
  return Object.values(PaymentStatus).includes(value as PaymentStatus);
};

const isPlateNumberStatus = (value: unknown): value is PlateNumberStatus => {
  return Object.values(PlateNumberStatus).includes(value as PlateNumberStatus);
};

const isUserRole = (value: unknown): value is Role => {
  return Object.values(Role).includes(value as Role);
};

const isUserStatus = (value: unknown): value is UserStatus => {
  return Object.values(UserStatus).includes(value as UserStatus);
};

const isApprovalStatus = (value: unknown): value is ApprovalStatus => {
  return Object.values(ApprovalStatus).includes(value as ApprovalStatus);
};

const isCardStatus = (value: unknown): value is CardStatus => {
  return Object.values(CardStatus).includes(value as CardStatus);
};

const isPlateStatus = (value: unknown): value is PlateStatus => {
  return Object.values(PlateStatus).includes(value as PlateStatus);
};

export function DataTableWButton({
  headers,
  data,
  itemsPerPage,
  rowActions,
  isLoading,
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
          <TableHead className="text-center text-xs w-[100px]">{""}</TableHead>
        </TableRow>
      </TableHeader>
      {data.length === 0 ? (
        <TableBody>
          <TableRow className="flex items-center justify-center">
            <TableCell>
              <Loading screen="default" size={30} />
            </TableCell>
          </TableRow>
        </TableBody>
      ) : (
        <TableBody>
          {data?.slice(0, itemsPerPage).map((row, rowIndex) => (
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
                      isPlateNumberStatus(cellValue) ||
                      isUserRole(cellValue) ||
                      isUserStatus(cellValue) ||
                      isApprovalStatus(cellValue) ||
                      isCardStatus(cellValue) ||
                      isPlateStatus(cellValue) ? (
                      <span
                        className={cn(
                          "capitalize px-4 py-1 rounded-full",
                          (cellValue === PaymentStatus.PAID ||
                            cellValue === PlateNumberStatus.ASSIGNED ||
                            cellValue === UserStatus.ACTIVE ||
                            cellValue === ApprovalStatus.APPROVED) &&
                            "bg-success-100 text-primary-800",
                          (cellValue === PaymentStatus.NOTPAID ||
                            cellValue === PlateNumberStatus.UNASSIGNED ||
                            cellValue === UserStatus.DEACTIVATED ||
                            cellValue === ApprovalStatus.NOTAPPROVED) &&
                            "bg-failed text-red-800",
                          (cellValue === PlateStatus.SOLD ||
                            cellValue === CardStatus.PENDING) &&
                            "text-pending-800 bg-pending-100",
                          isUserRole(cellValue) && "bg-role text-white"
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
                      className="border border-primary-300 p-2 rounded-md"
                      variant="ghost"
                      size="icon"
                    >
                      {isLoading && rowIndex + 1 === row.id ? (
                        <CircularProgress />
                      ) : (
                        <MoreHorizontal className="h-5 w-5" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {rowActions &&
                      rowActions(row).map((action, idx) => (
                        <DropdownMenuItem
                          key={idx}
                          onClick={action.action}
                          className={
                            "flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-50"
                          }
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
      )}
    </Table>
  );
}
