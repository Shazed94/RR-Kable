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
import JoditEditor from "jodit-react";
import Parse from "html-react-parser";

const AllJournalCategory = () => {
  const postTitle = useRef();
  const postImage = useRef();
  const categoryId = useRef();
  const postShortDesc = useRef();
  const postDesc = useRef();

  // Modal Section Data
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState("");
  const [modalSize, setModalSize] = useState("lg");

  // View single category
  const [singlePostInfo, setSinglePostInfo] = useState([]);

  const addNewData = (modalValue) => {
    setModalSize("lg");
    setModalData(modalValue);
    setModalShow(true);
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

  //=================================== Fetch Table Data ===================================

  const [journalPost, setjournalPost] = useState([]);
  const [alljournalCat, setAlljournalCat] = useState([]);

  const fetchPost = async () => {
    try {
      await axios
        .get(`${BACKEND_BASE_URL}/api/admin/journal/post`)
        .then((res) => {
          setjournalPost(res.data.allJournalPosts);
          setAlljournalCat(res.data.allJournalCategories);
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  // ============================= form submit to backend ======================

  const storeData = (e) => {
    const formdata = new FormData();
    formdata.append("title", postTitle.current.value);
    formdata.append("image", postImage.current.files[0]);
    formdata.append("categoryId", categoryId.current.value);
    formdata.append("shortDescription", postShortDesc.current.value);
    formdata.append("description", postDesc.current.value);

    axios
      .post(`${BACKEND_BASE_URL}/api/admin/journal/post/store`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      .then((response) => {
        if (response.data.status === 200) {
          Swal.fire({
            icon: "success",
            text: response.data.message,
            confirmButtonColor: "#5eba86",
          });
          fetchPost();
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
      .get(`${BACKEND_BASE_URL}/api/admin/journal/post/view/${id}`)
      .then((res) => {
        // console.log(res.data);
        setModalSize("lg");
        setModalData(modalValue);
        setSinglePostInfo(res.data.viewJournalPost);
        setModalShow(true);
      });
  };

  // ===================== Edit data ==========================================
  const [Id, setId] = useState();
  const [editedPostTitle, setEditedPostTitle] = useState([]);
  const [editedImage, setEditedImage] = useState([]);
  const [editedCategoryId, setEditedCategoryId] = useState([]);
  const [editedShortDesc, setEditedShortDesc] = useState([]);
  const [editedDesc, setEditedDesc] = useState([]);
  const fetchDataForEdit = (modalValue, id) => {
    axios
      .get(`${BACKEND_BASE_URL}/api/admin/journal/post/edit/${id}`)
      .then((res) => {
        const { id, categoryId, title, image, shortDescription, description } =
          res.data.editJournalPost;
        console.log(categoryId);
        setId(id);
        setEditedPostTitle(title);
        setEditedImage(image);
        setEditedCategoryId(categoryId);
        setEditedShortDesc(shortDescription);
        setEditedDesc(description);

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
    formdata.append("title", postTitle.current.value);
    if (postImage.current.files[0]) {
      formdata.append("image", postImage.current.files[0]);
    }
    formdata.append("categoryId", categoryId.current.value);
    formdata.append("shortDescription", postShortDesc.current.value);
    formdata.append("description", postDesc.current.value);

    axios
      .post(
        `${BACKEND_BASE_URL}/api/admin/journal/post/update/${Id}`,
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
        fetchPost();
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
        .delete(`${BACKEND_BASE_URL}/api/admin/journal/post/delete/${id}`)
        .then((res) => {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            confirmButtonColor: "#5eba86",
          });
          fetchPost();
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
                        <th scope="col"> Title</th>
                        <th scope="col"> Image</th>
                        <th scope="col"> Category</th>
                        <th scope="col"> Handle</th>
                      </tr>
                    </thead>
                    <tbody>
                      {journalPost.map((data, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{data.title}</td>
                          <td>
                            <img
                              src={`${BACKEND_BASE_URL}/${data.image}`}
                              alt={data.title}
                              width={80}
                              height={50}
                              className="img-thumbnail"
                            />
                          </td>
                          <td>{data.journal_categories.categoryName}</td>
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
                              {/* Post Title */}
                              <Form.Group
                                controlId="validationCustom01"
                                className="mb-3"
                              >
                                <Form.Label className="label fw-bold">
                                  Title
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder="Journal Category Name"
                                  ref={postTitle}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Title is required
                                </Form.Control.Feedback>
                              </Form.Group>

                              {/* Post Image */}
                              <Form.Group
                                as={Col}
                                md="6"
                                controlId="validationCustom01"
                                className="mb-3"
                              >
                                <Form.Label className="label fw-bold">
                                  Image Link{" "}
                                  <span className="text-danger">*</span>
                                </Form.Label>

                                <Form.Control
                                  required
                                  type="file"
                                  ref={postImage}
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

                              {/* Category Id Dropdown */}
                              <Form.Group
                                as={Col}
                                md="6"
                                controlId="validationCustom01"
                                className="mb-3"
                              >
                                <Form.Label className="label fw-bold">
                                  Category{" "}
                                  <span className="text-danger"> *</span>
                                </Form.Label>
                                <Form.Select
                                  required
                                  aria-label="Default select example"
                                  ref={categoryId}
                                >
                                  <option value="0">Select Category</option>
                                  {alljournalCat.map((data, index) => {
                                    return (
                                      <option key={index} value={data.id}>
                                        {data.categoryName}
                                      </option>
                                    );
                                  })}
                                </Form.Select>
                              </Form.Group>

                              {/* Post Short Description */}
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
                                  ref={postShortDesc}
                                  config={config}
                                  tabIndex={1}
                                />
                              </Form.Group>

                              {/* Post Description */}
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
                                  ref={postDesc}
                                  config={config}
                                  tabIndex={1}
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
                            {/* Post Title */}
                            <Form.Group
                              as={Col}
                              md="6"
                              controlId="validationCustom01"
                              className="mb-3"
                            >
                              <Form.Label className="label fw-bold">
                                Title
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                ref={postTitle}
                                defaultValue={editedPostTitle}
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
                                ref={postImage}
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
                                  src={`${BACKEND_BASE_URL}${editedImage}`}
                                  alt={editedPostTitle}
                                />
                              )}
                            </Form.Group>

                            {/* Category Id Dropdown */}
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom01"
                              className="mb-3"
                            >
                              <Form.Label className="label fw-bold">
                                Category
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Select
                                aria-label="Default select example"
                                required
                                ref={categoryId}
                                defaultValue={editedCategoryId}
                              >
                                <option value="0">Select Category</option>

                                {alljournalCat.map((data, index) => {
                                  return (
                                    <option
                                      key={index}
                                      value={data.id}
                                      selected={
                                        data.id == editedCategoryId
                                          ? "selected"
                                          : ""
                                      }
                                    >
                                      {data.categoryName}
                                    </option>
                                  );
                                })}
                              </Form.Select>
                            </Form.Group>
                            {/* Post Short Description */}
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
                                ref={postShortDesc}
                                value={editedShortDesc}
                              />
                            </Form.Group>

                            {/* Post Description */}
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
                                tabIndex={1}
                                config={config}
                                ref={postDesc}
                                value={editedDesc}
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
                    <div className="text-center">
                      <img
                        src={`${BACKEND_BASE_URL}/${singlePostInfo.image}`}
                        alt={singlePostInfo.title}
                        className="img-fluid"
                      />
                    </div>
                    <div className=" my-3 d-flex justify-content-between align-items-center">
                      <h3>{singlePostInfo.title}</h3>
                      <p className="text-muted p-1 bg_grey border-2 rounded-1">
                        {singlePostInfo.journal_categories.categoryName}
                      </p>
                    </div>
                    <hr />
                    <div className="mt-2">
                      {Parse(`${singlePostInfo.shortDescription}`)}
                    </div>
                    <hr />
                    <div className="mt-2">
                      {Parse(`${singlePostInfo.description}`)}
                    </div>
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
