import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ allowedRole }) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const role = localStorage.getItem("role") || sessionStorage.getItem("role");

  console.log("Token:", token); // ✅ Check if token exists
  console.log("Role:", role);   // ✅ Check what role is stored

  // 🚨 If there is no token, send the user to the respective login page
  if (!token) {
    console.log(`Redirecting to ${allowedRole === "admin" ? "/adminlogin" : "/studentlogin"}`);
    return <Navigate to={allowedRole === "admin" ? "/adminlogin" : "/studentlogin"} replace />;
  }

  // 🚨 If role is missing or not matching, send to unauthorized page
  if (!role || role !== allowedRole) {
    console.log("Redirecting to unauthorized page");
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
