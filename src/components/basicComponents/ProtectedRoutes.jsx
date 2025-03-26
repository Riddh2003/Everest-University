import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoutes = ({ allowedRole }) => {
  const { isAuthenticated, user, loading } = useAuth();

  // While checking authentication status, show a loading state or return null
  if (loading) {
    return null; // Could replace with a loading spinner component if desired
  }

  // Check if user is authenticated and has the correct role
  if (!isAuthenticated) {
    console.log(`Redirecting to ${allowedRole === "admin" ? "/adminlogin" : "/studentlogin"}`);
    return <Navigate to={allowedRole === "admin" ? "/adminlogin" : "/studentlogin"} replace />;
  }

  if (!user || user.role !== allowedRole) {
    return <Navigate to={allowedRole === "admin" ? "/adminlogin" : "/studentlogin"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
