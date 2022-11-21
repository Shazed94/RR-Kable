import React, { useEffect, useRef, useState } from "react";
import * as AiIcons from "react-icons/ai";
import * as FiIcons from "react-icons/fi";
import * as BiIcons from "react-icons/bi";
import * as FaIcons from "react-icons/fa";
import * as CgIcons from "react-icons/cg";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";
import { Col, Form, Row } from "react-bootstrap";
import { BACKEND_BASE_URL } from "../../../Component/GlobalVariables";
import axios from "axios";
import JoditEditor from "jodit-react";
import config from "../../../Component/JoditConfiq";
import Swal from "sweetalert2";

const AddRegionalOffice = () => {
  const officeName = useRef();
  const officeAddress = useRef();
  // ============================= form submit to backend ======================

  const [descValue, setDescValue] = useState('');

  const storeData = (e) => {
    const formdata = new FormData();
    formdata.append("shop_name", officeName.current.value);
    formdata.append("shop_address", officeAddress.current.value);
    axios
      .post(`${BACKEND_BASE_URL}/api/admin/regional-offices/store`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      .then((response) => {
        if (response.data.status === 200) {
          Swal.fire({
            icon: "success",
            text: response.data.message,
            confirmButtonColor: "#5eba86",
          });
          setDescValue("", "html");
          e.target.reset();
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
              Add Regional Office
            </Link>
          </div>
          <div className="breadcrumb-item p-0">
            <Link to="/admin/all-offices">All Regional Offices</Link>
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
                            md="12"
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
                              ref={officeName}
                            />
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
                              ref={officeAddress}
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

export default AddRegionalOffice;
