import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

function EnergyUsage() {
  const [formData, setFormData] = useState({
    userId: "",
    consumedEnergy: "",
    surplusEnergy: "", // New field
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error on input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userId, consumedEnergy, surplusEnergy } = formData;
  
    if (!userId || !consumedEnergy || !surplusEnergy) {
      setError("All fields are required.");
      return;
    }
  
    try {
      const api = axios.create({
        baseURL: "http://localhost:5000/api/v1",
        withCredentials: true,
      });
  
      // Convert numeric fields from string to number
      const requestData = {
        userId,
        consumedEnergy: Number(consumedEnergy),  // ✅ Convert to Number
        surplusEnergy: Number(surplusEnergy),    // ✅ Convert to Number
      };
  
      const response = await api.post("/usage/", requestData, {
        withCredentials: true,
      });
  
      setSuccessMessage("Energy Usage added successfully!");
      console.log("Response:", response.data);
  
      // Clear form after successful submission
      setFormData({ userId: "", consumedEnergy: "", surplusEnergy: "" });
    } catch (error) {
      console.error("Error adding Energy Usage:", error.response?.data || error);
      setError("Failed to submit data. Try again.");
    }
  };
  

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col items-center justify-center w-full min-h-screen p-6 bg-gray-100 dark:bg-gray-900 transition-colors">
        <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
          Energy Usage
        </h1>
        <Card className="p-6 w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Typography variant="small" className="font-semibold text-gray-700 dark:text-gray-300">
                User ID
              </Typography>
              <Input
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                size="lg"
                className="mt-1"
              />
            </div>

            <div>
              <Typography variant="small" className="font-semibold text-gray-700 dark:text-gray-300">
                Kilowatts Consumed
              </Typography>
              <Input
                name="consumedEnergy"
                type="number"
                value={formData.consumedEnergy}
                onChange={handleChange}
                size="lg"
                className="mt-1"
              />
            </div>

            <div>
              <Typography variant="small" className="font-semibold text-gray-700 dark:text-gray-300">
                Surplus Energy
              </Typography>
              <Input
                name="surplusEnergy"
                type="number"
                value={formData.surplusEnergy}
                onChange={handleChange}
                size="lg"
                className="mt-1"
              />
            </div>

            {error && <Typography color="red" className="text-sm">{error}</Typography>}
            {successMessage && <Typography color="green" className="text-sm">{successMessage}</Typography>}

            <Button
              type="submit"
              className="mt-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              fullWidth
            >
              Add Energy Usage
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default EnergyUsage;
