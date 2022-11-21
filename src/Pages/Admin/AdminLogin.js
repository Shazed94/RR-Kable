import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import * as AiIcons from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BACKEND_BASE_URL } from "../../Component/GlobalVariables";
import "../Registration&Login/customerRegForm.css";

const AdminLoginForm = () => {
  const AdminEmail = useRef();
  const AdminPassword = useRef();

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [adminEmailError, setAdminEmailError] = useState("");
  const [adminPassError, setAdminPassError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    const formdata = new FormData();
    formdata.append("email", AdminEmail.current.value);
    formdata.append("password", AdminPassword.current.value);

    axios
      .post(`${BACKEND_BASE_URL}/api/admin/login/process`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      .then((response) => {
        console.log(response.data);
        if (response.data.status == 400) {
          if (response.data.errors) {
            const { email, password } = response.data.errors;
            setAdminEmailError(email);
            setAdminPassError(password);
          }
          const { message } = response.data;
          setMessage(message);
          setShow(true);
        }
        if (response.data.status === 1) {
          localStorage.setItem(
            "adminemail",
            response.data?.loggedInAdmin?.email
          );
          localStorage.setItem("adminName", response.data?.loggedInAdmin?.name);
          localStorage.setItem(
            "LOGGED_IN_ADMIN_ID",
            response.data?.loggedInAdmin?.id
          );
          navigate(from, { replace: true });

          Swal.fire({
            icon: "success",
            text: response.data.message,
            confirmButtonColor: "#5eba86",
          });
          // setUserLoginInfo(initialValues);
          setAdminEmailError("");
          setAdminPassError("");
          e.target.reset();
        }
      });
    e.preventDefault();

    // const newRecord = { ...userRegistration };
  };

  const [passType, setPassType] = useState("password");
  const handlePasswordType = () => {
    if (passType == "password") {
      setPassType("text");
    }
    if (passType == "text") {
      setPassType("password");
    }
  };

  return (
    <div className="form_wrapper" style={{ backgroundColor: "#f9fafb" }}>
      <Container className="container">
        <ToastContainer position="top-center" className="p-3 toast_msg">
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            bg="danger"
            autohide
          >
            <Toast.Body>
              <strong className="ms-3">{message ? message : ""}</strong>
            </Toast.Body>
          </Toast>
        </ToastContainer>
        <div className="w-100 text-center">
          <img
            src={require("../../Assets/logo.png")}
            alt=""
            className="img-fluid "
          />
        </div>
        <Form id="form" className="form" onSubmit={handleSubmit}>
          <h1>Admin Login</h1>

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
              ref={AdminEmail}
            />
            <small className="small_msg">
              {adminEmailError && adminEmailError}
            </small>
          </Form.Group>

          {/* ============== Password ===================== */}
          <Form.Group className="form_group position-relative">
            <Form.Label>
              Password <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type={passType}
              id="password"
              placeholder="Enter password"
              name="password"
              ref={AdminPassword}
            />
            <div className="eye_icon" onClick={handlePasswordType}>
              <AiIcons.AiFillEye size="1.2em" />
            </div>
            <small className="small_msg">
              {adminPassError && adminPassError}
            </small>
          </Form.Group>

          <Button type="submit" className="w-100 login_btn">
            Log In
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default AdminLoginForm;
