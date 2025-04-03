import { Card, Input, Button, Typography } from "@material-tailwind/react";
import Sidebar from "./Sidebar";
import { useState } from "react";

function NewConnection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    meterType: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, address, meterType } = formData;

    if (!name || !email || !phone || !address || !meterType) {
      setError("All fields are required.");
      return;
    }

    console.log("New connection request submitted:", formData);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-100 dark:bg-gray-900 transition-colors">
        <Card className="p-6 w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4 text-center">
            New Connection Request
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Typography variant="small" className="font-semibold text-gray-700 dark:text-gray-300">
                Customer Name
              </Typography>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                size="lg"
                className="mt-1"
              />
            </div>

            <div>
              <Typography variant="small" className="font-semibold text-gray-700 dark:text-gray-300">
                Email
              </Typography>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                size="lg"
                className="mt-1"
              />
            </div>

            <div>
              <Typography variant="small" className="font-semibold text-gray-700 dark:text-gray-300">
                Phone Number
              </Typography>
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                size="lg"
                className="mt-1"
              />
            </div>

            <div>
              <Typography variant="small" className="font-semibold text-gray-700 dark:text-gray-300">
                Address
              </Typography>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
                size="lg"
                className="mt-1"
              />
            </div>

            <div>
              <Typography variant="small" className="font-semibold text-gray-700 dark:text-gray-300">
                Meter Type
              </Typography>
              <Input
                name="meterType"
                value={formData.meterType}
                onChange={handleChange}
                size="lg"
                className="mt-1"
              />
            </div>

            {error && <Typography color="red" className="text-sm">{error}</Typography>}

            <Button
              type="submit"
              className="mt-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              fullWidth
            >
              Submit Connection Request
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default NewConnection;

