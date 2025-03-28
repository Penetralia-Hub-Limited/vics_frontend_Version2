
import { FC } from "react";

interface Props {
  status: "Paid" | "Pending";
}

const StatusBadge: FC<Props> = ({ status }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        status === "Paid"
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
