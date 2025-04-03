import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) 
  return <span className="loading loading-dots loading-lg"></span>;
  if (user?.email) return children;
  return <Navigate to="/login" state={location.pathname} replace={true}></Navigate>;
};

export default PrivateRoute;