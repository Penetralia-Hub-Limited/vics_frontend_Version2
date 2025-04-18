import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { cn } from "@/lib/utils";

interface ILoading {
  screen: "main" | "default";
  size?: string | number;
  color?: string;
}

export default function Loading({ size, color = "#025F33", screen }: ILoading) {
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
