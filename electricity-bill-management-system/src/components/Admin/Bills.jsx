import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

function Bills() {
  const [formData, setFormData] = useState({
    userId: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error on input
    setSuccessMessage(""); // Clear success message on new input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userId } = formData;

    if (!userId) {
      setError("User ID is required.");
      return;
    }

    try {
      const api = axios.create({
        baseURL: "http://localhost:5000/api/v1",
        withCredentials: true,
      });

      const requestData = { userId };

      const response = await api.post("/bill/generate", requestData);

      setSuccessMessage("Bill generated successfully!");
      console.log("Response:", response.data);

      // Clear form after successful submission
      setFormData({ userId: "" });
    } catch (error) {
      console.error("Error in Generating Bill:", error.response?.data || error);
      setError("Failed to generate bill. Try again.");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col items-center justify-center w-full min-h-screen p-6 bg-gray-100 dark:bg-gray-900 transition-colors">
        <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
          Generate Bill
        </h1>
        <Card className="p-6 w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Typography variant="small" className="font-semibold text-gray-700 dark:text-gray-300">
                User ID
              </Typography>
              <Input
                name="userId"
                value={formData.userId} // ✅ Fixed binding
                onChange={handleChange}
                size="lg"
                className="mt-1"
              />
            </div>

            {/* ✅ Display error message if any */}
            {error && <Typography color="red" className="text-sm">{error}</Typography>}

            {/* ✅ Display success message if bill generation is successful */}
            {successMessage && <Typography color="green" className="text-sm">{successMessage}</Typography>}

            <Button
              type="submit"
              className="mt-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              fullWidth
            >
              Generate Bill
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default Bills;

