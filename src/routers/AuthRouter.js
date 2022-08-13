import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../components/Login/Login";

const AuthRouter = () => {
  return (
    <div>
      <div>
        <Routes>
          <Route path="login" element={<Login />} />

          <Route path="*" element={<Navigate to={"login"} replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default AuthRouter;
