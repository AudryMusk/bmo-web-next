import useAuthStore from "@/auth/AuthStore"
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
    const { isLoggedIn } = useAuthStore()
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}