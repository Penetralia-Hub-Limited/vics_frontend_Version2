"use client";

import { FC, useRef, useEffect, ReactNode } from "react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

interface IModalComp {
  children: ReactNode;
  btnText: string;
  btnVariant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "date"
    | "secondary"
    | "ghost"
    | "pagination"
    | null
    | undefined;
  autoClickAfterMs?: number;
}

const ModalComp: FC<IModalComp> = ({
  btnText,
  btnVariant,
  children,
  autoClickAfterMs,
}) => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (autoClickAfterMs) {
      const timer = setTimeout(() => {
        triggerRef.current?.click(); // ⬅️ Simulate click
      }, autoClickAfterMs);

      return () => clearTimeout(timer);
    }
  }, [autoClickAfterMs]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button ref={triggerRef} variant={btnVariant}>
          {btnText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent
        className={"flex flex-col items-center justify-center w-full"}
      >
        <AlertDialogTitle></AlertDialogTitle>
        <AlertDialogDescription></AlertDialogDescription>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalComp;
