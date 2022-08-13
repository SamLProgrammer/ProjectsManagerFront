import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/arquitectura.jpg";

const RegisterAdmon = () => {
  return (
    <Link to="/admin" className="navbar-logo">
      <div className="logo">
        <img src={logo} alt="P-WorkFlow" width="1000" height="570" />
      </div>
    </Link>
  );
};

export default RegisterAdmon;
