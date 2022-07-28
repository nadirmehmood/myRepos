import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import SidebarData from "../components/SidebarData";
import "../components/Home.css";
import { IconContext } from "react-icons";
import axios from "axios";

const Users = () => {
  const [sidebar, setSidebar] = useState(false);

  const [userData, setUserData] = useState([]);

  const [users, setUsers] = useState([]);

  const [showData, setShowData] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const dataArray = async () => {
    const response = await axios.get("http://localhost:3001/data");
    setUserData(response.data);
  };
  const usersArray = async () => {
    const userAdmin = await JSON.parse(sessionStorage.getItem("data"));
    let dd = [];
    dd.push(userAdmin);
    setUsers(dd);
  };

  useEffect(() => {
    dataArray();
    usersArray();
  }, []);

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
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
      {/* <Home /> */}
      <div className="show-data" onClick={() => setShowData(!showData)}>
        <span style={{ fontSize: "25px" }}>Active Users</span>
        {userData.map((item, index) => {
          return users.map((item) => (item.role === "admin" ? true : false)) ? (
            <>
              {showData ? (
                <div style={{ padding: "15px" }}>
                  <div>
                    <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                      Name :--
                    </span>
                    {item.title}
                  </div>
                  <div>
                    <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                      Id :--
                    </span>
                    {item.id}
                  </div>
                  <div>
                    <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                      Status :--
                    </span>
                    {item.status}
                  </div>
                </div>
              ) : null}
            </>
          ) : null;
        })}
      </div>
    </>
  );
};

export default Users;
