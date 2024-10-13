import React from "react";
import { createBrowserRouter } from "react-router-dom";
//pages
import Home from "./pages/user/home.js";
import Login from "./pages/user/login.js";
import Register from "./pages/user/register.js";
import AttendanceHistory from "./pages/user/attendance_histories.js";
import UpdateProfile from "./pages/user/update_profile.js";
import HomeAdmin from "./pages/admin/home.js";
import LoginAdmin from "./pages/admin/login.js";
import ReportAdmin from "./pages/admin/report.js";
import AttendanceHistoryAdmin from "./pages/admin/attendance_histories.js";
import UpdateProfileAdmin from "./pages/admin/update_profile.js";

var localToken = localStorage.getItem('token');
var auth = localStorage.getItem('auth');


if (localToken) {

  var authStorage = auth ?  JSON.parse(auth) : {};

  if (authStorage?.role == "Admin") {
    var App = createBrowserRouter([
      {
        path: "/",
        element: <HomeAdmin />
      },
      {
        path: "/attendance-history",
        element: <AttendanceHistoryAdmin />
      },
      {
        path: "/report",
        element: <ReportAdmin />
      },
      {
        path: "/update-profile",
        element: <UpdateProfileAdmin />
      },
    ]);
  } else {
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
  }
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
    {
      path: "/admin",
      element: <LoginAdmin />
    }
  ]);
}

export default App;