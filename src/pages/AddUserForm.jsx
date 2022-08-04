import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const AddUserForm = (props) => {
  const [user, setUser] = useState({
    title: "",
    status: "",
    description: "",
  });

  const { title, status, description } = user;

  const InputChangeEvent = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, id: new Date().getTime().toString(), [name]: value });
  };

  const addNewUser = async (e) => {
    e.preventDefault();

    const response = await axios.get("http://localhost:3001/data");
    let userArray = [];
    userArray.push(response.data);

    let ExistUser = false;

    userArray
      .flat()
      .map((item) => (item.title === user.title ? (ExistUser = true) : null));
    if (ExistUser) {
      alert("User Already Exist");
    } else {
      await axios.post("http://localhost:3001/data", user);
    }
    props.handleClose();
    props.getDataArray();
  };

  return (
    <>
      <Form onSubmit={addNewUser}>
        <Form.Group className="mb-3" controlId="formBasicQuantity">
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="title"
            value={title}
            onChange={InputChangeEvent}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Select name="status" onChange={InputChangeEvent} value={status}>
            <option>Select status</option>
            <option value="active">Active</option>
            <option value="de-active">De-active</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="text"
            placeholder="Description"
            name="description"
            value={description}
            onChange={InputChangeEvent}
          ></Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddUserForm;
