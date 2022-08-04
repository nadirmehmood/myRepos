import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

let loggedInUser;

const Login = () => {
  let myrole = "";

  const [passMatch, setPassMatch] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cfPassword: "",
    phone: "",
    city: "",
  });

  const [login, setLogin] = useState(true);
  const [authUserForm, setAuthUserForm] = useState(true);

  let navigate = useNavigate();

  const { name, email, password, cfPassword, phone, city } = user;

  let flag = true;

  const inputChangeEvent = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      id: new Date().getTime().toString(),
      role: "user",
    });
  };

  // OnSubmit Function
  const AuthUser = async (e) => {
    e.preventDefault();
    let cfPass = false;

    let userArr = [];
    userArr.push(user);
    userArr.map((item) =>
      item.password === item.cfPassword ? (cfPass = true) : null
    );

    //   if ()  checking password match

    if (authUserForm) {
      const response = await axios.get("http://localhost:3001/users");

      if (sessionStorage.getItem("data") === null) {
        sessionStorage.setItem("data", JSON.stringify(response.data));
      }

      let userdata = JSON.parse(sessionStorage.getItem("data"));

      userdata.map((item) => {
        return user.email === item.email && user.password === item.password
          ? ((flag = false),
            (myrole = item.role),
            (loggedInUser = item),
            sessionStorage.removeItem("data"),
            sessionStorage.setItem("data", JSON.stringify(item.email)),
            sessionStorage.setItem("role", JSON.stringify(item.role)),
            sessionStorage.setItem("name", JSON.stringify(item.name)))
          : null;
      });

      if (flag === false && myrole === "admin") {
        setLogin(false);
        // console.log(loggedInUser);
        navigate("/home");
      } else {
        if (flag === false && myrole === "user") {
          navigate("/public", { state: loggedInUser });
          setLogin(false);
        } else {
          sessionStorage.removeItem("data");
        }
      }
    } else {
      if (cfPass) {
        const response = await axios.get("http://localhost:3001/users");
        let usersArray = response.data;

        usersArray.map((item) => {
          return item.email === user.email ? (flag = false) : null;
        });

        if (flag === false) {
          alert("email already exists");
        } else {
          await axios
            .post("http://localhost:3001/users", user)
            .then(() => setAuthUserForm(true));
        }
      } else {
        setPassMatch(true);
      }
    }
  };

  useEffect(() => {
    let myrole = JSON.parse(sessionStorage.getItem("role"));
    if (myrole === "user") {
      navigate("/public");
    } else {
      if (myrole === "admin") {
        navigate("/home");
      }
    }
  }, []);

  return (
    <>
      {login ? (
        <div className="container">
          <div className="login-form">
            <Form
              onSubmit={AuthUser}
              className="form"
              style={{ marginTop: authUserForm ? "150px" : "50px" }}
            >
              {authUserForm ? (
                <>
                  <Form.Group className=" mb-3">
                    <h1 className="text-center mb-4">Login</h1>

                    <Form.Control
                      className="input"
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={email}
                      onChange={inputChangeEvent}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      className="input"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={inputChangeEvent}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="submit-btn"
                  >
                    Submit
                  </Button>
                  <div className="signUp-dev">
                    <span className="dont-text">Don't have an account ? </span>
                    <a onClick={() => setAuthUserForm(false)}>
                      <span className="signUp-text">SignUp</span>
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <Form.Group className=" mb-3">
                    <h1 className="text-center mb-4">SignUp</h1>
                    <Form.Control
                      className="input"
                      type="text"
                      placeholder="Enter username"
                      name="name"
                      value={name}
                      onChange={inputChangeEvent}
                    />
                  </Form.Group>

                  <Form.Group className=" mb-3">
                    <Form.Control
                      className="input"
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={email}
                      onChange={inputChangeEvent}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      className="input"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={inputChangeEvent}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      className="input"
                      type="password"
                      placeholder="Confirm Password"
                      name="cfPassword"
                      value={cfPassword}
                      onChange={inputChangeEvent}
                    />
                    {passMatch ? (
                      <Form.Text className=" w-25" style={{ color: "red" }}>
                        password and confirm password don't match
                      </Form.Text>
                    ) : null}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      className="input"
                      type="text"
                      placeholder="phone"
                      name="phone"
                      value={phone}
                      onChange={inputChangeEvent}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      className="input"
                      type="text"
                      placeholder="city"
                      name="city"
                      value={city}
                      onChange={inputChangeEvent}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="submit-btn"
                  >
                    Submit
                  </Button>
                  <div className="signUp-dev">
                    <span className="dont-text">Already have an account ?</span>
                    <a onClick={() => setAuthUserForm(true)}>
                      <span className="signUp-text">Login</span>
                    </a>
                  </div>
                </>
              )}
            </Form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Login;
