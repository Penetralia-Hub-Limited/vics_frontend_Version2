"use client";

import { FC, ReactNode } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface IResponseModalX {
  open: boolean;
  onClose: () => void;
  content: ReactNode;
  title: string;
  status: "success" | "failed";
  footerBtnText?: string;
  footerTrigger: () => void;
}

export const ResponseModalX: FC<IResponseModalX> = ({
  open,
  onClose,
  title,
  content,
  status,
  footerBtnText,
  footerTrigger,
}) => {
  return (
    <>
      <AlertDialog open={open} onOpenChange={onClose}>
        <AlertDialogContent className="py-6">
          <AlertDialogHeader
            className={"flex flex-col items-center justify-center"}
          >
            <DotLottieReact
              inert={open ? true : undefined}
              className={cn(open ? "" : "hidden")}
              style={{ width: 200, height: 100 }}
              src={
                status === "failed"
                  ? "https://lottie.host/5c209c9c-259d-4371-9ace-f3b3b490613b/YM6WHVU3rT.lottie"
                  : "https://lottie.host/fe46d010-b474-49a8-aa26-ce393f8b3a88/nh99Y4MbDq.lottie"
              }
              loop
              autoplay
            />
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
            <div>{content}</div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/* <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel> */}
            <AlertDialogAction
              onClick={() => {
                footerTrigger();
                onClose();
              }}
            >
              {footerBtnText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
