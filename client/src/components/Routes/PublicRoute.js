import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  if (localStorage.getItem("token")) {
    // console.log("in this");
    return <Navigate to="/" />;
  } else {
    // console.log("in this");
    return children;
  }
};

export default PublicRoute;
