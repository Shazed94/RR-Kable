import axios from "axios";
import React, { useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BACKEND_BASE_URL } from "../../Components/GlobalVariables";
import Header from "../../Components/Header/Header";

const UserRegistration = () => {
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

  // ==================== Toggle Control ========================

  const [loginFormDisplay, setLoginFormDisplay] = useState(true);
  const [loginBtnDisplay, setLoginBtnDisplay] = useState(false);

  const [regFormDisplay, setRegFormDisplay] = useState(false);
  const [regBtnDisplay, setRegBtnDisplay] = useState(true);

  const regControl = (e) => {
    e.preventDefault();
    setRegBtnDisplay(true);
    setRegFormDisplay(false);
    setLoginBtnDisplay(false);
    setLoginFormDisplay(true);
  };

  const loginControl = (e) => {
    e.preventDefault();
    setRegBtnDisplay(false);
    setRegFormDisplay(true);
    setLoginBtnDisplay(true);
    setLoginFormDisplay(false);
  };

  // ============================ REGISTRATION =========================

  const handleRegSubmit = (e) => {
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

  // ================================ LOGIN ===========================
  const LEmail = useRef();
  const LPassword = useRef();

  const [message, setMessage] = useState();
  const [userEmailError, setUserEmailError] = useState("");
  const [userPassError, setUserPassError] = useState("");

  // console.log(message);

  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const LoginHandleSubmit = (e) => {
    const formdata = new FormData();
    formdata.append("email", LEmail.current.value);
    formdata.append("password", LPassword.current.value);

    axios
      .post(`${BACKEND_BASE_URL}/api/customer/login/process`, formdata, {
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
                `${BACKEND_BASE_URL}/api/add-to-cart/user/update/${
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
            "customerName",
            response.data?.loggedInUser?.name
          );
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
    <div>
      <Header />
      <Container className="main_section">
        <Row>
          <Col
            md={6}
            className="mt-5 p-5"
            style={{ borderRight: "1px solid #ccc" }}
          >
            <Form
              id="regform"
              className="form"
              onSubmit={handleRegSubmit}
              style={{ display: regFormDisplay == true ? "block" : "none" }}
            >
              <h3 className="fw-bold">REGISTRERA</h3>
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

              <p>
                En länk för att ställa in ett nytt lösenord kommer att skickas
                till din e-postadress.
              </p>
              <p>
                Dina personuppgifter kommer användas för att förbättra din
                upplevelse på webbplatsen, hantera åtkomst till ditt konto och
                för andra ändamål som beskrivs i vår integritetspolicy.
              </p>
              <Button type="submit" variant="danger" className="w-100 border-0">
                REGISTRERA
              </Button>
            </Form>
            <Form
              id="loginform"
              className="form"
              onSubmit={LoginHandleSubmit}
              style={{ display: loginFormDisplay == true ? "block" : "none" }}
            >
              {/* <h1>Log In</h1> */}
              <h1> {message ? message : "LOGGA IN"}</h1>

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
                  ref={LEmail}
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
                  ref={LPassword}
                  required
                />
                <small className="small_msg">{userPassError}</small>
              </Form.Group>

              <Button type="submit">Submit</Button>
            </Form>
          </Col>

          <Col md={6} className="mt-5 p-5 text-center">
            <h3 className="fw-bold fs-6">LOGGA IN</h3>
            <p>
              Registrering för den här webbplatsen ger dig tillgång till din
              orderstatus och historia. Fyll bara i fälten nedan och vi kommer
              att få ett nytt konto för dig på nolltid. Vi kommer bara att fråga
              dig om information som behövs för att göra inköpsprocessen
              snabbare och enklare.
            </p>
            <div className="text-center d-flex justify-content-center">
              <Button
                type="button"
                className="btn-info border-0"
                style={{ display: loginBtnDisplay == true ? "block" : "none" }}
                onClick={regControl}
              >
                LOGGA IN
              </Button>
              <Button
                type="button"
                className="btn-info border-0"
                style={{ display: regBtnDisplay == true ? "block" : "none" }}
                onClick={loginControl}
              >
                REGISTRERA
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserRegistration;
