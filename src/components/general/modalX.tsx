import { FC, ReactNode, ReactElement } from "react";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import Dialog from "@mui/material/Dialog";

interface IModalX {
  title: string;
  open: boolean;
  onClose: () => void;
  content: ReactNode;
  footerBtn?: ReactElement;
}

export const ModalX: FC<IModalX> = ({
  open,
  onClose,
  content,
  footerBtn,
  title,
}) => {
  return (
    <Dialog fullWidth={true} maxWidth={"sm"} onClose={onClose} open={open}>
      <div
        className={cn(
          "bg-neutral-300 px-4 flex flex-row items-center justify-between min-h-15"
        )}
      >
        <p className={cn("text-base font-semibold")}>{title}</p>
        <div
          onClick={onClose}
          className="border border-danger hover:border-danger/80 group rounded-full p-2 cursor-pointer transition-all ease-in-out duration-150"
        >
          <XIcon className={"text-danger group-hover:text-danger/80"} />
        </div>
      </div>

      <div className={cn("flex flex-col gap-4 w-full p-6")}>
        <div className={cn("py-4")}>{content}</div>
        {footerBtn}
      </div>
    </Dialog>
  );
};
