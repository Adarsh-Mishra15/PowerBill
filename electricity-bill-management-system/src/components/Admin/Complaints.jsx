import React, { useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import Sidebar from "./Sidebar";
import axios from "axios";

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/complaints/all", { withCredentials: true });
        console.log("API Response:", response.data);
        setComplaints(Array.isArray(response.data.message) ? response.data.message : []);
      } catch (err) {
        console.error("Error fetching complaints:", err);
        setError("Failed to load complaints.");
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar (Fixed Width) */}
      <div className="w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Main Content (Takes Remaining Space) */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Customer Complaints</h1>

        {error && <p className="text-red-500">{error}</p>}

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {["Complaint ID", "Customer ID", "Subject", "Transaction ID", "Status"].map((header) => (
                    <th key={header} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography variant="small" color="blue-gray" className="font-bold">
                        {header}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {complaints.length > 0 ? (
                  complaints.map((complaint) => (
                    <tr key={complaint._id}>
                      <td className="p-4"><Typography variant="small" color="blue-gray">{complaint._id}</Typography></td>
                      <td className="p-4"><Typography variant="small" color="blue-gray">{complaint.userId}</Typography></td>
                      <td className="p-4"><Typography variant="small" color="blue-gray">{complaint.type}</Typography></td>
                      <td className="p-4"><Typography variant="small" color="blue-gray">{complaint.transactionId  || "N/A"}</Typography></td>
                      <td className="p-4"><Typography variant="small" color="blue-gray">{complaint.status}</Typography></td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">No complaints found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Complaints;
