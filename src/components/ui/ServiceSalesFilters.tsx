import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Define the type for the filters prop
type FiltersProps = {
  filters: {
    serviceType: string;
    registrationType: string;
    zoneOffice: string;
    mla: string;
    fromDate: string; // Ensure this is a string in ISO format (e.g., '2025-04-04T00:00:00.000Z')
    toDate: string; // Ensure this is a string in ISO format (e.g., '2025-04-04T00:00:00.000Z')
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    serviceType: string;
    registrationType: string;
    zoneOffice: string;
    mla: string;
    fromDate: string;
    toDate: string;
  }>>;
};

const ServiceSalesFilters: FC<FiltersProps> = ({ filters, setFilters }) => {
  const handleDownloadReport = () => {
    // Implement your report generation logic here, e.g., exporting data to a CSV
    console.log("Generating report with filters:", filters);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 bg-white rounded-lg shadow-sm">
      {/* Service Type Dropdown */}
      <Select
        value={filters.serviceType} // Bind to the serviceType filter
        onValueChange={(value) => setFilters({ ...filters, serviceType: value })} // Update the filter state
      >
        <SelectTrigger>
          <SelectValue placeholder="-- Select Type --" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="drivers-test">Driver’s Test</SelectItem>
          <SelectItem value="vehicle-registration">Vehicle Registration</SelectItem>
        </SelectContent>
      </Select>

      {/* Registration Type Dropdown */}
      <Select
        value={filters.registrationType} // Bind to the registrationType filter
        onValueChange={(value) => setFilters({ ...filters, registrationType: value })} // Update the filter state
      >
        <SelectTrigger>
          <SelectValue placeholder="-- Select Type --" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="private">Private</SelectItem>
          <SelectItem value="commercial">Commercial</SelectItem>
        </SelectContent>
      </Select>

      {/* Zone Office Dropdown */}
      <Select
        value={filters.zoneOffice} // Bind to the zoneOffice filter
        onValueChange={(value) => setFilters({ ...filters, zoneOffice: value })} // Update the filter state
      >
        <SelectTrigger>
          <SelectValue placeholder="-- Select Office --" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="moro">Moro</SelectItem>
          <SelectItem value="ilorin">Ilorin</SelectItem>
        </SelectContent>
      </Select>

      {/* MLA Dropdown */}
      <Select
        value={filters.mla} // Bind to the mla filter
        onValueChange={(value) => setFilters({ ...filters, mla: value })} // Update the filter state
      >
        <SelectTrigger>
          <SelectValue placeholder="-- Select MLA --" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="akanbi">Akanbi S.</SelectItem>
          <SelectItem value="kunle">Kunle M.</SelectItem>
        </SelectContent>
      </Select>

      {/* From Date Picker */}
      <DatePicker
        selected={filters.fromDate ? new Date(filters.fromDate) : null} // Bind to the fromDate filter
        onChange={(date: Date | null) => setFilters({ ...filters, fromDate: date ? date.toISOString() : "" })} // Update the filter state with explicit typing for `date`
        placeholderText="From"
        dateFormat="yyyy-MM-dd" // Adjust date format to your needs
      />

      {/* To Date Picker */}
      <DatePicker
        selected={filters.toDate ? new Date(filters.toDate) : null} // Bind to the toDate filter
        onChange={(date: Date | null) => setFilters({ ...filters, toDate: date ? date.toISOString() : "" })} // Update the filter state with explicit typing for `date`
        placeholderText="To"
        dateFormat="yyyy-MM-dd" // Adjust date format to your needs
      />

      {/* Download Report Button */}
      <Button
        onClick={handleDownloadReport}
        className="col-span-1 md:col-span-2 lg:col-span-1 bg-green-600 hover:bg-green-700"
      >
        Download Report
      </Button>
    </div>
  );
};

export default ServiceSalesFilters;
