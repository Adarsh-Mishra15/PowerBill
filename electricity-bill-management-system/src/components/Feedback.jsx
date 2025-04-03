import React, { useState } from "react";
import { Send } from "lucide-react";
import Navbar from "./Navbar";
import axios from "axios";

const Feedback = () => {
  const [form, setForm] = useState({
    type: "Billing Issue",
    message: "",
    transactionId: "",
    description: "",
    priority: "medium",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Ensure Transaction ID is provided when type is "Billing Issue"
    if (form.type === "Billing Issue" && !form.transactionId.trim()) {
      setError("Transaction ID is required for Billing Issues.");
      return;
    }

    try {
      const api = axios.create({
        baseURL: "http://localhost:5000/api/v1",
        withCredentials: true,
      });

      await api.post("/complaints", form);

      setSuccessMessage("Feedback submitted successfully!");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);

      setForm({
        type: "Billing Issue",
        message: "",
        transactionId: "",
        description: "",
        priority: "medium",
      });
    } catch (error) {
      console.error("Error submitting feedback:", error.response?.data || error);
      setError("Failed to submit feedback. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccessMessage("");
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Feedback & Support
          </h1>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            {submitted ? (
              <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-4 rounded-lg text-center">
                {successMessage}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Feedback Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Type
                  </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Billing Issue">Billing Issue</option>
                    <option value="Meter Issue">Meter Issue</option>
                    <option value="Feedback">Suggestion</option>
                    <option value="Power Outage">Power Outage</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description of your feedback"
                  />
                </div>

                {/* Transaction ID - Required only for "Billing Issue" */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Transaction ID
                  </label>
                  <input
                    type="text"
                    name="transactionId"
                    value={form.transactionId}
                    onChange={handleChange}
                    required={form.type === "Billing Issue"} // Required only if type is "Billing Issue"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the Transaction ID"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Please provide detailed information"
                  />
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                {/* Error & Success Messages */}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Send size={20} />
                  Submit Feedback
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;

