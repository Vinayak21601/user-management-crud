import React, { useState } from "react";
import { FaUsers, FaUserPlus } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("/");

  const handleLinkClick = (path) => {
    setActiveLink(path); // Update the active link state
  };

  return (
    <aside className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        {/* <li>
          <Link
            to="/"
            onClick={() => handleLinkClick("/")}
            className={activeLink === "/" ? "active-link" : ""}
          >
            <FaUsers className="icon" /> Dashboard
          </Link>
        </li> */}
        <li>
          <Link
            to="/users"
            onClick={() => handleLinkClick("/users")}
            className={activeLink === "/users" ? "active-link" : ""}
          >
            <FaPerson className="icon" /> User List
          </Link>
        </li>
        <li>
          <Link
            to="/add-user"
            onClick={() => handleLinkClick("/add-user")}
            className={activeLink === "/add-user" ? "active-link" : ""}
          >
            <FaUserPlus className="icon" /> Add User
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
