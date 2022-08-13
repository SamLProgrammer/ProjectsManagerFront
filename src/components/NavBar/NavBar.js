import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { navItems } from "./NavItems";
import Dropdown from "./DropdownProject";
import DropdownUser from "./DropdownUser";
import Cookies from "universal-cookie";

function NavBar() {
  let name = localStorage.getItem("user_name");
  const cookies = new Cookies();

  const [dropDown, setDropdown] = useState(false);
  const [dropDownUser, setDropdownUser] = useState(false);

  function logOut() {
    localStorage.clear();
  }

  return (
    <nav className="navbar">
      <Link to="/admin" className="navbar-logo">
        <div className="logo">
          <img src={logo} alt="P-WorkFlow" width="200" />
        </div>
      </Link>
      <nav>
        <h1>
          <label className="HomeLabel"> Bienvenido:{name} </label>
        </h1>
      </nav>
      <ul className="nav-items">
        {navItems.map((item) => {
          if (item.title === "Proyecto") {
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
          if (item.title === "Usuarios") {
            return (
              <li
                key={item.id}
                className={item.cName}
                onMouseEnter={() => setDropdownUser(true)}
                onMouseLeave={() => setDropdownUser(false)}
              >
                <Link className="a6 " to={item.path}>{item.title}</Link>
                {dropDownUser && <DropdownUser />}
              </li>
            );
          }

          return (
            <li key={item.id} className={item.cName}>
              <Link className="a6 " to={item.path}>{item.title}</Link>
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
