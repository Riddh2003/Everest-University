import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoutes = ({ allowedRole }) => {
  const { isAuthenticated, user, loading } = useAuth();

  // While checking authentication status, show a loading state or return null
  if (loading) {
    return null; // Could replace with a loading spinner component if desired
  }

  // Check if token is in storage but expired
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const tokenExpiry = localStorage.getItem('tokenExpiry') || sessionStorage.getItem('tokenExpiry');

  // If token exists but is expired, clear it and redirect to login
  if (token && tokenExpiry && new Date(tokenExpiry) <= new Date()) {
    console.log("Token expired in ProtectedRoutes, redirecting to login");
    // Clear expired token
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    sessionStorage.removeItem('tokenExpiry');
    return <Navigate to={allowedRole === "admin" ? "/adminlogin" : "/studentlogin"} replace />;
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
