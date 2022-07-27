import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [users, setUsers] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { email, password } = users;
  let flag = true;

  const storeDataSessionStorage = async () => {
    const response = await axios.get("http://localhost:3001/users");

    if (sessionStorage.getItem("data") == null) {
      sessionStorage.setItem("data", JSON.stringify(response.data));
    }
  };

  const inputChangeEvent = (e) => {
    const { name, value } = e.target;
    setUsers({ ...users, [name]: value });
  };

  const AuthUser = (e) => {
    e.preventDefault();
    let userdata = JSON.parse(sessionStorage.getItem("data"));

    userdata.map((item) => {
      return users.email === item.email && users.password === item.password
        ? (flag = false)
        : null;
    });
    if (flag === false) {
      navigate("/Home");
      console.log("Matched");
    } else {
      console.log("Not Matched");
    }
  };

  useEffect(() => {
    storeDataSessionStorage();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="login-form">
              <Form onSubmit={AuthUser}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={inputChangeEvent}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={inputChangeEvent}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
