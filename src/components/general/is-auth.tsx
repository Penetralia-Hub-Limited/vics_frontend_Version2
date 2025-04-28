"use client";

import { useEffect, ReactNode, FC } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface IsAuthProps {
  children: ReactNode;
}

export const IsAuth: FC<IsAuthProps> = ({ children }) => {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  // to avoid flashing protected content before redirect
  // if (false) return null;

  return <>{children}</>;
};
