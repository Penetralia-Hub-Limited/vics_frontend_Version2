import { FC, useState } from "react";
import ServiceSalesFilters from "@/components/ui/ServiceSalesFilters";
import ServiceSalesTable from "@/components/ui/ServiceSalesTable";
import { Filters } from "@/common/types"; // Now correctly imported from '@/types'

const ServiceSalesReport: FC = () => {
  const [filters, setFilters] = useState<Filters>({
    serviceType: "",
    registrationType: "",
    zoneOffice: "",
    mla: "",
    fromDate: "",
    toDate: "",
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Service Sales Report</h1>
      <ServiceSalesFilters filters={filters} setFilters={setFilters} />
      <ServiceSalesTable filters={filters} />
    </div>
  );
};

export default ServiceSalesReport;
