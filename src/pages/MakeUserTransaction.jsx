import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const MakeUserTransaction = (props) => {
  const { state } = useLocation();

  let username = "";
  let email = "";

  let loggedInUser = [];
  loggedInUser.push(state);

  const [mkTrnsctn, setMkTrnsctn] = useState({
    accountNo: "",
    accountType: "",
  });

  const { accountNo, accountType } = mkTrnsctn;
  loggedInUser.map((item) => {
    return (username = item.name), (email = item.email);
  });

  const inputChangeEvent = (e) => {
    const { name, value } = e.target;
    setMkTrnsctn({
      ...mkTrnsctn,
      [name]: value,
      id: new Date().getTime().toString(),
      accountTitle: username,
      email: email,
      iban: `pk${new Date().getTime().toString()}`,
    });
  };

  const addTransaction = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/transactions", mkTrnsctn)
      .then(() => props.transDoneFunction());

    props.handleClose();
    props.transFlag();
  };

  return (
    <>
      <Modal show={props.showModal} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Make Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addTransaction}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter account no"
                name="accountNo"
                value={accountNo}
                onChange={inputChangeEvent}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Select
                name="accountType"
                value={accountType}
                onChange={inputChangeEvent}
              >
                <option>Select account type</option>
                <option value="saving">Saving</option>
                <option value="current">Current</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MakeUserTransaction;
