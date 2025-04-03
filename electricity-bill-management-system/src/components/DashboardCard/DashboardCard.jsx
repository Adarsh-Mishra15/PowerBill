import React from 'react';

const DashboardCard = ({ title, value, icon, trend }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="text-gray-500 dark:text-gray-400">{title}</div>
        <div className="text-blue-600 dark:text-blue-400">{icon}</div>
      </div>
      <div className="mt-4">
        <div className="text-2xl font-semibold text-gray-800 dark:text-white">{value}</div>
        {trend && (
          <div className={`flex items-center mt-2 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            <span className="ml-1">{trend.value}%</span>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;