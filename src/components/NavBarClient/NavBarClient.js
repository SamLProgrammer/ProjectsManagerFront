import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { navItems } from "./NavItemsClient";
import Dropdown from "./DropdownClient";

function NavBar() {
  let localstorageData = localStorage.getItem("user_name");
  const [dropDown, setDropdown] = useState(false);

  function logOut() {
    localStorage.clear();
  }
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <div className="logo">
          <img src={logo} alt="P-WorkFlow" width="200" />
        </div>
      </Link>
      <nav>
        <h1>
          <label className="HomeLabel"> Bienvenido : {localstorageData} </label>
        </h1>
      </nav>
      <ul className="nav-items">
        {navItems.map((item) => {
          if (item.title === "Actividad") {
            return (
              <li
                key={item.id}
                className={item.cName}
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
              >
                <Link className="a6 "to={item.path}>{item.title}</Link>
                {dropDown && <Dropdown />}
              </li>
            );
          }

          return (
            <li key={item.id} className={item.cName}>
              <Link className="a6 "to={item.path}>{item.title}</Link>
            </li>
          );
        })}
        <li className="nav-item" onClick={logOut}>
          <Link className="a6 " to="/"> Cerrar sesión</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
