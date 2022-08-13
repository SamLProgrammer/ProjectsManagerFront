import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/client.jpg";

const RegisterAdmon = () => {
  return (
    <Link to="/" className="navbar-logo">
      <div className="logo">
        <img src={logo} alt="P-WorkFlow" width="1000" height="570" />
      </div>
    </Link>
  );
};

export default RegisterAdmon;
