const SalesFilters = () => {
    return (
      <div className="bg-white p-4 rounded border flex flex-wrap gap-4">
        <input placeholder="Plate Number" className="border p-2 rounded w-48" />
        <select className="border p-2 rounded w-48">
          <option>All</option>
          <option>Paid</option>
          <option>Not Paid</option>
        </select>
        <input type="text" placeholder="Invoice Number" className="border p-2 rounded w-48" />
        <input type="date" className="border p-2 rounded w-48" />
        <input type="date" className="border p-2 rounded w-48" />
        <button className="bg-green-700 text-white p-2 rounded w-24">Search</button>
      </div>
    );
  };
  
  export default SalesFilters;
  