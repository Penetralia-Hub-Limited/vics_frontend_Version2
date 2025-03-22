import SummaryCard from "@/components/dashboard/dashboard-summary-card";

export default function Page() {
  return (
    <main>
      <div>MLA Dashboard</div>

      <SummaryCard title={"Plate Requests"} amount={1300} />
    </main>
  );
}
