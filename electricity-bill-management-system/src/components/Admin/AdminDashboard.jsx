import { Card, CardBody, Typography } from "@material-tailwind/react";
import Sidebar from "./Sidebar";

function AdminDashboard() {
  return (
    <>
    
    <div className="flex h-screen">
      {/* Sidebar (Fixed Width) */}
      <div className="w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Main Dashboard (Takes Full Width) */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                Total Customers
              </Typography>
              <Typography variant="h3">5</Typography>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                Active Connections
              </Typography>
              <Typography variant="h3">3</Typography>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                Pending Complaints
              </Typography>
              <Typography variant="h3">3</Typography>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
}

export default AdminDashboard;
