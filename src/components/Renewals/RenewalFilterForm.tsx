
"use client";
import { FC, useState } from "react";

const RenewalFilterForm: FC = () => {
  const [plateNumber, setPlateNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSearch = () => {
    // Implement API call logic here
    console.log({ plateNumber, startDate, endDate });
  };

  return (
    <div className="bg-white rounded-md p-4 flex flex-wrap gap-4 items-center">
      <input
        type="text"
        placeholder="Plate Number"
        value={plateNumber}
        onChange={(e) => setPlateNumber(e.target.value)}
        className="border p-2 rounded-md text-sm"
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-2 rounded-md text-sm"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border p-2 rounded-md text-sm"
      />
      <button
        onClick={handleSearch}
        className="bg-primary-500 text-white text-sm px-4 py-2 rounded-md"
      >
        Search
      </button>
    </div>
  );
};

export default RenewalFilterForm;
