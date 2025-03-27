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
                {header.key === "Date" && row[header.key] instanceof Date ? (
                  <div className={"flex flex-col gap-1"}>
                    <p>
                      {format(row[header.key] as Date, "LLL. d yyyy") ?? "--"}
                    </p>
                    <p className={"font-light"}>
                      {format(row[header.key] as Date, "hh:mm:ss a") ?? ""}
                    </p>
                  </div>
                ) : (
                  (row[header.key]?.toString() ?? "--")
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DashboardTable;
