import { FC, ReactElement, ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

interface IModalComp {
  children: ReactNode;
  button: ReactElement;
}

const ModalComp: FC<IModalComp> = ({ button, children }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{button}</AlertDialogTrigger>
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
