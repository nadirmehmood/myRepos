import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddTransactionFrom = (props) => {
  const [transaction, setTransaction] = useState({
    accountNo: "",
    email: "",
    iban: "",
    accountTitle: "",
    accountType: "",
  });

  const InputChangeEvent = (e) => {
    const { name, value } = e.target;
    setTransaction({
      ...transaction,
      id: new Date().getTime().toString(),
      [name]: value,
    });
  };

  const { accountNo, email, iban, accountTitle, accountType } = transaction;

  const addNewTransaction = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/transactions", transaction);
    props.handleClose();
    props.getTransactionArray();
  };

  return (
    <>
      <Form onSubmit={addNewTransaction}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter account no"
            name="accountNo"
            value={accountNo}
            onChange={InputChangeEvent}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={InputChangeEvent}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter IBAN"
            name="iban"
            value={iban}
            onChange={InputChangeEvent}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter account title"
            name="accountTitle"
            value={accountTitle}
            onChange={InputChangeEvent}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Select
            name="accountType"
            value={accountType}
            onChange={InputChangeEvent}
          >
            <option>Select account type</option>
            <option value="saving">Saving</option>
            <option value="current">Current</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddTransactionFrom;
