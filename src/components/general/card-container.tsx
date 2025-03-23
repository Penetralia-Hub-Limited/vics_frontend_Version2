import { FC } from "react";

interface ICardContainer {
  children: React.ReactNode;
}

const CardContainer: FC<ICardContainer> = ({ children }) => {
  return (
    <div className={"w-full border-1 border-neutral-300 rounded-lg p-5"}>
      {children}
    </div>
  );
};

export default CardContainer;
