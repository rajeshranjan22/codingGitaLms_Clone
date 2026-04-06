import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../utils/auth";

export default function ProtectedRoute() {
  const user = getUser();

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
