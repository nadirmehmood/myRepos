import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let role = "";

  const [users, setUsers] = useState({
    email: "",
    password: "",
  });

  const [login, setLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState(false);

  let navigate = useNavigate();
  const { email, password } = users;
  let flag = true;

  const inputChangeEvent = (e) => {
    const { name, value } = e.target;
    setUsers({ ...users, [name]: value });
  };

  const AuthUser = async (e) => {
    e.preventDefault();
    const response = await axios.get("http://localhost:3001/users");

    if (sessionStorage.getItem("data") == null) {
      sessionStorage.setItem("data", JSON.stringify(response.data));
    }

    let userdata = JSON.parse(sessionStorage.getItem("data"));

    userdata.map((item) => {
      return users.email === item.email && users.password === item.password
        ? ((flag = false),
          (role = item.role),
          sessionStorage.removeItem("data"),
          sessionStorage.setItem("data", JSON.stringify(item)))
        : null;
    });

    if (flag === false && role === "admin") {
      // const resp = await axios.get("http://localhost:3001/data");
      // console.log(resp.data);

      navigate("/home");
      setLogin(false);
    } else {
      if (flag === false && role === "user") {
        navigate("/public");
        sessionStorage.removeItem("data");
        setLogin(false);
      } else {
        sessionStorage.removeItem("data");
        setErrorMsg(true);
      }
    }
  };

  return (
    <>
      {login ? (
        <div className="container">
          <div className="login-form">
            <Form onSubmit={AuthUser} className="form">
              <Form.Group className=" mb-3" controlId="formBasicEmail">
                <h1 className="text-center mb-4">Login Page</h1>

                <Form.Control
                  className="input"
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
                <Form.Control
                  className="input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={inputChangeEvent}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="submit-btn">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Login;
