import React from "react";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ element }) => {
  const token = localStorage.getItem("token"); 

  return token ? element : <Navigate to="/login-admin" />; 
};

export default ProtectRoute;
