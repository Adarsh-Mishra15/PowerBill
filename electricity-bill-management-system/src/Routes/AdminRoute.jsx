import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isAdmin,isAdminLoading] = useAdmin();
  if (loading || isAdminLoading) return <span className="loading loading-dots loading-lg"></span>;
  if (user?.email && isAdmin) return children;
  return (
    <Navigate to="/login" state={location.pathname} replace={true}></Navigate>
  );
};

export default AdminRoute;
