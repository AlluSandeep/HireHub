import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  console.log("ProtectedRoute User:", user);

  if (!user) {
    console.log("No User - Redirecting to Login");
    return <Navigate to="/login" replace />;
  }

  console.log("User Role:", user.role);
  console.log("Allowed Roles:", allowedRoles);

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log("Unauthorized");
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("Access Granted");
  return children;
};

export default ProtectedRoute;