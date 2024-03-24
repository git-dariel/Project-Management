import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/services/auth.context";
import LoadingSkeleton from "../../components/common/loading/skeleton";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div>
        <LoadingSkeleton />
      </div>
    );
  }

  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
