import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import "./Home.css";
import { IconContext } from "react-icons";
import Users from "../pages/Users";
import Transactions from "../pages/Transactions";

const Home = () => {
  const [sidebar, setSidebar] = useState(true);

  const [usersPageFlag, setUsersPageFlag] = useState(false);

  const [transactionPageFlag, setTransactionPageFlag] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const logOut = () => {
    sessionStorage.clear();
  };

  // checking whether the user is going to which page according to flags

  const pagesFlag = (id) => {
    if (id === 1) {
      setUsersPageFlag(!usersPageFlag);
      if (transactionPageFlag === true) {
        setTransactionPageFlag(!transactionPageFlag);
      }
    } else {
      if (id === 2) {
        setTransactionPageFlag(!transactionPageFlag);
        if (usersPageFlag === true) {
          setUsersPageFlag(!usersPageFlag);
        }
      }
    }
  };

  // when user tries to go to home page without signing in.

  let navigate = useNavigate();
  useEffect(() => {
    let data = sessionStorage.getItem("data");
    if (data === null) {
      navigate("/");
    }
  });

  return (
    <>
      <IconContext.Provider value={{ color: "white" }}>
        {/* navbar start */}

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
              <Link to="/home" className="menu-bars ml-3">
                <AiIcons.AiFillHome />
              </Link>
            </li>
            <li className="nav-text">
              {[1].map((id, index) => (
                <button
                  key={index}
                  className="button-link"
                  onClick={() => pagesFlag(id)}
                >
                  <FaIcons.FaUser />
                  <span className="span">Users</span>
                </button>
              ))}
            </li>
            <li className="nav-text">
              {[2].map((id, index) => (
                <button
                  key={index}
                  className="button-link"
                  onClick={() => pagesFlag(id)}
                >
                  <FaIcons.FaDatabase />
                  <span className="span">Transactions</span>
                </button>
              ))}
            </li>
            <li className="nav-text">
              <Link to="/" onClick={logOut}>
                <AiIcons.AiOutlineLogout />
                <span className="span">Logout</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Navbar Ends */}

        {/* Section */}
        <section
          className="section text-dark mt-3"
          style={{
            marginLeft: sidebar ? "18.2%" : null,
            transition: sidebar ? "1120ms" : null,
          }}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="admin-dash">
                <h1
                  style={{
                    marginBottom: "3%",
                    marginTop: "3%",
                    width: "60%",
                  }}
                >
                  Welcome : {JSON.parse(sessionStorage.getItem("name"))}
                </h1>
              </div>
              {usersPageFlag ? (
                <div className="col-md-12">
                  <div className="table">
                    <Users />
                  </div>
                </div>
              ) : null}

              {transactionPageFlag ? (
                <div className="col-md-12">
                  <div className="table">
                    <Transactions />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </IconContext.Provider>
    </>
  );
};

export default Home;
