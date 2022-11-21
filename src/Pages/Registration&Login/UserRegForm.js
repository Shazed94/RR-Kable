import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BACKEND_BASE_URL } from "../../Components/GlobalVariables";
import "./customerRegForm.css";

const UserRegForm = () => {
  const Name = useRef();
  const Email = useRef();
  const Password = useRef();
  const ContactNo = useRef();
  const ConfirmPassword = useRef();


  // const [userRegInfo, setUserRegInfo] = useState(initialValues);

  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [confirmPassError, setConfirmPassError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  // const [records, setRecords] = useState([]);

  // const handleInput = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;

  //   setUserRegInfo({ ...userRegInfo, [name]: value });
  // };

  const handleSubmit = (e) => {
    // setFormErrors(validate(userRegInfo));
    setIsSubmit(true);

    const formdata = new FormData();
    formdata.append("name", Name.current.value);
    formdata.append("email", Email.current.value);
    formdata.append("phone", ContactNo.current.value);
    formdata.append("password", Password.current.value);
    formdata.append("confirm_password", ConfirmPassword.current.value);

    axios
      .post(`${BACKEND_BASE_URL}/api/customer/registration/store`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      .then((response) => {
        if (response.data.status == 400) {
          console.log(response.data);
          const { name, email, password, confirm_password } =
            response.data.errors;
          setUserNameError(name);
          setEmailError(email);
          setPassError(password);
          setConfirmPassError(confirm_password);
        }

        if (response.data.status === 200) {
          Swal.fire({
            icon: "success",
            text: response.data.message,
            confirmButtonColor: "#5eba86",
          });
          setUserNameError("");
          setEmailError("");
          setPassError("");
          setConfirmPassError("");
          e.target.reset();
        }
      });
    e.preventDefault();

    // const newRecord = { ...userRegistration };
    // console.log(userRegInfo);
  };


  return (
    <div className="form_wrapper" style={{ backgroundColor: "#f9fafb" }}>
      <Container className="container">
        <Form id="form" className="form" onSubmit={handleSubmit}>
          <h1>Register With Us</h1>
          {/* =============== User Name ================= */}
          <Form.Group className="form_group">
            <Form.Label>
              Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              id="userName"
              placeholder="Enter username"
              name="userName"
              ref={Name}
              // value={userRegInfo.userName}
              // onChange={handleInput}
            />
            <small className="small_msg">{userNameError}</small>
          </Form.Group>
          {/* ================== Email =================== */}
          <Form.Group className="form_group">
            <Form.Label>
              Email <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              required
              type="email"
              id="email"
              placeholder="Enter email"
              name="email"
              ref={Email}
              // value={userRegInfo.email}
              // onChange={handleInput}
            />
            <small className="small_msg">{emailError}</small>
          </Form.Group>
          {/* ============== Phone No ===================== */}
          <Form.Group className="form_group">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              id="phone"
              placeholder="Enter contact number"
              name="phoneNo"
              ref={ContactNo}
              // value={userRegInfo.phoneNo}
              // onChange={handleInput}
            />
            <small className="small_msg"></small>
          </Form.Group>
          {/* ============== Password ===================== */}
          <Form.Group className="form_group">
            <Form.Label>
              Password <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              required
              type="password"
              id="password"
              placeholder="Enter password"
              name="password"
              ref={Password}
              // value={userRegInfo.password}
              // onChange={handleInput}
            />
            <small className="small_msg">{passError}</small>
          </Form.Group>
          {/* ================= Confirm Password ========== */}
          <Form.Group className="form_group">
            <Form.Label>
              Confirm Password <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              required
              type="password"
              id="retype-password"
              placeholder="Retype password"
              name="confirmPassword"
              ref={ConfirmPassword}
              // value={userRegInfo.confirmPassword}
              // onChange={handleInput}
            />
            <small className="small_msg">{confirmPassError}</small>
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
        <p>
          Already have an account.{" "}
          <Link to="/user/login" className="text-danger">
            Click Here
          </Link>
        </p>
      </Container>
    </div>
  );
};

export default UserRegForm;
