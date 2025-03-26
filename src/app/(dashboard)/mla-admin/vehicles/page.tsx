import DashboardCompLayout from "@/components/dashboard/dashboard-layout";
import Card from "@/components/ui/Card";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableFooter, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableCaption 
} from "@/components/ui/table";
import Badge from "@/components/ui/Badge";
import { FaHome, FaCar, FaChartBar, FaCog } from "react-icons/fa"; // Import icons

const vehicleData = {
  buyer: {
    fullName: "Akambi Sarah Olupelumi",
    email: "akambisaraholu@example.com",
    phone: "09012345678",
    address: "Omu-Aran-Oja Oba, Ilorin 240243",
  },
  vehicle: {
    chassisNumber: "JKLMN1234567890",
    engineNumber: "JKLMN1234",
    make: "Mercedes-Benz",
    model: "Mercedes E-400",
    category: "Vehicle Between 3.0 - 4.0",
  },
  payments: [
    { id: 1, reference: "2025030501553", amount: "₦ 3,500.00", status: "Paid" },
    { id: 2, reference: "2025030501553", amount: "₦ 18,500.00", status: "Paid" },
    { id: 3, reference: "2025030501553", amount: "₦ 3,500.00", status: "Paid" },
    { id: 4, reference: "2025030501553", amount: "₦ 1,000.00", status: "Paid" },
    { id: 5, reference: "2025030501553", amount: "₦ 2,000.00", status: "Paid" },
    { id: 6, reference: "2025030501553", amount: "₦ 15,000.00", status: "Paid" },
  ],
};

// Sidebar navigation items (Updated structure)
const sidebarItems = [
  { label: "Dashboard", href: "/dashboard", icon: <FaHome /> },
  { label: "Vehicles", href: "/mla-admin/vehicles", icon: <FaCar /> },
  { label: "Reports", href: "/mla-admin/reports", icon: <FaChartBar /> },
  { label: "Settings", href: "/mla-admin/settings", icon: <FaCog /> },
];

export default function VehiclesDashboard() {
  return (
    <DashboardCompLayout title="MLA Vehicles Dashboard" sidebarItems={sidebarItems}>
      <div className="flex flex-col gap-6">
        {/* Breadcrumb Navigation */}
        <div className="text-sm text-gray-500 flex items-center">
          <span>Dashboard</span> <span className="mx-2">/</span> 
          <span>Vehicles Dashboard</span> <span className="mx-2">/</span>
          <span className="text-green-600 font-semibold">Mercedes E-400</span>
        </div>

        {/* Buyer & Vehicle Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Buyer’s Information">
            <p><strong>Full Name:</strong> {vehicleData.buyer.fullName}</p>
            <p><strong>Email:</strong> {vehicleData.buyer.email}</p>
            <p><strong>Phone Number:</strong> {vehicleData.buyer.phone}</p>
            <p><strong>Address:</strong> {vehicleData.buyer.address}</p>
          </Card>

          <Card title="Vehicle’s Information">
            <p><strong>Chassis Number:</strong> {vehicleData.vehicle.chassisNumber}</p>
            <p><strong>Engine Number:</strong> {vehicleData.vehicle.engineNumber}</p>
            <p><strong>Vehicle Make:</strong> {vehicleData.vehicle.make}</p>
            <p><strong>Vehicle Model:</strong> {vehicleData.vehicle.model}</p>
            <p><strong>Vehicle Category:</strong> {vehicleData.vehicle.category}</p>
          </Card>
        </div>

        {/* Payment Table */}
        <Table>
          <TableCaption>Payment History</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>S/N</TableHead>
              <TableHead>Payment Reference</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicleData.payments.map((payment, index) => (
              <TableRow key={payment.id} className="border-b">
                <TableCell className="p-2 text-center">{index + 1}</TableCell>
                <TableCell className="p-2 text-center">{payment.reference}</TableCell>
                <TableCell className="p-2 text-center">{payment.amount}</TableCell>
                <TableCell className="p-2 text-center">
                  <Badge status="success">{payment.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="text-right font-semibold p-2">
                Total Payments: {vehicleData.payments.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DashboardCompLayout>
  );
}
