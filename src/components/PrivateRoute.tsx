import { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { AuthLoading } from "./auth-loading";

interface PrivateRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

const PrivateRoute = ({ children, adminOnly = false }: PrivateRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user === null) {
    return <AuthLoading projectName="ProResume" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  if (adminOnly && !user?.roles.includes("admin")) {
    return <Navigate to="/admin" replace />;
  }
  return <div>{children}</div>;
};

export default PrivateRoute;
