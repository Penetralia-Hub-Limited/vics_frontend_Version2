import { FC, ReactElement, ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface IModalComp {
  children: ReactNode;
  button: ReactElement;
}

const ModalComp: FC<IModalComp> = ({ button, children }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{button}</AlertDialogTrigger>
      <AlertDialogContent>{children}</AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalComp;
