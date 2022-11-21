import React, { useEffect, useRef, useState } from "react";
import * as AiIcons from "react-icons/ai";
import * as FiIcons from "react-icons/fi";
import * as BiIcons from "react-icons/bi";
import * as FaIcons from "react-icons/fa";
import * as CgIcons from "react-icons/cg";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { BACKEND_BASE_URL } from "../../../Component/GlobalVariables";
import axios from "axios";
import JoditEditor from "jodit-react";
import config from "../../../Component/JoditConfiq";
import Swal from "sweetalert2";

const AddNews = () => {
  const newsAuthor = useRef();
  const newsTitle = useRef();
  const newsLink = useRef();
  const newsDesc = useRef();
  const newsImage = useRef();

  // Image Preview
  const [files, setFile] = useState([]);

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

  const [descValue, setDescValue] = useState();

  const storeData = (e) => {
    const formdata = new FormData();
    formdata.append("author", newsAuthor.current.value);
    formdata.append("title", newsTitle.current.value);
    formdata.append("src_link", newsLink.current.value);
    formdata.append("description", newsDesc.current.value);
    formdata.append("image", newsImage.current.files[0]);

    axios
      .post(`${BACKEND_BASE_URL}/api/admin/news/store`, formdata, {
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
          setDescValue("", "html");
          setFile([]);
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
              Add News
            </Link>
          </div>
          <div className="breadcrumb-item p-0">
            <Link to="/admin/news">All News</Link>
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
                          {/* News Title */}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              News Title &nbsp;{" "}
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="News Title"
                              ref={newsTitle}
                            />
                          </Form.Group>
                          {/* News Link */}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              News Link &nbsp;{" "}
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="News Link"
                              ref={newsLink}
                            />
                          </Form.Group>

                          {/* Author */}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              News Author
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="News Author"
                              ref={newsAuthor}
                              defaultValue={localStorage.getItem("adminName")}
                            />
                          </Form.Group>

                          {/* News Image */}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              News Image (700*400)&nbsp;{" "}
                              <span className="text-danger">*</span>
                            </Form.Label>

                            <Form.Control
                              required
                              type="file"
                              ref={newsImage}
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

                          {/* News description */}
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom02"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Description
                            </Form.Label>
                            <JoditEditor
                              ref={newsDesc}
                              config={config}
                              tabIndex={1}
                              value={descValue}
                            />
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

export default AddNews;
