import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Sun, Moon, Home, BarChart2, Bell, MessageSquare, LogOut } from 'lucide-react';
import { useTheme } from '../components/context/ThemeContext';
import { useContext } from "react";

import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../providers/AuthProviders";
const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { logOut, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    const api = axios.create({
      baseURL: "http://localhost:5000/api/v1", // Your backend URL
      withCredentials: true, // Important to send cookies
    });
    await api.post("http://localhost:5000/api/v1/users/logout", {}, { withCredentials: true });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Logged out successfully",
      showConfirmButton: false,
      timer: 2000,
    });

    // Redirect to login page
    navigate("/login", { replace: true });
  } catch (error) {
    console.error("Logout error:", error);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Logout failed",
      showConfirmButton: false,
      timer: 4500,
    });
  }
};

  return (
    <nav className="fixed w-full bg-white dark:bg-gray-800 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">PowerBill</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                `flex items-center space-x-2 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`
              }
            >
              <Home size={20} />
              <span>Dashboard</span>
            </NavLink>
            
            <NavLink 
              to="/analytics" 
              className={({ isActive }) => 
                `flex items-center space-x-2 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`
              }
            >
              <BarChart2 size={20} />
              <span>Analytics</span>
            </NavLink>
            
            <NavLink 
              to="/notification" 
              className={({ isActive }) => 
                `flex items-center space-x-2 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`
              }
            >
              <Bell size={20} />
              <span>Notifications</span>
            </NavLink>
            
            <NavLink 
              to="/feedback" 
              className={({ isActive }) => 
                `flex items-center space-x-2 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`
              }
            >
              <MessageSquare size={20} />
              <span>Feedback</span>
            </NavLink>
          </div>

          <div className="flex items-center space-x-4">
          <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Logout"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;