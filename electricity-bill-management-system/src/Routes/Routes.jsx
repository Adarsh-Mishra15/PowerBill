import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "../components/Login/Login";
import Home from "../Layout/Home/Home";
import SignUp from "../components/SignUp/SignUp";
import Analytics from "../components/Analytics";
import Feedback from "../components/Feedback";
import Notification from "../components/Notification";
import AdminDashboard from "../components/Admin/AdminDashboard";
import Bills from "../components/Admin/Bills";
import NewConnection from "../components/Admin/NewConnection";
import Complaints from "../components/Admin/Complaints";
import CustomerDetails from "../components/Admin/CustomerDetails";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Dashboard from "../components/Dashboard/Dashboard";
import EnergyUsage from "../components/Admin/EnergyUsage";
import CalamityAlert from "../components/Admin/CalamityAlert";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  { path: "signup", element: <SignUp></SignUp> },
  { path: "login", element: <Login></Login> },
  {
    path: "notification",
    element: <Notification></Notification>,
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
  },
  {
    path: "admin-dashboard",
    element: <AdminDashboard></AdminDashboard>,
  },
  {
    path: "analytics",
    element: <Analytics></Analytics>,
  },
  {
    path: "feedback",
    element: <Feedback></Feedback>,
  },
  {
    path: "admin-bill",
    element: <Bills></Bills>,
  },  
  {
    path: "admin-energy",
    element: <EnergyUsage></EnergyUsage>,
  },
  {
    path: "admin-complaints",
    element: <Complaints></Complaints>,
  },
  {
    path: "customer-details",
    element: <CustomerDetails></CustomerDetails>,
  },
  {
    path: "new-connection",
    element: <NewConnection></NewConnection>,
  },
  {
    path:"calamity",
    element:<CalamityAlert></CalamityAlert>
  }
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
