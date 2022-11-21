import axios from "axios";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import * as FiIcons from "react-icons/fi";

import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as CgIcons from "react-icons/cg";
import * as MdIcons from "react-icons/md";
import { UserContext } from "../../../App";
import { BACKEND_BASE_URL } from "../../../Component/GlobalVariables";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import config from "../../../Component/JoditConfiq";

import JoditEditor from "jodit-react";

const EditTableProductDesign = () => {
  const { tableDesignId } = useParams();

  const productName = useRef();
  const categoryId = useRef();
  const productTableDesc = useRef();

  // ===================== Edit data ==========================================

  const [editInfo, setEditInfo] = useState([]);
  const [category, setCategory] = useState([]);
  // Edit value

  const fetchDataForEdit = () => {
    axios
      .get(
        `${BACKEND_BASE_URL}/api/admin/products/categories/table-designs/edit/${tableDesignId}`,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )

      .then((response) => {
        setEditInfo(response.data.edit_table_design);
        setCategory(response.data.all_categories);
      });
  };
  console.log(editInfo);
  useEffect(() => {
    fetchDataForEdit();
  }, [tableDesignId]);
  // ===================== Updated data to backend ===============================

  const updateData = (e) => {
    const formdata = new FormData();
    formdata.append("_method", "PUT");
    formdata.append("design_label", productName.current.value);
    formdata.append("category_id", categoryId.current.value);
    formdata.append("table_design", productTableDesc.current.value);

    axios
      .post(
        `${BACKEND_BASE_URL}/api/admin/products/categories/table-designs/update/${tableDesignId}`,
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
            <Link to="add-new" className="before">
              Add New Product
            </Link>
          </div>
          <div className="breadcrumb-item p-0">
            <Link to="/admin/products/table-design">All Product Table</Link>
          </div>
        </div>

        <div className="col-md-12 mt-3">
          <div className="card">
            <div className="card-body">
              <div className="col-lg-12">
                <span className="top-border"></span>

                <Form onSubmit={updateData}>
                  <div className="content-wrapper">
                    <div className="card">
                      <div className="card-body">
                        <Row className="py-3">
                          {/* Product Name */}
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Product Name &nbsp;{" "}
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Product Name"
                              ref={productName}
                              defaultValue={editInfo.design_label}
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
                                  <option
                                    key={index}
                                    value={data.id}
                                    selected={
                                      data.id == editInfo.category_id
                                        ? "selected"
                                        : ""
                                    }
                                  >
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
                              Cable Design Paramter &nbsp;{" "}
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <JoditEditor
                              ref={productTableDesc}
                              config={config}
                              tabIndex={1}
                              value={editInfo.table_design}
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

export default EditTableProductDesign;
