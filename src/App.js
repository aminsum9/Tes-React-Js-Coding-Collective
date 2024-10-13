import React from "react";
import { createBrowserRouter } from "react-router-dom";
//pages
import Home from "./pages/home.js";
import Login from "./pages/login.js";
import Register from "./pages/register.js";
import AttendanceHistory from "./pages/attendance_histories.js";
import UpdateProfile from "./pages/update_profile.js";

var localToken = localStorage.getItem('token');

if(localToken){
  var App = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/attendance-history",
      element: <AttendanceHistory />
    },
    {
      path: "/update-profile",
      element: <UpdateProfile />
    },
  ]);
} else {
  var App = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
  ]);
}

export default App;