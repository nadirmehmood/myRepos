import React from "react";

import { Modal, Button } from "react-bootstrap";
import AddUserForm from "./AddUserForm";
import AddTransactionFrom from "./AddTransactionFrom";

const CrudModal = (props) => {
  return (
    <>
      <div>
        <Modal show={props.modalState} onHide={props.handleClose}>
          <Modal.Header closeButton>
            {props.modalState.addUser ? (
              <Modal.Title>Add User</Modal.Title>
            ) : (
              <Modal.Title>Add Transaction</Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            {props.modalState.addUser ? (
              <AddUserForm
                handleClose={props.handleClose}
                getDataArray={props.getDataArray}
              />
            ) : props.modalState.addTransaction ? (
              <AddTransactionFrom
                handleClose={props.handleClose}
                getTransactionArray={props.getTransactionArray}
              />
            ) : null}
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default CrudModal;
