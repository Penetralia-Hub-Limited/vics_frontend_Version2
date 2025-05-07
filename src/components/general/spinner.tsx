import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { cn } from "@/lib/utils";

// import Spinner from 'react-bootstrap/Spinner'; downloaded from https://react-bootstrap.netlify.app/docs/components/spinners

interface ISpinner {
  screen: "main" | "default";
  size?: string | number;
  color?: string;
}

export default function Spinner({ size, color = "#025F33", screen }: ISpinner) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        screen === "main" && "h-screen"
      )}
    >
      <CircularProgress size={size} sx={{ color: color }} />
    </div>
  );
}
