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

interface TableHeader {
  title: string;
  key: string;
}

export interface TableColumn {
  key: string;
  title: string;
}

interface TableData {
  [key: string]: string | number | Date;
}

interface IDashboardTable {
  headers: TableHeader[];
  data: TableData[];
  itemsPerPage?: number;
}

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
            {headers.map((header, colIndex) => (
              <TableCell key={colIndex} className="text-xs text-center">
                {header.key === "date" && row[header.key] instanceof Date
                  ? format(row[header.key] as Date, "LLL. d yyyy hh:mm:ss a")
                  : row[header.key]?.toString()}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DashboardTable;
