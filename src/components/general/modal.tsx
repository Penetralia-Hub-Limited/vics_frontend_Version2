import { FC, ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface IModal {
  title: string;
  content: ReactNode;
  buttonText: string;
}

const Modal: FC<IModal> = ({ title, buttonText, content }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>{buttonText}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className={"p-0 m-0 overflow-hidden"}>
        <AlertDialogHeader className={"flex bg-neutral-300 h-15 p-3"}>
          <div className={"flex flex-row item-center justify-between"}>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogCancel className="border-1 rounded-full shadow-none focus:ring-0 ring-0 border-danger hover:border-danger">
              <X className={"text-danger"} />
            </AlertDialogCancel>
          </div>
          <AlertDialogDescription className={"p-4"}>
            <div>{content}</div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className={"p-3"}>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;

export function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
