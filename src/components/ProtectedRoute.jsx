// components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const userRole = user?.role?.toUpperCase();
  const normalizedAllowedRoles = allowedRoles.map((role) => role.toUpperCase());

  if (loading) return <div className="text-white">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (
    normalizedAllowedRoles.length &&
    !normalizedAllowedRoles.includes(userRole)
  ) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
