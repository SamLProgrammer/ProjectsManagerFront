import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Login/Login";
import PagesAdmon from "../components/PagesAdmon";
import PagesClient from "../components/Register/PagesClient";

const EmployeeProtectedRoute = ({ children }) => {
  let user = true;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AdminProtectedRoute = ({ children }) => {
  let user = true;
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin/*"
          element={
            <AdminProtectedRoute>
              <PagesAdmon />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/employee/*"
          element={
            <EmployeeProtectedRoute>
              <PagesClient />
            </EmployeeProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
