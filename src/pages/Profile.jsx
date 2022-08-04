import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./Profile.css";

const Profile = (props) => {
  const { state } = useLocation();

  let loggedInUser = [];
  loggedInUser.push(state);

  return (
    <>
      <Modal show={props.showModal} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container d-flex justify-content-center">
            <div className="row">
              {loggedInUser.map((item) => {
                return (
                  <div className="card">
                    <img
                      src={require("../components/images/profile.jpg")}
                      alt="John"
                      style={{ width: "100%" }}
                    />
                    <h1 className="mt-3">{item.name}</h1>
                    <p className="title">{item.role}</p>
                    <p>{item.email}</p>
                    <div className="d-flex justify-content-center">
                      Phone : {item.phone}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
