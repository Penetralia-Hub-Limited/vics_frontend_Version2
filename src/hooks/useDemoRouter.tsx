"use client";

import { useState, useMemo } from "react";
import { Router } from "@toolpad/core/AppProvider";

export function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = useState<string>(() =>
    typeof window !== "undefined" ? window.location.pathname : initialPath
  );

  const router = useMemo(
    () => ({
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    }),
    [pathname]
  );

  return router;
}
