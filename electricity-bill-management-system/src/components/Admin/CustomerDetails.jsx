import React, { useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import Sidebar from "./Sidebar";
import axios from "axios";

function CustomerDetails() {
  const [customers, setCustomers] = useState([]);
  const [energyUsage, setEnergyUsage] = useState({});
  const [error, setError] = useState("");

  // Fetch all customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/users/allUsers",
          { withCredentials: true }
        );
        //console.log("Customers API Response:", response.data);
        setCustomers(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError("Failed to load customer details.");
      }
    };

    fetchCustomers();
  }, []);

  // Fetch energy usage after customers are loaded
  useEffect(() => {
    if (customers.length === 0) return; // Prevent fetching on empty customers

    const fetchEnergyUsage = async () => {
      try {
        const usageData = {};
        await Promise.all(
          customers.map(async (customer) => {
            try {
              console.log(`Fetching usage for: ${customer._id}`);
              const response = await axios.get(
                `http://localhost:5000/api/v1/usage/${customer._id}`,
                { withCredentials: true }
              );
              
              console.log(`Usage for ${customer._id}:`, response.data.data[0].consumedEnergy);

              // Check if response contains usage data
              if (response.data && response.data.data) {
                const usage = Array.isArray(response.data.data)
                  ? response.data.data[0]?.consumedEnergy || "N/A"
                  : response.data.data.consumedEnergy || "N/A";

                usageData[customer._id] = usage;
              }
            } catch (err) {
              console.error(`Error fetching usage for ${customer._id}:`, err);
            }
          })
        );

        console.log("Final Energy Usage Data:", usageData);
        setEnergyUsage({ ...usageData }); // Ensures state update triggers re-render
      } catch (err) {
        console.error("Error fetching energy usage:", err);
        setError("Failed to load energy usage data.");
      }
    };

    fetchEnergyUsage();
  }, [customers]); // Runs when customers change

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Customer Details</h1>

        {error && <p className="text-red-500">{error}</p>}

        {/* Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {["Customer ID", "Name", "Email", "KW Used"].map((heading) => (
                    <th
                      key={heading}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography variant="small" color="blue-gray" className="font-bold">
                        {heading}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customers.length > 0 ? (
                  customers.map((customer) => (
                    <tr key={customer._id}>
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray">
                          {customer._id}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray">
                          {customer.fullName}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray">
                          {customer.email}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray">
                          {energyUsage[customer._id] || "N/A"}
                        </Typography>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No customers found
                    </td>
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

export default CustomerDetails;
