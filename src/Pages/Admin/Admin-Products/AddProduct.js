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

const AddProduct = () => {
  const productName = useRef();
  const productImage = useRef();
  const productSmallImage = useRef();
  const categoryId = useRef();
  const designId = useRef();
  const specification = useRef();
  const applicationDesc = useRef();
  const constructionDesc = useRef();
  const voltageGradeDesc = useRef();
  const operatingTempDesc = useRef();
  const minBendingRadiusDesc = useRef();
  const standardDesc = useRef();
  const cableDesignParamter = useRef();

  const [productTableDesign, setProductTableDesign] = useState("");
  const [designLabel, setDesignLabel] = useState();

  const GetTableDesign = async () => {
    // console.log(categoryId.current.value);
    await axios
      .get(
        `${BACKEND_BASE_URL}/api/admin/products/get-table-design/${designId.current.value}`
      )
      .then((res) => {
        setProductTableDesign(res?.data?.product_table_design?.table_design);
      });
  };
  console.log(productTableDesign);

  const GetDesignLabel = async () => {
    await axios
      .get(
        `${BACKEND_BASE_URL}/api/admin/products/categories/table-designs/get-label/${categoryId.current.value}`
      )
      .then((res) => {
        setDesignLabel(res?.data?.product_design_labels);
      });
  };

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

  // ============================================= CHECKBOX ====================
  const [checkboxVal, setCheckboxVal] = useState([]);

  // with add & remove filter
  const CheckHandler = (e) => {
    const value = e.target.value;
    setCheckboxVal((prev) =>
      checkboxVal.includes(value)
        ? prev.filter((cur) => cur !== value)
        : [...prev, e.target.value]
    );
  };

  // const checkSubmit = (e) => {
  //   const formdata = new FormData();
  //   formdata.append("name", checkboxVal);
  //   axios
  //     .post(`${BACKEND_BASE_URL}/api/test-check`, formdata, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     });
  //   e.preventDefault();
  // };
  console.log(checkboxVal.length);
  // ============================= form submit to backend ======================

  const [applicationValue, setApplicationValue] = useState();
  const [constructionValue, setConstructionValue] = useState();
  const [voltageGradeValue, setVoltageGradeValue] = useState();
  const [operatingTempValue, setOperatingTempValue] = useState();
  const [minBendingRadiusValue, setMinBendingRadiusValue] = useState();
  const [standardValue, setStandardValue] = useState();
  // const [cableDesignParamterValue, setCableDesignParamterValue] = useState();

  const storeData = (e) => {
    const formdata = new FormData();
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
    if (checkboxVal.length > 0) {
      formdata.append("color_code", checkboxVal);
    }
    formdata.append("construction", constructionDesc.current.value);
    formdata.append("voltage_grade", voltageGradeDesc.current.value);
    formdata.append("operating_temp", operatingTempDesc.current.value);
    formdata.append("min_bending_radius", minBendingRadiusDesc.current.value);
    formdata.append("standard", standardDesc.current.value);
    formdata.append(
      "cable_design_parameter",
      cableDesignParamter.current.value
    );
    // formdata.append("image", color.current.value);

    axios
      .post(`${BACKEND_BASE_URL}/api/admin/products/store`, formdata, {
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
          setApplicationValue("", "html");
          setConstructionValue("", "html");
          setVoltageGradeValue("", "html");
          setOperatingTempValue("", "html");
          setMinBendingRadiusValue("", "html");
          setStandardValue("", "html");
          setProductTableDesign("", "html");

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
              Add Product
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

                <Form onSubmit={storeData}>
                  <div className="content-wrapper">
                    <div className="">
                      <div className="">
                        <Row className="py-3">
                          {/* Product Name */}
                          <Form.Group
                            as={Col}
                            md="6"
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
                            />
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
                              Product Image (700*400) &nbsp;{" "}
                              <span className="text-danger">*</span>
                            </Form.Label>

                            <Form.Control
                              required
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
                              Small Image (120*60) &nbsp;{" "}
                              <span className="text-danger">*</span>
                            </Form.Label>

                            <Form.Control
                              required
                              type="file"
                              ref={productSmallImage}
                              onChange={handleSmallImgPreview}
                            />

                            {files2.map((file, key) => {
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

                            <Form.Select
                              required
                              ref={categoryId}
                              onChange={GetDesignLabel}
                            >
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

                          {/* Select Table Design */}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Select Table Design
                            </Form.Label>

                            <Form.Select
                              required
                              ref={designId}
                              onChange={GetTableDesign}
                              defaultValue={designLabel}
                            >
                              <option value="0">Main</option>
                              {designLabel?.map((data, index) => {
                                return (
                                  <option key={index} value={data.id}>
                                    {data.design_label}
                                  </option>
                                );
                              })}
                            </Form.Select>

                            <Form.Control.Feedback type="invalid">
                              Category name is required
                            </Form.Control.Feedback>
                          </Form.Group>

                          {/* Checkbox */}
                          {/* <Form onSubmit={checkSubmit}> */}
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Select Color
                            </Form.Label>
                            <div className="col-md-12">
                              <input
                                type="checkbox"
                                id="red"
                                value="Red-#FF0000"
                                onClick={CheckHandler}
                              />
                              <label htmlFor="red" className="mx-2">
                                Red
                              </label>
                              <input
                                type="checkbox"
                                id="yellow"
                                value="Yellow-#faee11"
                                onClick={CheckHandler}
                              />
                              <label htmlFor="yellow" className="mx-2">
                                Yellow
                              </label>
                              <input
                                type="checkbox"
                                id="blue"
                                value="Blue-#1111fa"
                                onClick={CheckHandler}
                              />
                              <label htmlFor="blue" className="mx-2">
                                Blue
                              </label>
                              <input
                                type="checkbox"
                                id="black"
                                value="Black-#000"
                                onClick={CheckHandler}
                              />
                              <label htmlFor="black" className="mx-2">
                                Black
                              </label>
                              <input
                                type="checkbox"
                                id="green"
                                value="Green-#00c203"
                                onClick={CheckHandler}
                              />
                              <label htmlFor="green" className="mx-2">
                                Green
                              </label>
                              <input
                                type="checkbox"
                                id="Grey"
                                value="Grey-#919191"
                                onClick={CheckHandler}
                              />
                              <label htmlFor="Grey" className="mx-2">
                                Grey
                              </label>
                              <input
                                type="checkbox"
                                id="White"
                                value="White-#fff"
                                onClick={CheckHandler}
                              />
                              <label htmlFor="White" className="mx-2">
                                White
                              </label>
                              <input
                                type="checkbox"
                                id="off-white"
                                value="Off white-#F2F1EE"
                                onClick={CheckHandler}
                              />
                              <label htmlFor="off-white" className="mx-2">
                                Off white
                              </label>
                              <input
                                type="checkbox"
                                id="brown"
                                value="Brown-#914900"
                                onClick={CheckHandler}
                              />
                              <label htmlFor="brown" className="mx-2">
                                Brown
                              </label>
                            </div>
                          </Form.Group>
                          {/* </Form> */}

                          {/* Application */}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom02"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Application
                            </Form.Label>
                            <JoditEditor
                              ref={applicationDesc}
                              config={config}
                              tabIndex={1}
                              value={applicationValue}
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
                              value={constructionValue}
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
                              value={voltageGradeValue}
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
                              value={operatingTempValue}
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
                              value={minBendingRadiusValue}
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
                              value={standardValue}
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

export default AddProduct;
