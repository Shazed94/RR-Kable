import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import axios from "axios";
import { BACKEND_BASE_URL } from "./GlobalVariables";
import Swal from "sweetalert2";

const ContactForm = () => {
  const userName = useRef();
  const userEmail = useRef();
  const userPhone = useRef();
  const subject = useRef();
  const userMessage = useRef();

  // ============================= form submit to backend ======================

  const storeData = (e) => {
    const formdata = new FormData();
    formdata.append("name", userName.current.value);
    formdata.append("email", userEmail.current.value);
    formdata.append("phone", userPhone.current.value);
    formdata.append("subject", subject.current.value);
    formdata.append("message", userMessage.current.value);

    axios
      .post(`${BACKEND_BASE_URL}/api/contact/form-submit`, formdata, {
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

  return (
    <div>
      <Form onSubmit={storeData}>
        <Row>
          <Form.Group
            as={Col}
            md="6"
            controlId="formGridEmail"
            className="mb-4"
          >
            <Form.Control
              type="text"
              placeholder="Your Name *"
              required
              size="lg"
              ref={userName}
            />
            <small></small>
          </Form.Group>

          <Form.Group
            as={Col}
            md="6"
            controlId="formGridPassword"
            className="mb-4"
          >
            <Form.Control
              type="number"
              placeholder="Phone Number *"
              required
              size="lg"
              ref={userPhone}
            />
            <small></small>

          </Form.Group>
          <Form.Group
            as={Col}
            md="6"
            controlId="formGridEmail"
            className="mb-4"
          >
            <Form.Control
              type="email"
              placeholder="Email Address *"
              required
              size="lg"
              ref={userEmail}
              
            />
            <small></small>

          </Form.Group>

          <Form.Group
            as={Col}
            md="6"
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
            <small></small>

          </Form.Group>
        </Row>

        <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Message *"
            required
            size="lg"
            ref={userMessage}
          />
        </Form.Group>

        <Button size="lg" className="rounded_8px" type="submit">
          Send Message <FaIcons.FaAngleDoubleRight className="ms-2" />
        </Button>
      </Form>
    </div>
  );
};

export default ContactForm;
