import React, { useEffect, useRef, useState } from "react";

import * as FiIcons from "react-icons/fi";

import { Link } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { BACKEND_BASE_URL } from "../../../Component/GlobalVariables";
import axios from "axios";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";

const AddSlider = () => {
  const sliderTitleOne = useRef();
  const sliderTitleTwo = useRef();
  // const sliderBtn = useRef();
  const sliderImage = useRef();


  // Image Preview
  const [files, setFile] = useState([]);
  // console.log("Check files",files);

  const handleImgPreview = (e) => {
    let allfiles = [];
    for (let i = 0; i < e.target.files.length; i++) {
      allfiles.push(e.target.files[i]);
    }
    if (allfiles.length > 0) {
      setFile(allfiles);
    }
  };

  // ============================= form submit to backend ======================

  const storeData = (e) => {
    const formdata = new FormData();
    formdata.append("title1", sliderTitleOne.current.value);
    formdata.append("title2", sliderTitleTwo.current.value);
    formdata.append("image", sliderImage.current.files[0]);

    axios
      .post(`${BACKEND_BASE_URL}/api/admin/banners-image/store`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      .then((response) => {
        if (response.data.status === 200) {
          Swal.fire({
            icon: "success",
            text: response.data.message,
            confirmButtonColor: "#5eba86",
          });
        }
      });
    e.preventDefault();
  };

  return (
    <div className="main__container">
      <div className="content-wrapper">
        <div className="breadcrumb d-flex justify-content-between">
          <div className="breadcrumb-item">
            <Link to="/admin">Dashboard</Link>
            <Link to="#" className="before">
              Add Slider
            </Link>
          </div>
          <div className="breadcrumb-item p-0">
            <Link to="/admin/sliders">All Sliders</Link>
          </div>
        </div>
        <div className="col-md-12 mt-3">
          <div className="card">
            <div className="card-body">
              <div className="col-lg-12">
                <span className="top-border"></span>

                <Form onSubmit={storeData}>
                  <div className="content-wrapper">
                    <div className="card">
                      <div className="card-body">
                        <Row className="py-3">
                          {/* Slider Title one */}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Slider Title One
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Slider Title"
                              ref={sliderTitleOne}
                            />
                          </Form.Group>

                          {/* Slider Title two*/}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Slider Title Two
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Slider Title"
                              ref={sliderTitleTwo}
                            />
                          </Form.Group>

                            
                             {/* <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Slider Title
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Slider Button"
                              ref={sliderBtn}
                            />
                          </Form.Group> */}

                          {/* Slider Image */}
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Slider Image (1920*850)&nbsp;{" "}
                              <span className="text-danger">*</span>
                            </Form.Label>

                            <Form.Control
                              required
                              type="file"
                              ref={sliderImage}
                              onChange={handleImgPreview}
                            />

                            {files.map((file, key) => {
                              return (
                                <div key={key} className="Row">
                                  <span className="Filename">
                                    <img
                                      width={80}
                                      height={50}
                                      src={URL.createObjectURL(file)}
                                      alt={file.name}
                                    />
                                  </span>
                                </div>
                              );
                            })}

                            <Form.Control.Feedback type="invalid">
                              Please choose an image
                            </Form.Control.Feedback>
                          </Form.Group>

                          {/* Submit button */}
                          <button
                            type="submit"
                            className="btn-submit mt-5 rounded-3 border-0"
                          >
                            <FiIcons.FiSave /> &nbsp; Save
                          </button>
                        </Row>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSlider;
