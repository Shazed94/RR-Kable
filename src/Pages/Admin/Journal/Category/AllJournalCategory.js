import React, { useEffect, useRef, useState } from "react";
import * as AiIcons from "react-icons/ai";
import * as FiIcons from "react-icons/fi";
import * as BiIcons from "react-icons/bi";
import * as FaIcons from "react-icons/fa";
import * as CgIcons from "react-icons/cg";
import * as MdIcons from "react-icons/md";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { BACKEND_BASE_URL } from "../../../../Components/GlobalVariables";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AllJournalCategory = () => {
  const journalCategory = useRef();

  // Modal Section Data
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState("");
  const [modalSize, setModalSize] = useState("lg");

  // View single category
  const [singleCategoryInfo, setSingleCategoryInfo] = useState([]);

  const addNewData = (modalValue) => {
    setModalSize("lg");
    setModalData(modalValue);
    setModalShow(true);
  };

  //=================================== Fetch Table Data ===================================

  const [journalCat, setjournalCat] = useState([]);

  const fetchJournalCategory = async () => {
    try {
      await axios
        .get(`${BACKEND_BASE_URL}/api/admin/journal/category`)
        .then((res) => {
          setjournalCat(res.data.allJournalCategory);
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJournalCategory();
  }, []);

  // ============================= form submit to backend ======================
  const storeData = (e) => {
    const formdata = new FormData();
    formdata.append("categoryName", journalCategory.current.value);

    axios
      .post(`${BACKEND_BASE_URL}/api/admin/journal/category/store`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      .then((response) => {
        if (response.data.status === 200) {
          Swal.fire({
            icon: "success",
            text: response.data.message,
            confirmButtonColor: "#5eba86",
          });
          fetchJournalCategory();
          e.target.reset();
          setModalShow(false);
        }
      });
    e.preventDefault();
  };

  // ===================== View single image ===================================

  const showSingleImageData = (modalValue, id) => {
    setModalSize("");
    axios
      .get(`${BACKEND_BASE_URL}/api/admin/journal/category/view/${id}`)
      .then((res) => {
        // console.log(res.data);
        setModalSize("lg");
        setModalData(modalValue);
        setSingleCategoryInfo(res.data.viewJournal);
        setModalShow(true);
      });
  };

  // ===================== Edit data ==========================================
  const [Id, setId] = useState();
  const [editedJournalCat, setEditedJournalCat] = useState([]);
  const fetchDataForEdit = (modalValue, id) => {
    axios
      .get(`${BACKEND_BASE_URL}/api/admin/journal/category/edit/${id}`)
      .then((res) => {
        const { id, categoryName } = res.data.editJournalCategory;

        setId(id);
        setEditedJournalCat(categoryName);

        setModalData(modalValue);
        setModalSize("lg");
        setModalShow(true);
        // console.log("Set value to var", isChecked);
      });
  };

  // ===================== Updated data to backend ===============================

  const updateImageGallery = (e) => {
    const formdata = new FormData();
    formdata.append("_method", "PUT");
    formdata.append("categoryName", journalCategory.current.value);

    axios
      .post(
        `${BACKEND_BASE_URL}/api/admin/journal/category/update/${Id}`,
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
        fetchJournalCategory();
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
        .delete(`${BACKEND_BASE_URL}/api/admin/journal/category/delete/${id}`)
        .then((res) => {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            confirmButtonColor: "#5eba86",
          });
          fetchJournalCategory();
        });
    }
  };

  return (
    <div className="main__container">
      <div className="content-wrapper">
        <div className="breadcrumb">
          <div className="breadcrumb-item">
            <Link to="/admin">Dashboard</Link>
            {/* <Link to="#" className="before">
              Add
            </Link> */}
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
                        <th scope="col"> Name</th>
                        <th scope="col"> Handle</th>
                      </tr>
                    </thead>
                    <tbody>
                      {journalCat.map((data, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{data.categoryName}</td>
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
                              {/* Journal Category Name */}
                              <Form.Group
                                controlId="validationCustom01"
                                className="mb-3"
                              >
                                <Form.Label className="label fw-bold">
                                  Journal Category Name
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder="Journal Category Name"
                                  ref={journalCategory}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Title is required
                                </Form.Control.Feedback>
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
                            {/* Category Name */}
                            <Form.Group
                              as={Col}
                              md="6"
                              controlId="validationCustom01"
                              className="mb-3"
                            >
                              <Form.Label className="label fw-bold">
                                Category Name
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                ref={journalCategory}
                                defaultValue={editedJournalCat}
                              />
                              <Form.Control.Feedback type="invalid">
                                Title is required
                              </Form.Control.Feedback>
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
                    <h4>{singleCategoryInfo.categoryName}</h4>
                  </>
                )}
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllJournalCategory;
