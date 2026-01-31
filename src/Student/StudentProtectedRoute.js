import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function StudentProtectedRoute() {
  const { user } = useAuth();

 
  if (!user) {
    return <Navigate to="/" replace />; // ✅ LOGIN PAGE
  }

  
  if (user.role !== "student") {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
