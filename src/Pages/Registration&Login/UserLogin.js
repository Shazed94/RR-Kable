import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../App";
import { Link_Path_URL } from "../../Utils/LinkPath";

// import "./customerRegForm.css";

const UserLoginForm = () => {
  const Email = useRef();
  const Password = useRef();

  const [message, setMessage] = useState();
  const [userEmailError, setUserEmailError] = useState("");
  const [userPassError, setUserPassError] = useState("");

  // console.log(message);

  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    const formdata = new FormData();
    formdata.append("email", Email.current.value);
    formdata.append("password", Password.current.value);

    axios
      .post(`${Link_Path_URL}api/customer/login/process`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      .then((response) => {
        if (response.data.status == 400) {
          if (response.data.errors) {
            const { email, password } = response.data.errors;
            setUserEmailError(email);
            setUserPassError(password);
          }
        }
        const { message } = response.data;
        setMessage(message);

        if (response.data.status === 1) {
          localStorage.setItem(
            "cartProductQuantity",
            response.data.cartProductQuantity
          );
          localStorage.setItem("cartTotal", response.data.cartTotal);
          if (localStorage.getItem("USER_TEMP_ID")) {
            axios
              .get(
                `${Link_Path_URL}api/add-to-cart/user/update/${
                  response.data?.loggedInUser?.id
                }/${localStorage.getItem("USER_TEMP_ID")}`
              )
              .then((res) => {
                localStorage.removeItem("USER_TEMP_ID");
                console.log(res.data);
                localStorage.setItem(
                  "cartProductQuantity",
                  res.data.cartProductQuantity
                );
                localStorage.setItem("cartTotal", res.data.cartTotal);
              });
          }
          localStorage.setItem("email", response.data?.loggedInUser?.email);
          localStorage.setItem(
            "LOGGED_IN_USER_ID",
            response.data?.loggedInUser?.id
          );
          navigate(from, { replace: true });
        }
      });
    e.preventDefault();
  };

  return (
    <div className="form_wrapper" style={{ backgroundColor: "#f9fafb" }}>
      <Container className="container">
        <Form id="form" className="form" onSubmit={handleSubmit}>
          {/* <h1>Log In</h1> */}
          <div className="w-100 text-center">
            <img
              src={require("../../Assets/logo.png")}
              alt=""
              className="img-fluid "
            />
          </div>
          <h1> {message ? message : "Log In"}</h1>

          {/* ================== Email =================== */}
          <Form.Group className="form_group">
            <Form.Label>
              Email <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="email"
              id="email"
              placeholder="Enter email"
              name="email"
              ref={Email}
              required
            />
            <small className="small_msg">{userEmailError}</small>
          </Form.Group>

          {/* ============== Password ===================== */}
          <Form.Group className="form_group">
            <Form.Label>
              Password <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              id="password"
              placeholder="Enter password"
              name="password"
              ref={Password}
              required
            />
            <small className="small_msg">{userPassError}</small>
          </Form.Group>

          <Button type="submit">Submit</Button>
        </Form>
        <p>
          Don't have an account?{" "}
          <Link to="/user/registration" className="text-danger">
            Click Here
          </Link>
        </p>
      </Container>
    </div>
  );
};

export default UserLoginForm;
