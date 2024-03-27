import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import API from "../../services/API";
import { getCurrentUser } from "../../redux/features/auth/authActions";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  //children is basically the component wrapped inside this route
  const dispatch = useDispatch();

  //get current user
  const getUser = async () => {
    try {
      const { data } = await API.get("/auth/get-user");
      if (data?.success) {
        //if we got data , then check its success status
        dispatch(getCurrentUser(data));
      }
    } catch (error) {
      localStorage.clear(); //if any error occured while doing this, just delete the current token
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  });

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
