import { Link } from "react-router-dom";
import {
  HomeIcon,
  UserPlusIcon,
  DocumentTextIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/solid";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
function Sidebar() {
  const { logOut, setLoading } = useContext(AuthContext);
  const handleLogout = () => {
    logOut()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="bg-blue-900 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin-dashboard"
              className="flex items-center space-x-2 p-2 hover:bg-blue-800 rounded"
            >
              <HomeIcon className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/new-connection"
              className="flex items-center space-x-2 p-2 hover:bg-blue-800 rounded"
            >
              <UserPlusIcon className="h-5 w-5" />
              <span>New Connection</span>
            </Link>
          </li>
          <li>
          <Link
            to="/admin-bill"
            className="flex items-center space-x-2 p-2 hover:bg-blue-800 rounded"
          >
            <DocumentTextIcon className="h-5 w-5" />
            <span>Bills</span>
          </Link>
        </li>
        <li>
            <Link
              to="/calamity"
              className="flex items-center space-x-2 p-2 hover:bg-blue-800 rounded"
            >
              <DocumentTextIcon className="h-5 w-5" />
              <span>Calamity Alert</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin-energy"
              className="flex items-center space-x-2 p-2 hover:bg-blue-800 rounded"
            >
              <DocumentTextIcon className="h-5 w-5" />
              <span>Add Energy Usage</span>
            </Link>
          </li>
          <li>
            <Link
              to="/customer-details"
              className="flex items-center space-x-2 p-2 hover:bg-blue-800 rounded"
            >
              <UserGroupIcon className="h-5 w-5" />
              <span>Customer Details</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin-complaints"
              className="flex items-center space-x-2 p-2 hover:bg-blue-800 rounded"
            >
              <InboxIcon className="h-5 w-5" />
              <span>Complaints</span>
            </Link>
          </li>
          <li onClick={handleLogout}>
            <Link
              to="/"
              className="flex items-center space-x-2 p-2 hover:bg-blue-800 rounded"
            >
              <InboxIcon className="h-5 w-5" />
              <span>LogOut</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
