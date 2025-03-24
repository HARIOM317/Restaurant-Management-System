import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const ProtectedRoute = ({ element: Element, requiredRoles, ...rest }) => {
  const { role } = useContext(StoreContext);
  const userRole = localStorage.getItem("userRole");
  const location = useLocation();

  if (!requiredRoles.includes(role) && !requiredRoles.includes(userRole)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Element />;
};

export default ProtectedRoute;
