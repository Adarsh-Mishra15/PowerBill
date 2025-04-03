import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import Navbar from './Navbar';

const monthlyData = [
  { month: 'Jan', consumption: 380, bill: 95 },
  { month: 'Feb', consumption: 420, bill: 105 },
  { month: 'Mar', consumption: 450, bill: 124.50 },
  { month: 'Apr', consumption: 400, bill: 100 },
  { month: 'May', consumption: 380, bill: 95 },
  { month: 'Jun', consumption: 450, bill: 124.50 },
];

const usageBreakdown = [
  { name: 'Heating/Cooling', value: 45 },
  { name: 'Appliances', value: 25 },
  { name: 'Lighting', value: 15 },
  { name: 'Electronics', value: 15 },
];

const COLORS = ['#0284c7', '#0ea5e9', '#38bdf8', '#7dd3fc'];

const Analytics = () => {
  return (
    <>
    <Navbar />
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Usage Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Consumption Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Monthly Consumption</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="consumption" 
                  stroke="#0ea5e9" 
                  strokeWidth={2}
                  name="kWh"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Bill Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Monthly Bills</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="bill" 
                  fill="#0ea5e9" 
                  name="Amount ($)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Usage Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Usage Breakdown</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={usageBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {usageBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Energy Saving Tips */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Energy Saving Tips</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300">Heating & Cooling</h3>
              <p className="text-gray-600 dark:text-gray-300">Set your thermostat to 68°F in winter and 78°F in summer to optimize energy usage.</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300">Lighting</h3>
              <p className="text-gray-600 dark:text-gray-300">Replace traditional bulbs with LED lights to reduce electricity consumption by up to 75%.</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300">Appliances</h3>
              <p className="text-gray-600 dark:text-gray-300">Use energy-efficient appliances and run them during off-peak hours to save on electricity costs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Analytics;