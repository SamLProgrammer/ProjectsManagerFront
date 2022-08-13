import React from "react";
import { ProjectItems } from "./NavItems";
import { Link } from "react-router-dom";
import { useState } from "react";

function Dropdown() {
  const [dropdown, setDropdown] = useState(false);

  return (
    <>
      <ul
        className={dropdown ? "services-submenu clicked" : "services-submenu"}
        onClick={() => setDropdown(!dropdown)}
      >
        {ProjectItems.map((item) => {
          return (
            <li key={item.id}>
              <Link
                to={item.path}
                className={item.cName}
                onClick={() => setDropdown(false) }
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;

/* {{Items.map((item) => {
          if (item.name === 'ProjectItems') {
            {item.values.map((subitem) => {
              return (
                <li key={subitem.id}>
                  <Link
                    to={subitem.path}
                    className={subitem.cName}
                    onClick={() => setDropdown(false)}
                  >
                    {subitem.title}
                  </Link>
                </li>
              );
            })}
          }
        })} }*/
