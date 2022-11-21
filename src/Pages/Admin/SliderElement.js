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

const SliderElement = () => {
  const sliderName = useRef();
  const sliderImage = useRef();
  const sliderLink = useRef();

  //=================================== Fetch Table Data ===================================
  const [tableData, setTableData] = useState([]);

  const renderAllSliders = async () => {
    try {
      await axios
        .get(`${BACKEND_BASE_URL}/api/admin/banners-image`)
        .then((res) => {
          setTableData(res.data.allBanners);
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    renderAllSliders();
  }, []);

  // Modal Section Data
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState("");
  const [modalSize, setModalSize] = useState("lg");

  // View single banner
  const [singleSlider, setSingleSlider] = useState([]);

  // Edit value
  const [editedSliderTitle, setEditedSliderTitle] = useState();
  const [editedSliderImage, setEditedSliderImage] = useState();
  const [editedSliderLink, setEditedSliderLink] = useState();

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
    formdata.append("title", sliderName.current.value);
    formdata.append("image", sliderImage.current.files[0]);
    formdata.append("btnLink", sliderLink.current.value);

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
          renderAllSliders();
          e.target.reset();
          setModalShow(false);
        }
      });
    console.log("submitted");
    e.preventDefault();
  };

  // ===================== View single image ===================================

  const showSingleImageData = (modalValue, id) => {
    setModalSize("");
    axios
      .get(`${BACKEND_BASE_URL}/api/admin/banners-image/view/${id}`)
      .then((res) => {
        // console.log(res.data);
        setModalSize("lg");
        setModalData(modalValue);
        setSingleSlider(res.data.viewBanner);
        setModalShow(true);
      });
  };

  // ===================== Edit data ==========================================

  const [Id, setId] = useState();

  const fetchDataForEdit = (modalValue, id) => {
    setFile([]);

    axios
      .get(`${BACKEND_BASE_URL}/api/admin/banners-image/edit/${id}`)
      .then((res) => {
        const { id, title, image, btnLink } = res.data.editBanner;
        // console.log("db is home", isHome);
        setId(id);
        setEditedSliderTitle(title);
        setEditedSliderImage(image);
        setEditedSliderLink(btnLink);
        setModalData(modalValue);
        setModalSize("lg");
        setModalShow(true);
      });
  };

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

  // ===================== Updated data to backend ===============================

  const updatedSlider = (e) => {
    const UpdatedSliderImage = sliderImage.current.files[0];

    const formdata = new FormData();
    formdata.append("_method", "PUT");
    formdata.append("title", sliderName.current.value);
    if (UpdatedSliderImage) {
      formdata.append("image", UpdatedSliderImage);
    }
    formdata.append("btnLink", sliderLink.current.value);

    axios
      .post(
        `${BACKEND_BASE_URL}/api/admin/banners-image/update/${Id}`,
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
        setModalShow(false);
        renderAllSliders();
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
        .delete(`${BACKEND_BASE_URL}/api/admin/banners-image/delete/${id}`)
        .then((res) => {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            confirmButtonColor: "#5eba86",
          });
          renderAllSliders();
        });
    }
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
                <div className="card p-2">
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
                        <th scope="col">Slider Title</th>
                        <th scope="col">Slider Image</th>
                        <th scope="col">Handle</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((data, index) => (
                        <tr key={index}>
                          <td> {index + 1}</td>
                          <td>{data.title}</td>
                          <td>
                            <img
                              className="img-thumbnail"
                              width={80}
                              height={50}
                              src={`${BACKEND_BASE_URL}${data.image}`}
                              alt={data.title}
                            />
                          </td>
                          <td></td>
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
                              {/* Slider Name */}
                              <Form.Group
                                as={Col}
                                md="6"
                                controlId="validationCustom01"
                                className="mb-3"
                              >
                                <Form.Label className="label fw-bold">
                                  Slider title
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="slider title"
                                  ref={sliderName}
                                />
                              </Form.Group>

                              {/* Slider Image */}
                              <Form.Group
                                as={Col}
                                md="6"
                                controlId="validationCustom01"
                                className="mb-3"
                              >
                                <Form.Label className="label fw-bold">
                                  Image <span className="text-danger">*</span>
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

                              {/* Slider Button Link */}
                              <Form.Group
                                as={Col}
                                md="12"
                                controlId="validationCustom02"
                                className="mb-3"
                              >
                                <Form.Label className="label fw-bold">
                                  Button Link
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder="link"
                                  ref={sliderLink}
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
                  <Form onSubmit={updatedSlider}>
                    <div className="content-wrapper">
                      <div className="card">
                        <div className="card-body">
                          <Row className="py-3">
                            {/* Slider Name */}
                            <Form.Group
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
                                ref={sliderName}
                                defaultValue={editedSliderTitle}
                                // onChange={(e) => {
                                //   setEditedBrandName(e.target.value);
                                // }}
                              />
                            </Form.Group>

                            {/* Slider Image */}
                            <Form.Group
                              as={Col}
                              md="6"
                              controlId="validationCustom01"
                              className="mb-3"
                            >
                              <Form.Label className="label fw-bold">
                                Slider Image{" "}
                                <span className="text-danger">*</span>
                              </Form.Label>

                              <Form.Control
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

                              {files.length == 0 && (
                                <img
                                  width={80}
                                  height={50}
                                  src={`${BACKEND_BASE_URL}${editedSliderImage}`}
                                  alt={sliderName}
                                />
                              )}

                              <Form.Control.Feedback type="invalid">
                                Please choose an image
                              </Form.Control.Feedback>
                            </Form.Group>

                            {/* slider Button Link */}
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom02"
                              className="mb-3"
                            >
                              <Form.Label className="label fw-bold">
                                Slider Link
                              </Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Link"
                                ref={sliderLink}
                                defaultValue={editedSliderLink}
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
                    <h4>{singleSlider.title}</h4>
                    <img
                      className="img-thumbnail"
                      src={`${BACKEND_BASE_URL}/${singleSlider.image}`}
                      alt=""
                    />
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

export default SliderElement;
