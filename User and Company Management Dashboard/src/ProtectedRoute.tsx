import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "./store/AuthStore";
import { message } from "antd";

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export const ProtectedAdminRoute = () => {
  const isAdmin = useAuthStore((state) => state.isAdmin);

  if (!isAdmin) {
    message.error("Not an Admin to access this page!")
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
