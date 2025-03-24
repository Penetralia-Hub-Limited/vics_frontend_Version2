import { FC } from "react";
import { cn } from "@/lib/utils";

interface ICardContainer {
  children: React.ReactNode;
  className?: string;
}

const CardContainer: FC<ICardContainer> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "w-full border-1 border-neutral-300 rounded-lg p-5",
        className
      )}
    >
      {children}
    </div>
  );
};

export default CardContainer;
