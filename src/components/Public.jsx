import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import "./Home.css";
import { IconContext } from "react-icons";
import Profile from "../pages/Profile";
import { Button, Table } from "react-bootstrap";
import MakeUserTransaction from "../pages/MakeUserTransaction";
import axios from "axios";

let getTransData;

const Public = () => {
  const { state } = useLocation();

  let loggedInUser = [];
  loggedInUser.push(state);

  const [transFlag, setTransFlag] = useState(false);

  let navigate = useNavigate();
  useEffect(() => {
    let data = sessionStorage.getItem("data");
    if (data === null) {
      navigate("/");
    }
    transDoneFunction();
  }, []);

  const [sidebar, setSidebar] = useState(true);

  const [showModal, setShowModal] = useState({
    profile: false,
    transaction: false,
  });

  const showSidebar = () => setSidebar(!sidebar);

  const logOut = () => {
    sessionStorage.clear();
  };

  const handleShow = (modalType) => {
    if (modalType === "profile") {
      setShowModal({
        profile: true,
        transaction: false,
      });
    } else {
      if (modalType === "transaction") {
        setShowModal({
          profile: false,
          transaction: true,
        });
      }
    }
  };
  const handleClose = () => {
    setShowModal(!showModal);
  };

  const transDoneFunction = async () => {
    const response = await axios.get("http://localhost:3001/transactions");

    getTransData = response.data.filter((item) => {
      return item.email === loggedInUser[0].email;
    });
    setTransFlag(true);
  };

  return (
    <>
      <IconContext.Provider value={{ color: "white" }}>
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
              <button
                className="button-link"
                onClick={() => handleShow("profile")}
              >
                <FaIcons.FaUser />
                <span className="span">Profile</span>
              </button>
            </li>

            <li className="nav-text">
              <Link to="/" className="button-link" onClick={logOut}>
                <AiIcons.AiOutlineLogout />
                <span className="span">Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
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
              {showModal.profile ? (
                <Profile showModal={showModal} handleClose={handleClose} />
              ) : showModal.transaction ? (
                <MakeUserTransaction
                  showModal={showModal}
                  handleClose={handleClose}
                  transDoneFunction={transDoneFunction}
                  transFlag={() => setTransFlag(true)}
                />
              ) : null}
            </div>
          </div>
        </section>

        <section
          className="section text-dark mt-3"
          style={{
            marginLeft: sidebar ? "18.2%" : null,
            transition: sidebar ? "1120ms" : null,
          }}
        >
          <Table hover variant="light">
            <thead>
              <tr>
                <th scope="row">#</th>
                <th scope="row">Id</th>
                <th scope="row">Email</th>
                <th scope="row">Account No</th>
                <th scope="row">Account Type</th>
                <th scope="row">Account Title</th>
              </tr>
            </thead>
            <tbody>
              {transFlag
                ? getTransData.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.accountNo}</td>
                        <td>{item.accountType}</td>
                        <td>{item.accountTitle}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>
          <Button type="button" onClick={() => handleShow("transaction")}>
            Make Transaction
          </Button>
        </section>
      </IconContext.Provider>
    </>
  );
};

export default Public;
