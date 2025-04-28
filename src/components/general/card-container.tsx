import { FC, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ICardContainer extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const CardContainer: FC<ICardContainer> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div
      className={cn(
        "w-full border-1 border-primary-300 rounded-lg p-5",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default CardContainer;
