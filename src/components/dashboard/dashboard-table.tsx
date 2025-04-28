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
import {
  PaymentStatus,
  PlateNumberStatus,
  Role,
  UserStatus,
  ApprovalStatus,
  CardStatus,
  PlateStatus,
  RequestStatus,
} from "@/common/enum";

interface TableHeader {
  title: string;
  key: string;
}

interface TableData {
  [key: string]:
    | null
    | undefined
    | string
    | number
    | boolean
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

interface IDashboardTable {
  headers: TableHeader[];
  data: TableData[];
  itemsPerPage?: number;
}

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

const isRequestStatus = (value: unknown): value is RequestStatus => {
  return Object.values(RequestStatus).includes(value as RequestStatus);
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
          {headers.map((header) => (
            <TableHead
              className="text-center font-semibold text-xs w-[100px]"
              key={String(header.key)}
            >
              {header.title}
            </TableHead>
          ))}
          <TableHead className="text-center text-xs w-[60px]">{""}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={headers.length} className="text-center">
              No data available
            </TableCell>
          </TableRow>
        ) : (
          data?.slice(0, itemsPerPage)?.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map((header, colIndex) => {
                const cellValue = row[header.key];

                return (
                  <TableCell key={colIndex} className="text-xs text-center">
                    {/* Date Formatting */}
                    {cellValue instanceof Date ? (
                      <div className="flex flex-col gap-1">
                        <p>{format(cellValue.toDateString(), "LLL. d")}</p>
                        <p className="font-light">
                          {format(cellValue.toDateString(), "hh:mm:ss a")}
                        </p>
                      </div>
                    ) : isPaymentStatus(cellValue) ||
                      isPlateNumberStatus(cellValue) ||
                      isUserRole(cellValue) ||
                      isUserStatus(cellValue) ||
                      isApprovalStatus(cellValue) ||
                      isCardStatus(cellValue) ||
                      isPlateStatus(cellValue) ||
                      isRequestStatus(cellValue) ? (
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
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default DashboardTable;
