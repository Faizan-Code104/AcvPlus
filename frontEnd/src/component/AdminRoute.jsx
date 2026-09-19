import React from "react";
import { Navigate } from "react-router-dom";

/* =========================================================
   ACV PLUS ADMIN PROTECTED ROUTE
========================================================= */

const AdminRoute = ({ children }) => {
  // ACV Plus authentication data
  const token = localStorage.getItem("acvplus-token");
  const savedUser = localStorage.getItem("acvplus-user");

  /* =======================================================
     CHECK LOGIN
  ======================================================= */

  if (!token || !savedUser) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(savedUser);

    /* =====================================================
       CHECK ADMIN ROLE
    ===================================================== */

    if (!user || user.role !== "admin") {
      return <Navigate to="/" replace />;
    }

    /* =====================================================
       ADMIN ACCESS ALLOWED
    ===================================================== */

    return children;
  } catch (error) {
    /*
      If stored user data is corrupted or invalid,
      clear ACV Plus authentication data.
    */

    localStorage.removeItem("acvplus-token");
    localStorage.removeItem("acvplus-user");

    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;
