import axios from "axios";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { BACKEND_BASE_URL } from "../../Component/GlobalVariables";

const Download = () => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const contactNo = useRef();

  const storeData = (e) => {
    const formdata = new FormData();
    formdata.append("first_name", firstName.current.value);
    formdata.append("last_name", lastName.current.value);
    formdata.append("email", email.current.value);
    formdata.append("contact_no", contactNo.current.value);
    axios
      .post(`${BACKEND_BASE_URL}/api/download/form-submit`, formdata, {
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
          setFormVal([
            <div className="mt-5 p-2">
              <a
                href={require("../../Assets/Download.pdf")}
                download
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Download brochure
              </a>
            </div>,
          ]);
        }
      });
    e.preventDefault();
  };

  const [formVal, setFormVal] = useState([
    <Form onSubmit={storeData}>
      <small className="text-muted f_medium">
        Please fill in the details to download our brochures
      </small>
      <Row className="mt-2">
        <Form.Group as={Col} sm="6" className="mb-4">
          <Form.Control
            type="text"
            placeholder="First Name *"
            required
            size="lg"
            ref={firstName}
          />
        </Form.Group>
        <Form.Group as={Col} sm="6" className="mb-4">
          <Form.Control
            type="text"
            placeholder="Last Name *"
            required
            size="lg"
            ref={lastName}
          />
        </Form.Group>

        <Form.Group as={Col} sm="6" className="mb-4">
          <Form.Control
            type="email"
            placeholder="Email Address *"
            required
            size="lg"
            ref={email}
          />
        </Form.Group>

        <Form.Group as={Col} sm="6" className="mb-4">
          <Form.Control
            type="number"
            placeholder="Contact Number *"
            required
            size="lg"
            ref={contactNo}
          />
        </Form.Group>

        <Form.Group as={Col} md="6" className="mb-4 ms-auto home">
          <Button
            type="submit"
            className="  w-100"
            style={{ fontSize: "15px", padding: "10px" }}
          >
            {" "}
            Send{" "}
          </Button>
        </Form.Group>
      </Row>
    </Form>,
  ]);

  return (
    <>
      <div className="">
        <Card className="bg-dark text-white border-0 rounded-0 mb-4">
          <Card.Img
            style={{ maxHeight: "350px" }}
            src={require("../../Assets/product_sample.jpeg")}
            alt="Card_image"
          />
          <Card.ImgOverlay className="dark_layer">
            <Card.Title className="f_medium">Download</Card.Title>
          </Card.ImgOverlay>
        </Card>

        <div className="download_form">{formVal}</div>
      </div>
      {/* <div>
      Hidden div
      <a
        href={require("../../Assets/Download.pdf")}
        download
        className="btn btn-primary ms-3"
        target="_blank"
        rel="noreferrer"
      >
        Download brochure
      </a>
    </div> */}
    </>
  );
};

export default Download;
