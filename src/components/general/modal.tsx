import { FC, ReactNode, ReactElement } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface IModal {
  title: string;
  content: ReactNode;
  btnText: string;
  footerBtn: ReactElement;
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

const Modal: FC<IModal> = ({
  title,
  btnText,
  content,
  footerBtn,

  btnVariant = "default",
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={btnVariant}>{btnText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-0 m-0 overflow-hidden">
        <DialogHeader className={"bg-neutral-300 p-4 h-15"}>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>{content}</div>
        <DialogFooter className={"p-4"}>{footerBtn}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
