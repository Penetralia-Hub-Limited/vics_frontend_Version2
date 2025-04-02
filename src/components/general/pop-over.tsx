import { FC, ReactNode } from "react";
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
}

const ModalComp: FC<IModalComp> = ({ btnText, btnVariant, children }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={btnVariant}>{btnText}</Button>
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
