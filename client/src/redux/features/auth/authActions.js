import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
// import { toast } from "react-toastify";
// import { Navigate } from "react-router-dom";

export const userLogin = createAsyncThunk(
  "auth/login", //--> name of our action, rejectwithvalue use to handle errors
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });
      //store token
      if (data.success) {
        localStorage.setItem("token", data.token);
        alert(data.message);
        console.log("data is ", data);
        if (role === "organisation") {
          window.location.replace("/");
        } else if (role === "admin") {
          window.location.replace("/admin");
        } else {
          window.location.replace("/organisation");
        }
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//register
export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      role,
      email,
      password,
      phone,
      organisationName,
      address,
      hospitalName,
      website,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post("/auth/register", {
        name,
        role,
        email,
        password,
        phone,
        organisationName,
        address,
        hospitalName,
        website,
      });
      if (data.success !== "Failed") {
        alert("User Registerd Successfully");
        window.location.replace("/login"); //redirect to login
        // toast.success("User Registerd Successfully");
        return data;
      }
      else{
        return rejectWithValue(data.message);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//current user
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async ({ rejectWithValue }) => {
    try {
      const res = await API.get("/auth/get-user");
      if (res.data) {
        return res?.data;
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
