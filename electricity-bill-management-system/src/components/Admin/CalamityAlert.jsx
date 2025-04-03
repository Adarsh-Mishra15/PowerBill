import { Card, Input, Button, Typography, Textarea } from "@material-tailwind/react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

function CalamityAlert() {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
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
    const { title, message } = formData;

    if (!title.trim() || !message.trim()) {
      setError("Both Title and Message are required.");
      return;
    }

    try {
      const api = axios.create({
        baseURL: "http://localhost:5000/api/v1",
        withCredentials: true,
      });

      await api.post("/calamity-alert", { title, message });

      setSuccessMessage("Calamity alert sent successfully!");
      setFormData({ title: "", message: "" }); // Clear form
    } catch (error) {
      console.error("Error sending alert:", error.response?.data || error);
      setError("Failed to send alert. Try again.");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col items-center justify-center w-full min-h-screen p-6 bg-gray-100 dark:bg-gray-900 transition-colors">
        <h1 className="text-3xl font-bold mb-6 text-red-600 dark:text-red-400">
          Send Calamity Alert
        </h1>
        <Card className="p-6 w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Title Input */}
            <div>
              <Typography variant="small" className="font-semibold text-gray-700 dark:text-gray-300">
                Alert Title
              </Typography>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                size="lg"
                required
                placeholder="Enter alert title"
                className="mt-1"
              />
            </div>

            {/* Message Input */}
            <div>
              <Typography variant="small" className="font-semibold text-gray-700 dark:text-gray-300">
                Alert Message
              </Typography>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Enter detailed alert message"
                rows={4}
                className="mt-1"
              />
            </div>

            {/* Error Message */}
            {error && <Typography color="red" className="text-sm">{error}</Typography>}

            {/* Success Message */}
            {successMessage && <Typography color="green" className="text-sm">{successMessage}</Typography>}

            {/* Submit Button */}
            <Button
              type="submit"
              className="mt-6 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
              fullWidth
            >
              Send Alert
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default CalamityAlert;
