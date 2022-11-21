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
import config from "../../Component/JoditConfiq";
import JoditEditor from "jodit-react";

const ProductCategories = () => {
  const categoryName = useRef();
  const tableDesc = useRef();

  //=================================== Fetch Table Data ===============================
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

 

  // Modal Section Data
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState("");
  const [modalSize, setModalSize] = useState("lg");

  // Edit value
  const [editedCategoryName, setEditedCategoryName] = useState();

  // ============================= Add new data =============================

  const addNewData = (modalValue) => {
    setModalSize("xl");
    setModalData(modalValue);
    setModalShow(true);
  };

  // ============================= form submit to backend ======================

  const storeData = (e) => {
    const formdata = new FormData();
    formdata.append("category_name", categoryName.current.value);

    axios
      .post(
        `${BACKEND_BASE_URL}/api/admin/products/categories/store`,
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
          renderAllCategories();
          e.target.reset();
          setModalShow(false);
        }
      });
    console.log("submitted");
    e.preventDefault();
  };

  // ===================== Edit data ==========================================

  const [Id, setId] = useState();


  const fetchDataForEdit = (modalValue, id) => {
    axios
      .get(`${BACKEND_BASE_URL}/api/admin/products/categories/edit/${id}`)
      .then((res) => {
        const { id, category_name } = res.data.edit_category;
        // console.log("db is home", isHome);
        setId(id);
        setEditedCategoryName(category_name);
       
        setModalData(modalValue);
        setModalSize("xl");
        setModalShow(true);
      });
  };

  // ===================== Updated data to backend ===============================

  const updatedSlider = (e) => {
    const formdata = new FormData();
    formdata.append("_method", "PUT");
    formdata.append("category_name", categoryName.current.value);

    axios
      .post(
        `${BACKEND_BASE_URL}/api/admin/products/categories/update/${Id}`,
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
        renderAllCategories();
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
        .delete(
          `${BACKEND_BASE_URL}/api/admin/products/categories/delete/${id}`
        )
        .then((res) => {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            confirmButtonColor: "#5eba86",
          });
          renderAllCategories();
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
                        <th scope="col">Category Name</th>
                        <th scope="col">Handle</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.length != 0 ? (
                        category?.map((data, index) => (
                          <tr key={index}>
                            <td> {index + 1}</td>
                            <td>{data.category_name}</td>
                            <td>
                              {/* edit button */}
                              <button
                                onClick={() =>
                                  fetchDataForEdit("Edit", data.id)
                                }
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
                              {/* <button
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
                              </button> */}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="text-danger">
                            No Category Found
                          </td>
                        </tr>
                      )}
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

                              {/* Category Name */}
                              <Form.Group
                                as={Col}
                                md="12"
                                controlId="validationCustom01"
                                className="mb-3"
                              >
                                <Form.Label className="label fw-bold">
                                  Category title
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="category name"
                                  ref={categoryName}
                                />
                              </Form.Group>

                              {/* Category Description */}
                              {/* <Form.Group
                                as={Col}
                                md="12"
                                controlId="validationCustom02"
                                className="mb-3"
                              >
                                <Form.Label className="label fw-bold">
                                 Category Description
                                </Form.Label>
                                <JoditEditor
                                  tabIndex={1}
                                  config={config}
                                  ref={tableDesc}
                                />
                              </Form.Group> */}

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

                            {/* Category Name */}
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom01"
                              className="mb-3"
                            >
                              <Form.Label className="label fw-bold">
                                Category Title
                              </Form.Label>
                              <Form.Control
                                type="text"
                                ref={categoryName}
                                defaultValue={editedCategoryName}
                              />
                            </Form.Group>

                            {/* Category Description */}
                            {/* <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom02"
                              className="mb-3"
                            >
                              <Form.Label className="label fw-bold">
                                Table Design
                              </Form.Label>
                              <JoditEditor
                                tabIndex={1}
                                config={config}
                                ref={tableDesc}
                                value={editedTableDesc}
                              />
                            </Form.Group> */}

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

export default ProductCategories;
