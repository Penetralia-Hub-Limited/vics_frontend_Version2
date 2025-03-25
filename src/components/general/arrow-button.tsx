import { FC } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IArrowButton {
  direction: "left" | "right";
  onClick: () => void;
  classname?: string;
}

const ArrowButton: FC<IArrowButton> = ({ direction, onClick, classname }) => {
  return (
    <div
      className={cn(
        "cursor-pointer p-2 rounded-sm border-1 border-neutral-500",
        classname
      )}
      onClick={onClick}
    >
      {direction === "left" ? (
        <ChevronLeft size={15} />
      ) : (
        <ChevronRight size={15} />
      )}
    </div>
  );
};

export default ArrowButton;
