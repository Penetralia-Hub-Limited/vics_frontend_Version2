import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <div className={"h-screen flex items-center justify-center"}>
      <CircularProgress sx={{ color: "#025F33" }} />
    </div>
  );
}
