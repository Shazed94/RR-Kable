import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import * as AiIcons from "react-icons/ai";
import * as FiIcons from "react-icons/fi";
import * as BiIcons from "react-icons/bi";
import * as FaIcons from "react-icons/fa";
import * as CgIcons from "react-icons/cg";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../Component/GlobalVariables";
import Swal from "sweetalert2";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import JoditEditor from "jodit-react";
import Parse from "html-react-parser";

const Brands = () => {
  const brandName = useRef();
  const brandImage = useRef();
  const shortDesc = useRef();

  //=================================== Fetch Table Data ===================================

  const [tableData, setTableData] = useState([]);

  const renderAllBrands = async () => {
    try {
      await axios.get(`${BACKEND_BASE_URL}/api/admin/brands`).then((res) => {
        setTableData(res.data.allBrands);
        console.log(res.data.allBrands);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    renderAllBrands();
  }, []);

  const [descValue, setDescValue] = useState();

  // Modal Section Data
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState("");
  const [modalSize, setModalSize] = useState("lg");

  // View single brand
  const [singleBrandInfo, setSingleBrandInfo] = useState([]);

  // Edit value
  const [editedBrandName, setEditedBrandName] = useState();
  const [editedBrandImage, setEditedBrandImage] = useState();
  const [editedBrandDesc, setEditedBrandDesc] = useState();

  // ============================= Add new data =============================

  const addNewData = (modalValue) => {
    setFile([]);
    setModalSize("lg");
    setModalData(modalValue);
    setModalShow(true);
  };

  // ============================= form submit to backend ======================

  const storeData = (e) => {
    const formdata = new FormData();
    formdata.append("brandName", brandName.current.value);
    formdata.append("brandImage", brandImage.current.files[0]);
    formdata.append("shortDesc", shortDesc.current.value);

    axios
      .post(`${BACKEND_BASE_URL}/api/admin/brands/store`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      .then((response) => {
        if (response.data.status === 200) {
          Swal.fire({
            icon: "success",
            text: response.data.message,
            confirmButtonColor: "#5eba86",
          });
          renderAllBrands();
          // setChecked(false);
          e.target.reset();
          setDescValue("", "html");
          setModalShow(false);
        }
      });
    e.preventDefault();
  };

  const statusUpdate = (id, status) => {
    axios
      .get(`${BACKEND_BASE_URL}/api/admin/brands/status-update/${id}/${status}`)
      .then((res) => {
        renderAllBrands();
      });
  };

  // ===================== View single image ===================================

  const showSingleImageData = (modalValue, id) => {
    setModalSize("");
    axios.get(`${BACKEND_BASE_URL}/api/admin/brands/view/${id}`).then((res) => {
      // console.log(res.data);
      setModalSize("lg");
      setModalData(modalValue);
      setSingleBrandInfo(res.data.viewBrand);
      // console.log(res.data.viewHappyClientInfo);
      setModalShow(true);
    });
  };

  // ===================== Edit data ==========================================

  const [Id, setId] = useState();
  // console.log("initial value", isChecked);
  const fetchDataForEdit = (modalValue, id) => {
    setFile([]);

    axios.get(`${BACKEND_BASE_URL}/api/admin/brands/edit/${id}`).then((res) => {
      const { id, brandName, brandImage, shortDesc } = res.data.editBrand;
      // console.log("db is home", isHome);
      setId(id);
      setEditedBrandName(brandName);
      setEditedBrandImage(brandImage);
      setEditedBrandDesc(shortDesc);
      setModalData(modalValue);
      setModalSize("lg");
      setModalShow(true);
    });
  };

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

  // ===================== Updated data to backend ===============================

  const updateImageGallery = (e) => {
    const UpdatedBrandImage = brandImage.current.files[0];

    const formdata = new FormData();
    formdata.append("_method", "PUT");
    formdata.append("brandName", brandName.current.value);
    if (UpdatedBrandImage) {
      formdata.append("brandImage", UpdatedBrandImage);
    }
    formdata.append("shortDesc", shortDesc.current.value);

    axios
      .post(`${BACKEND_BASE_URL}/api/admin/brands/update/${Id}`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      .then((response) => {
        Swal.fire({
          icon: "success",
          text: response.data.message,
          confirmButtonColor: "#5eba86",
        });
        setModalShow(false);
        renderAllBrands();
      });

    e.preventDefault();
  };

  // =============================== Delete Data ===============================
  const deleteData = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "green",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    if (isConfirm) {
      axios
        .delete(`${BACKEND_BASE_URL}/api/admin/brands/delete/${id}`)
        .then((res) => {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            confirmButtonColor: "#5eba86",
          });
          renderAllBrands();
        });
    }
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
                <div className="p-2">
                  <div className="card-header">
                    <Button
                      variant="success"
                      size="sm"
                      className="border-0"
                      onClick={() => addNewData("Add")}
                    >
                      Add &nbsp;
                      <span>
                        <AiIcons.AiOutlinePlusCircle />
                      </span>
                    </Button>

                    <hr />
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Brand Name</th>
                        <th scope="col">Brand Image</th>
                        <th scope="col">Status</th>
                        <th scope="col">Handle</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((data, index) => (
                        <tr key={index}>
                          <td> {index + 1}</td>
                          <td>{data.brandName}</td>
                          <td>
                            <img
                              className="img-thumbnail"
                              width={80}
                              height={50}
                              src={`${BACKEND_BASE_URL}${data.brandImage}`}
                              alt={data.brandName}
                            />
                          </td>
                          <td>
                            {data.status == 1 ? (
                              <div
                                className="btn btn-success btn-sm border-0"
                                onClick={() =>
                                  statusUpdate(data.id, data.status)
                                }
                              >
                                Active
                              </div>
                            ) : (
                              <div
                                className="btn btn-danger btn-sm border-0"
                                onClick={() =>
                                  statusUpdate(data.id, data.status)
                                }
                              >
                                In-active
                              </div>
                            )}
                          </td>
                          <td>
                            {/* view button */}
                            <button
                              onClick={() =>
                                showSingleImageData("View", data.id)
                              }
                              className="py-1 px-2 bg-info border-0 rounded-3 me-1 mb-1"
                            >
                              <FaIcons.FaEye
                                style={{
                                  color: "white",
                                }}
                                title="View"
                                size="1.5em"
                              />{" "}
                            </button>
                            {/* edit button */}
                            <button
                              onClick={() => fetchDataForEdit("Edit", data.id)}
                              className="py-1 px-2 bg-warning border-0 rounded-3 me-1 mb-1"
                            >
                              <BiIcons.BiEdit
                                style={{
                                  color: "white",
                                }}
                                title="Edit"
                                size="1.5em"
                              />
                            </button>
                            {/* delete button */}
                            <button
                              onClick={() => deleteData(data.id)}
                              className="py-1 px-2 bg-danger border-0 rounded-3 me-1 mb-1"
                            >
                              <MdIcons.MdDeleteForever
                                style={{
                                  color: "white",
                                }}
                                title="Delete"
                                size="1.5em"
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <Modal
              show={modalShow}
              size={modalSize}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header>
                <Modal.Title
                  className="text-black"
                  id="contained-modal-title-vcenter"
                >
                  {modalData}
                </Modal.Title>
                <Button
                  className="p-0 border-0 bg-danger"
                  onClick={() => setModalShow(false)}
                >
                  <CgIcons.CgClose
                    style={{
                      fontSize: "26px",
                    }}
                  />
                </Button>
              </Modal.Header>
              <Modal.Body>
                {/* Add Modal section */}
                {modalData === "Add" && (
                  <div className="">
                    <Form onSubmit={storeData}>
                      <div className="content-wrapper">
                        <div className="card">
                          <div className="card-body">
                            <Row className="py-3">
                              {/* Brand Name */}
                              <Form.Group
                                as={Col}
                                md="6"
                                controlId="validationCustom01"
                                className="mb-3"
                              >
                                <Form.Label className="label fw-bold">
                                  Brand Name
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder="Brand Name"
                                  ref={brandName}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Title is required
                                </Form.Control.Feedback>
                              </Form.Group>

                              {/* Brand Image */}
                              <Form.Group
                                as={Col}
                                md="6"
                                controlId="validationCustom01"
                                className="mb-3"
                              >
                                <Form.Label className="label fw-bold">
                                  Image Link
                                </Form.Label>

                                <Form.Control
                                  required
                                  type="file"
                                  ref={brandImage}
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

                              {/* Brand Description */}
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
                                  ref={shortDesc}
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
                )}
                {/* Edit modal section */}
                {modalData === "Edit" && (
                  <Form onSubmit={updateImageGallery}>
                    <div className="content-wrapper">
                      <div className="card">
                        <div className="card-body">
                          <Row className="py-3">
                            {/* Brand Name */}
                            <Form.Group
                              as={Col}
                              md="6"
                              controlId="validationCustom01"
                              className="mb-3"
                            >
                              <Form.Label className="label fw-bold">
                                Brand Name
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                ref={brandName}
                                value={editedBrandName}
                                onChange={(e) => {
                                  setEditedBrandName(e.target.value);
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                Title is required
                              </Form.Control.Feedback>
                            </Form.Group>

                            {/* Brand Image */}
                            <Form.Group
                              as={Col}
                              md="6"
                              controlId="validationCustom01"
                              className="mb-3"
                            >
                              <Form.Label className="label fw-bold">
                                Brand Image
                              </Form.Label>

                              <Form.Control
                                type="file"
                                ref={brandImage}
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
                                  src={`${BACKEND_BASE_URL}${editedBrandImage}`}
                                  alt={brandName}
                                  name="img"
                                />
                              )}

                              <Form.Control.Feedback type="invalid">
                                Please choose an image
                              </Form.Control.Feedback>
                            </Form.Group>

                            {/* Brand Description */}
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
                                ref={shortDesc}
                                value={editedBrandDesc}
                                // onChange={(e) => {
                                //   setEditedBrandDesc(e.target.value);
                                // }}
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
                )}
                {/* View Modal section */}
                {modalData === "View" && (
                  <>
                    <h4>{singleBrandInfo.brandName}</h4>
                    <div className="text-center">
                      <img
                        className="img-fluid"
                        src={`${BACKEND_BASE_URL}/${singleBrandInfo.brandImage}`}
                        alt=""
                      />
                    </div>
                    <div className="mt-2">
                      {Parse(`${singleBrandInfo.shortDesc}`)}
                    </div>
                  </>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  onClick={() => setModalShow(false)}
                  className="btn-danger"
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
