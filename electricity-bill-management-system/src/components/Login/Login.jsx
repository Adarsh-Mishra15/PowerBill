import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import Header from "../Header/Header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogIn = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
  
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
  
    try {
      const api = axios.create({
        baseURL: "http://localhost:5000/api/v1", // Your backend URL
        withCredentials: true, // Important to send cookies
      });
  
      const response = await api.post("/users/login", { email, password });
  
      const user = response.data.data; // Extract user data from response
      //console.log(user.data.role)
  
      if (!user) {
        throw new Error("Invalid user data received");
      }
  
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login successful",
        showConfirmButton: false,
        timer: 2000,
      });
  
      // Redirect based on user role
      if (user.role === "admin") {
        navigate("/admin-dashboard", { replace: true });
      } else {
        navigate(location?.state ? location.state : "/dashboard", { replace: true });
      }
  
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response?.data?.message || "Wrong email / password",
        showConfirmButton: false,
        timer: 4500,
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Or <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">create a new account</Link>
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleLogIn}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700"
                    placeholder="Email address"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700"
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
