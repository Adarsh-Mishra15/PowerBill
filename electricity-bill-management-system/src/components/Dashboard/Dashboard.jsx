import React, { useState, useEffect } from "react";
import { Zap, DollarSign, Calendar, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../DashboardCard/DashboardCard";
import Navbar from "../Navbar";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [energyUsage, setEnergyUsage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/usage/current",
          { withCredentials: true }
        );
        console.log(response.data.data[0])
        setEnergyUsage(response.data.data[0]);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Dashboard
        </h1>

        {loading ? (
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard
              title="Total Consumption"
              value={`${energyUsage.consumedEnergy} kW`}
              icon={<Zap size={24} />}
              trend={{
                value: energyUsage.consumptionTrend,
                isPositive: energyUsage.consumptionTrend > 0,
              }}
            />

            <DashboardCard
              title="Current Bill"
              value={`INR ${energyUsage.estimatedBill.toFixed(2)}`}
              icon={<DollarSign size={24} />}
              trend={{
                value: energyUsage.billTrend,
                isPositive: energyUsage.billTrend > 0,
              }}
              onClick={() => navigate("/payment")} // Navigate to Payment Page
            />

            <DashboardCard
              title="Due Date"
              value={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toDateString()}
              icon={<Calendar size={24} />}
            />

            <DashboardCard
              title="Active Alerts"
              value={2}
              icon={<AlertTriangle size={24} />}
            />
          </div>
        )}

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Recent Activity
          </h2>
          {energyUsage?.recentActivity?.length > 0 ? (
            <ul className="text-gray-600 dark:text-gray-400">
              {energyUsage.recentActivity.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              No recent activities available.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

