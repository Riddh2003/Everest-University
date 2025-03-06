import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ allowedRole }) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const role = localStorage.getItem("role") || sessionStorage.getItem("role");

  console.log("Token:", token);
  console.log("Role:", role);
  if (!token) {
    console.log(`Redirecting to ${allowedRole === "admin" ? "/adminlogin" : "/studentlogin"}`);
    return <Navigate to={allowedRole === "admin" ? "/adminlogin" : "/studentlogin"} replace />;
  }
  if (!role || role !== allowedRole) {
    return <Navigate to={allowedRole === "admin" ? "/adminlogin" : "/studentlogin"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
