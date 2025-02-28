
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

export const ProtectedAdminRoute = () => {
const isAdmin=useAuthStore((state:any)=>state.isAdmin)
  return <>{isAdmin ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default ProtectedAdminRoute;