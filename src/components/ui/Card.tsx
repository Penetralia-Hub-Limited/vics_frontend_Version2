import { ReactNode } from "react";

interface CardProps {
  title: string;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="bg-white shadow rounded-lg p-5">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="text-gray-700 space-y-2">{children}</div>
    </div>
  );
};

export default Card;
