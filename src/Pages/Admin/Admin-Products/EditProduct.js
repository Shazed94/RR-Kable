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

const EditProduct = () => {
  const { productId } = useParams();
  // const { category } = useContext(UserContext);

  const productName = useRef();
  const productImage = useRef();
  const productSmallImage = useRef();
  const categoryId = useRef();
  const specification = useRef();
  const applicationDesc = useRef();
  const constructionDesc = useRef();
  const voltageGradeDesc = useRef();
  const operatingTempDesc = useRef();
  const minBendingRadiusDesc = useRef();
  const standardDesc = useRef();
  const cableDesignParamter = useRef();
  const color = useRef();

  // Image Preview
  const [files, setFile] = useState([]);
  const [files2, setFile2] = useState([]);

  const handleImgPreview = (e) => {
    let allfiles = [];
    for (let i = 0; i < e.target.files.length; i++) {
      allfiles.push(e.target.files[i]);
    }
    if (allfiles.length > 0) {
      setFile(allfiles);
    }
  };

  const handleSmallImgPreview = (e) => {
    let allfiles2 = [];
    for (let i = 0; i < e.target.files.length; i++) {
      allfiles2.push(e.target.files[i]);
    }
    if (allfiles2.length > 0) {
      setFile2(allfiles2);
    }
  };

  // ===================== Edit data ==========================================

  const [editInfo, setEditInfo] = useState([]);
  const [category, setCategory] = useState([]);
  // Edit value

  const fetchDataForEdit = () => {
    setFile([]);
    axios
      .get(`${BACKEND_BASE_URL}/api/admin/products/edit/${productId}`, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      .then((response) => {
        if (response.data.status === 200) {
          setEditInfo(response.data.edit_product);
          setCategory(response.data.all_categories);
        }
      });
  };

  useEffect(() => {
    fetchDataForEdit();
  }, [productId]);
  // ===================== Updated data to backend ===============================

  const updateData = (e) => {
    const formdata = new FormData();
    formdata.append("_method", "PUT");
    formdata.append("name", productName.current.value);
    if (productImage.current.files[0]) {
      formdata.append("image", productImage.current.files[0]);
    }
    if (productSmallImage.current.files[0]) {
      formdata.append("small_image", productSmallImage.current.files[0]);
    }
    formdata.append("category_id", categoryId.current.value);
    formdata.append("specification", specification.current.value);
    formdata.append("application", applicationDesc.current.value);
    formdata.append("construction", constructionDesc.current.value);
    formdata.append("voltage_grade", voltageGradeDesc.current.value);
    formdata.append("operating_temp", operatingTempDesc.current.value);
    formdata.append("min_bending_radius", minBendingRadiusDesc.current.value);
    formdata.append("standard", standardDesc.current.value);
    formdata.append(
      "cable_design_parameter",
      cableDesignParamter.current.value
    );

    axios
      .post(
        `${BACKEND_BASE_URL}/api/admin/products/update/${productId}`,
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

        setFile([]);
        setFile2([]);
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
            <Link to="/admin/products">All Product</Link>
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
                              defaultValue={editInfo.name}
                            />
                          </Form.Group>

                          {/* Product Image */}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Product Image &nbsp;{" "}
                              <span className="text-danger">*</span>
                            </Form.Label>

                            <Form.Control
                              type="file"
                              ref={productImage}
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
                            {files.length == 0 && (
                              <img
                                className="img-thumbnail mt-1"
                                width={80}
                                height={50}
                                src={`${BACKEND_BASE_URL}/${editInfo.image}`}
                                alt={editInfo.name}
                                name="img"
                              />
                            )}

                            <Form.Control.Feedback type="invalid">
                              Please choose an image
                            </Form.Control.Feedback>
                          </Form.Group>

                          {/* Product small Image */}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Small Image &nbsp;{" "}
                              <span className="text-danger">*</span>
                            </Form.Label>

                            <Form.Control
                              type="file"
                              ref={productSmallImage}
                              onChange={handleSmallImgPreview}
                            />

                            {files2.map((file2, key) => {
                              return (
                                <div key={key} className="Row">
                                  <span className="Filename">
                                    <img
                                      width={80}
                                      height={50}
                                      src={URL.createObjectURL(file2)}
                                      alt={file2.name}
                                    />
                                  </span>
                                </div>
                              );
                            })}
                            {files2.length == 0 && (
                              <img
                                className="img-thumbnail mt-1"
                                width={80}
                                height={50}
                                src={`${BACKEND_BASE_URL}/${editInfo.small_image}`}
                                alt={editInfo.name}
                                name="img"
                              />
                            )}

                            <Form.Control.Feedback type="invalid">
                              Please choose an image
                            </Form.Control.Feedback>
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

                          {/* Specification */}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Specification
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Specification"
                              ref={specification}
                              defaultValue={editInfo.specification}
                            />
                          </Form.Group>

                          {/* Application */}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom02"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold text-capitialize">
                            APPLICATION
                            </Form.Label>
                            <JoditEditor
                              ref={applicationDesc}
                              config={config}
                              tabIndex={1}
                              value={editInfo.application}
                            />
                          </Form.Group>

                          {/* Construction */}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom02"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Construction
                            </Form.Label>
                            <JoditEditor
                              ref={constructionDesc}
                              config={config}
                              tabIndex={1}
                              value={editInfo.construction}
                            />
                          </Form.Group>

                          {/* Voltage Grade */}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom02"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Voltage Grade
                            </Form.Label>
                            <JoditEditor
                              ref={voltageGradeDesc}
                              config={config}
                              tabIndex={1}
                              value={editInfo.voltage_grade}
                            />
                          </Form.Group>

                          {/* Operating Temp */}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom02"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Operating Temp
                            </Form.Label>
                            <JoditEditor
                              ref={operatingTempDesc}
                              config={config}
                              tabIndex={1}
                              value={editInfo.operating_temp}
                            />
                          </Form.Group>

                          {/* Min Bending Radius */}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom02"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Min Bending Radius
                            </Form.Label>
                            <JoditEditor
                              ref={minBendingRadiusDesc}
                              config={config}
                              tabIndex={1}
                              value={editInfo.min_bending_radius}
                            />
                          </Form.Group>

                          {/*Standard */}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom02"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Standard
                            </Form.Label>
                            <JoditEditor
                              ref={standardDesc}
                              config={config}
                              tabIndex={1}
                              value={editInfo.standard}
                            />
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
                              ref={cableDesignParamter}
                              config={config}
                              tabIndex={1}
                              value={editInfo.cable_design_parameter}
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

export default EditProduct;
