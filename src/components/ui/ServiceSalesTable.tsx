// ServiceSalesTable.tsx
import { FC } from "react";
import { Filters } from "@/common/types"; // Import the Filters type

interface ServiceSalesTableProps {
  filters: Filters; // Define filters as a prop
}

const ServiceSalesTable: FC<ServiceSalesTableProps> = ({ filters }) => {
  return (
    <div>
      {/* Render table based on filters */}
      <p>Service Type: {filters.serviceType}</p>
      <p>Registration Type: {filters.registrationType}</p>
      {/* Add your table rendering logic based on the filters */}
    </div>
  );
};

export default ServiceSalesTable;
