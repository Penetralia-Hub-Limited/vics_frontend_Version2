"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toast } from "sonner";

function normalizeRole(role: string): string {
  return role.toLowerCase().replace(/\s+/g, "-");
}

export const useRoleAccess = () => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state?.auth?.data?.user);

  useEffect(() => {
    if (!user?.role || !pathname) return;

    const normalizedRole = normalizeRole(user?.role);

    // Check if the normalized role appears in the pathname
    const hasAccess = pathname.includes(normalizedRole);

    if (!hasAccess) {
      toast(`Access denied for role "${user?.role}".`);
      router.replace("/login");
    }
  }, [user, pathname]);
};
