import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import * as AiIcons from "react-icons/ai";
import * as FiIcons from "react-icons/fi";
import * as BiIcons from "react-icons/bi";
import * as FaIcons from "react-icons/fa";
import * as CgIcons from "react-icons/cg";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../Components/GlobalVariables";
import Swal from "sweetalert2";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import JoditEditor from "jodit-react";
import Parse from "html-react-parser";

const ShippingMethod = () => {
  const shippingMethod = useRef();
  const shippingPrice = useRef();
  const shippingDesc = useRef();

  //=================================== Fetch Table Data ===================================

  useEffect(() => {
    fetchDataForEdit();
  }, []);

  // Edit value

  const [editedShippingMethod, setEditedShippingMethod] = useState();
  const [editedShippingPrice, setEditedShippingPrice] = useState();
  const [editedShippingDesc, setEditedShippingDesc] = useState();

  // ============================= form submit to backend ======================
  const updateShipping = (e) => {
    const formdata = new FormData();
    formdata.append("_method", "put");
    formdata.append("shippingMethod", shippingMethod.current.value);
    formdata.append("shippingPrice", shippingPrice.current.value);
    formdata.append("shippingDetails", shippingDesc.current.value);

    axios
      .post(`${BACKEND_BASE_URL}/api/admin/shipping/update/${Id}`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      .then((response) => {
        if (response.data.status === 200) {
          Swal.fire({
            icon: "success",
            text: response.data.message,
            confirmButtonColor: "#5eba86",
          });
          fetchDataForEdit();

          // setDescValue("", "html");

        }
      });
    e.preventDefault();
  };

  // ===================== Edit data ==========================================
  const [Id, setId] = useState();
  // console.log(Id);

  const fetchDataForEdit = () => {
    axios.get(`${BACKEND_BASE_URL}/api/admin/shipping/edit`).then((res) => {
      const { id, shippingMethod, shippingPrice, shippingDetails } =
        res.data.editShippingInfo;
    
      setId(id);
      setEditedShippingMethod(shippingMethod);
      setEditedShippingPrice(shippingPrice);
      setEditedShippingDesc(shippingDetails);
    });
  };

  // jodit editor options
  const config = {
    buttons: [
      "bold",
      "strikethrough",
      "underline",
      "italic",
      "|",
      "ul",
      "ol",
      "|",
      "outdent",
      "indent",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      "table",
      "link",
      "|",
      "align",
      "undo",
      "redo",
      "|",
      "symbol",
    ],
  };

  return (
    <div className="main__container">
      <div className="content-wrapper">
        <div className="breadcrumb">
          <div className="breadcrumb-item">
            <Link to="/admin">Dashboard</Link>
            <Link to="#" className="before">
              Add
            </Link>
          </div>
        </div>

        <div className="col-md-12 mt-3">
          <div className="card">
            <div className="card-body">
              <div className="col-lg-12">
                <span className="top-border"></span>

                <Form onSubmit={updateShipping}>
                  <div className="content-wrapper">
                    <div className="card">
                      <div className="card-body">
                        <Row className="py-3">
                          {/*  Shipping Method */}
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Shipping Method
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              ref={shippingMethod}
                              defaultValue={editedShippingMethod}
                            />
                            <Form.Control.Feedback type="invalid">
                              Title is required
                            </Form.Control.Feedback>
                          </Form.Group>

                          {/* Shipping Price */}
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Shipping Price
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              ref={shippingPrice}
                              defaultValue={editedShippingPrice}
                            />
                            <Form.Control.Feedback type="invalid">
                              Title is required
                            </Form.Control.Feedback>
                          </Form.Group>

                          {/* Description */}
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom02"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Shipping Details
                            </Form.Label>
                            <JoditEditor
                              tabIndex={1}
                              config={config}
                              ref={shippingDesc}
                              value={editedShippingDesc}
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

export default ShippingMethod;
