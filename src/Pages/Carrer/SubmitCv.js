import axios from "axios";
import React, { useState } from "react";
import { useRef } from "react";
import { Button, Col, Form, Row, Toast, ToastContainer } from "react-bootstrap";
import Swal from "sweetalert2";
import { BACKEND_BASE_URL } from "../../Component/GlobalVariables";

const SubmitCv = () => {
  const areaOfOperation = useRef();
  const userName = useRef();
  const currentEmployer = useRef();
  const useEmail = useRef();
  const userContactNo = useRef();
  const country = useRef();
  const subject = useRef();
  const message = useRef();
  const userResume = useRef();

  // ============================= form submit to backend ======================

  const storeData = (e) => {
    const formdata = new FormData();
    formdata.append("area_of_operation", areaOfOperation.current.value);
    formdata.append("name", userName.current.value);
    formdata.append("current_employer", currentEmployer.current.value);
    formdata.append("email", useEmail.current.value);
    formdata.append("contact_no", userContactNo.current.value);
    formdata.append("country", country.current.value);
    formdata.append("subject", subject.current.value);
    formdata.append("message", message.current.value);

    formdata.append("resume", userResume.current.files[0]);

    axios
      .post(`${BACKEND_BASE_URL}/api/career/form-submit`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      .then((response) => {
        if (response.data.status === 200) {
          Swal.fire({
            icon: "success",
            text: response.data.message,
            confirmButtonColor: "#5eba86",
          });
          e.target.reset();
        }
      });
    e.preventDefault();
  };

  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");

  const allowedFileTypes = [".doc", ".docx", "application/pdf"];

  const uploadHandler = (event) => {
    // const file = event.target.files[0];
    let file_size = event.target.files[0].size;
    let file_type = event.target.files[0].type;

    if (!allowedFileTypes.includes(file_type)) {
      setErr("File must be .doc,.docx,pdf");
      setShow(true);
      event.target.value = null;
      return false;
    }

    if (file_size > 5000001) {
      setErr("Size can not be more than 5 MB");
      setShow(true);
      event.target.value = null;
      return false;
    }
    setShow(false);
  };
  return (
    <div>
      <ToastContainer className="p-3 position-fixed" style={{ right: "0" }}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Body className="bg-danger cl_white rounded-3">
            <strong className="me-auto">{err}</strong>
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Form className="home " onSubmit={storeData}>
        <Row className="carrer_form">
          <Form.Group as={Col} md="6" className="mb-4">
            <Form.Control
              type="text"
              placeholder="Area of operations "
              size="lg"
              ref={areaOfOperation}
            />
          </Form.Group>

          <Form.Group as={Col} md="6" className="mb-4">
            <Form.Control
              type="text"
              placeholder="Your Name *"
              required
              size="lg"
              ref={userName}
            />
          </Form.Group>

          <Form.Group as={Col} md="6" className="mb-4">
            <Form.Control
              type="text"
              placeholder="Current Employer *"
              required
              size="lg"
              ref={currentEmployer}
            />
          </Form.Group>

          <Form.Group as={Col} md="6" className="mb-4">
            <Form.Control
              type="email"
              placeholder="Email Address *"
              required
              size="lg"
              ref={useEmail}
            />
          </Form.Group>

          <Form.Group as={Col} md="6" className="mb-4">
            <Form.Control
              type="number"
              placeholder="Contact Number *"
              required
              size="lg"
              ref={userContactNo}
            />
          </Form.Group>

          <Form.Group as={Col} md="6" className="mb-4">
            <Form.Control
              type="text"
              placeholder="Country "
              size="lg"
              ref={country}
            />
          </Form.Group>

          <Form.Group
            as={Col}
            md="12"
            controlId="formGridPassword"
            className="mb-4"
          >
            <Form.Control
              type="text"
              placeholder="Subject *"
              required
              size="lg"
              ref={subject}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Message *"
              required
              size="lg"
              ref={message}
            />
          </Form.Group>
        </Row>

        <Form.Group className="position-relative mb-3 w_xs_100_md_50 ">
          <Form.Label className="text-muted f_medium">
            Upload File :{" "}
          </Form.Label>
          <Form.Control
            className="fileUp_button"
            type="file"
            required
            name="file"
            accept=".doc,.docx,application/pdf"
            onChange={uploadHandler}
            ref={userResume}
          />
          <Form.Label className="text-muted  my-2  lh-1">
            Please upload Resume in 3 document type: Doc, Docx and PDF &
            size-limit - 5mb
          </Form.Label>
        </Form.Group>

        <Button type="submit" size="lg" className=" w_xs_100_md_50">
          Send
        </Button>
      </Form>
    </div>
  );
};

export default SubmitCv;
