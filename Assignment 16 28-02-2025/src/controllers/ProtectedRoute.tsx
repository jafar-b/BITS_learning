
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

export const ProtectedRoute = () => {
const isAuthenticated=useAuthStore((state:any)=>state.isAuthenticated)
  return <>{isAuthenticated ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default ProtectedRoute;