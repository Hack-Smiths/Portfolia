// src/components/PrivateRoute.tsx
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("token");

  // If no token found, redirect to login
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  // If token exists, allow access
  return <>{children}</>;
};

export default PrivateRoute;
