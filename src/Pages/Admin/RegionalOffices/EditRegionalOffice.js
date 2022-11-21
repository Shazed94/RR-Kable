import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { BACKEND_BASE_URL } from "../../../Component/GlobalVariables";

import JoditEditor from "jodit-react";
import config from "../../../Component/JoditConfiq";

const EditRegionalOffice = () => {
  const { officeId } = useParams();

  const officeName = useRef();
  const officeAddress = useRef();

  // ===================== Edit data ==========================================
  const [editedValue, setEditedValue] = useState([]);

  const fetchDataForEdit = () => {
    axios
      .get(`${BACKEND_BASE_URL}/api/admin/regional-offices/edit/${officeId}`)
      .then((res) => {
        setEditedValue(res.data?.edit_office);
      });
  };

  useEffect(() => {
    fetchDataForEdit();
  }, []);

  // ===================== Updated data to backend ===============================
  const updateSliderInfo = (e) => {
    const formdata = new FormData();
    formdata.append("_method", "PUT");
    formdata.append("shop_name", officeName.current.value);
    formdata.append("shop_address", officeAddress.current.value);

    axios
      .post(
        `${BACKEND_BASE_URL}/api/admin/regional-offices/update/${editedValue.id}`,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )

      .then((response) => {
        Swal.fire({
          icon: "success",
          text: response.data.message,
          confirmButtonColor: "#5eba86",
        });
        fetchDataForEdit();
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
              Update News
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

                <Form onSubmit={updateSliderInfo}>
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
                              News Title
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              ref={officeName}
                              defaultValue={editedValue.shop_name}
                            />
                            <Form.Control.Feedback type="invalid">
                              Title is required
                            </Form.Control.Feedback>
                          </Form.Group>

                          {/* News Description */}
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom02"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Short Description
                            </Form.Label>
                            <JoditEditor
                              tabIndex={1}
                              config={config}
                              ref={officeAddress}
                              value={editedValue.shop_address}
                            />
                          </Form.Group>

                          {/* Submit button */}
                          <button
                            type="submit"
                            className="btn-submit mt-5 rounded-3 border-0"
                          >
                            Update
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

export default EditRegionalOffice;
