
"use client";
import { FC } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const RenewalActionButton: FC = () => {
  return (
    <button className="p-2 rounded-full hover:bg-neutral-200">
      <MoreHorizIcon fontSize="small" />
    </button>
  );
};

export default RenewalActionButton;
