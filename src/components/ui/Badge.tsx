import { ReactNode } from "react";

interface BadgeProps {
  status: "success" | "pending" | "failed";
  children: ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ status, children }) => {
  const statusClasses: Record<BadgeProps["status"], string> = {
    success: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusClasses[status]}`}>
      {children}
    </span>
  );
};

export default Badge;
