import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import SidebarData from "./SidebarData";
import "./Home.css";
import { IconContext } from "react-icons";

const Home = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const logOut = () => {
    sessionStorage.removeItem("data");
  };
  return (
    <>
      <IconContext.Provider value={{ color: "red" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} className="toggle-btn" />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars" onClick={showSidebar}>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {/* {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })} */}
            <li className="nav-text">
              <Link to="/home/Users">
                <FaIcons.FaUser />
                <span>Users</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/home/Transactions">
                <FaIcons.FaDatabase />
                <span>Transactions</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/" onClick={logOut}>
                <AiIcons.AiOutlineLogout />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Home;
