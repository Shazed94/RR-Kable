import axios from "axios";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import * as AiIcons from "react-icons/ai";
import * as FiIcons from "react-icons/fi";
import { Link } from "react-router-dom";
import config from "../../../Component/JoditConfiq";
import Swal from "sweetalert2";
import { BACKEND_BASE_URL } from "../../../Component/GlobalVariables";
import JoditEditor from "jodit-react";
import { useEffect } from "react";

const AddTableProductDesign = () => {
  const productName = useRef();
  const categoryId = useRef();
  const productTableDesc = useRef();

  const [productTableDesign, setProductTableDesign] = useState("");

  //================= Fetch Product Categories ===========================
  const [category, setCategory] = useState([]);

  const renderAllCategories = async () => {
    await axios
      .get(`${BACKEND_BASE_URL}/api/admin/products/categories`)
      .then((res) => {
        setCategory(res.data.all_product_categories);
      });
  };

  useEffect(() => {
    renderAllCategories();
  }, []);

  // ============================= form submit to backend ======================

  const storeData = (e) => {
    const formdata = new FormData();
    formdata.append("design_label", productName.current.value);
    formdata.append("category_id", categoryId.current.value);
    formdata.append("table_design", productTableDesc.current.value);
    // formdata.append("image", color.current.value);

    axios
      .post(
        `${BACKEND_BASE_URL}/api/admin/products/categories/table-designs/store`,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )

      .then((response) => {
        if (response.data.status === 200) {
          Swal.fire({
            icon: "success",
            text: response.data.message,
            confirmButtonColor: "#5eba86",
          });
          e.target.reset();
          setProductTableDesign("", "html");
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
              Add Product Table
            </Link>
          </div>
          <div className="breadcrumb-item p-0">
            <Link to="/admin/products/table-design">All Product Design</Link>
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
                          {/* Product Name */}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Label &nbsp;{" "}
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Label"
                              ref={productName}
                            />
                          </Form.Group>

                          {/* Category Id */}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Select Category
                            </Form.Label>

                            <Form.Select required ref={categoryId}>
                              <option value="0">Main</option>
                              {category.map((data, index) => {
                                return (
                                  <option key={index} value={data.id}>
                                    {data.category_name}
                                  </option>
                                );
                              })}
                            </Form.Select>

                            <Form.Control.Feedback type="invalid">
                              Category name is required
                            </Form.Control.Feedback>
                          </Form.Group>

                          {/* Cable Design Paramter */}
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Table Design &nbsp;{" "}
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <JoditEditor
                              ref={productTableDesc}
                              config={config}
                              tabIndex={1}
                              value={productTableDesign}
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

export default AddTableProductDesign;
