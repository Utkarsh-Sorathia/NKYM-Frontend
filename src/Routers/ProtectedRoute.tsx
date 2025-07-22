import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Toast } from "../Components/Toast";

type JwtPayload = {
  role: "user" | "admin";
  exp: number;
};

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: ("user" | "admin")[];
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = ["user"],
}) => {
  const adminToken = localStorage.getItem("adminToken");

  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  let decoded: JwtPayload;
  try {
    decoded = jwtDecode<JwtPayload>(adminToken);

    // Check if adminToken is expired
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("adminToken");
      console.warn("adminToken expired, redirecting to login");
      Toast.fire({
        icon: "warning",
        title: "Session expired, redirecting to login",
      });
      return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(decoded.role)) {
      return <Navigate to="/" replace />;
    }
  } catch (err) {
    console.error("Invalid adminToken:", err);
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
