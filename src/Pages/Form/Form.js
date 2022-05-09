import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import RichTextEditor from "../../Components/RichTextEditor";
import { Button } from "bootstrap";
import "./form.css";

const Form = () => {
  // Jodit
  const [value, setValue] = useState("");
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  const getValue = (value) => {
    setValue(value);
  };

  return (
    <>
      <div className="form-wrapper">
        <div className="breadcrumb">
          <div className="breadcrumb-item">
            <Link to="/dashboard/dashboard1">Dashboard</Link>
          </div>
        </div>
        {/* <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>
              Post Title <span className="text-danger ">*</span>
            </Form.Label>

            <Form.Control type="text" placeholder="" required />
            <span className="text-danger"></span>
          </Form.Group>

          <Form.Group className="mb-3" controlId="postImg">
            <Form.Label>Post Image</Form.Label>
            <Form.Control type="file" className="file-image" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="postImg">
            <Form.Label>Post Description</Form.Label>
            <br />
            <RichTextEditor initialValue="" getValue={getValue} />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicCheckbox"
          ></Form.Group>
          <div>{value}</div>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form> */}
      </div>
    </>
  );
};

export default Form;
