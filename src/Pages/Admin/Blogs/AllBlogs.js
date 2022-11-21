import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import * as FiIcons from "react-icons/fi";
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as CgIcons from "react-icons/cg";
import * as MdIcons from "react-icons/md";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { BACKEND_BASE_URL } from "../../../Component/GlobalVariables";
import { Link } from "react-router-dom";
import Parse from "html-react-parser";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

const AllBlogs = () => {
  // Modal Section Data
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState(false);

  //=================================== Fetch Table Data ===================================

  const [blogInfo, setBlogsInfo] = useState([]);
  //   const [date, setDate] = useState([]);
  const renderAllBlogs = async () => {
    try {
      await axios.get(`${BACKEND_BASE_URL}/api/admin/blogs`).then((res) => {
        setBlogsInfo(res.data.allBlog);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    renderAllBlogs();
  }, []);

  // ===================== View single image ===================================
  const [singleBlogsInfo, setSingleBlogsInfo] = useState([]);

  const showSingleSliderData = (modalValue, id) => {
    axios.get(`${BACKEND_BASE_URL}/api/admin/blogs/view/${id}`).then((res) => {
      setModalData(true);
      setModalData(modalValue);
      setSingleBlogsInfo(res.data.viewBlog);
      setModalShow(true);
      //   setDate(res.data.created_at);
    });
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
        .delete(`${BACKEND_BASE_URL}/api/admin/blogs/delete/${id}`)
        .then((res) => {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            confirmButtonColor: "#5eba86",
          });
          renderAllBlogs();
        });
    }
  };

  return (
    <div className="main__container">
      <div className="content-wrapper">
        <div className="breadcrumb d-flex justify-content-between">
          <div className="breadcrumb-item">
            <Link to="/admin">Dashboard</Link>
            <Link to="add-new" className="before">
              Add New Blog
            </Link>
          </div>
          <div className="breadcrumb-item p-0">
            <Link to="/admin/blogs">All Blogs</Link>
          </div>
        </div>

        <div className="content-wrapper">
          <div className="card">
            <div className="card-body">
              <span className="top-border"></span>
              <div className="p-2">
                <div className="card-header">
                  <Button
                    as={Link}
                    to="add-new"
                    variant="success"
                    size="sm"
                    className="border-0"
                  >
                    Add &nbsp;
                    <span>
                      <AiIcons.AiOutlinePlusCircle />
                    </span>
                  </Button>

                  <hr />
                </div>
              </div>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Author Name</th>
                    <th>Blog Title</th>
                    <th>Featured Image</th>
                    <th>Handle</th>
                  </tr>
                </thead>
                <tbody>
                  {blogInfo.map((data, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{data.author}</td>
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
                      <td>
                        {/* view button */}
                        <button
                          onClick={() => showSingleSliderData("View", data.id)}
                          className="py-1 px-2 bg-info border-0 rounded-3 me-1 mb-1"
                        >
                          <FaIcons.FaEye
                            style={{
                              color: "white",
                            }}
                            title="View"
                            size="1.5em"
                          />
                        </button>
                        {/* edit button */}
                        <Link to={`edit/${data.id}`}>
                          <button className="py-1 px-2 bg-warning border-0 rounded-3 me-1 mb-1">
                            <BiIcons.BiEdit
                              style={{
                                color: "white",
                              }}
                              title="Edit"
                              size="1.5em"
                            />
                          </button>
                        </Link>
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
              </Table>
            </div>
            <Modal
              size="lg"
              show={modalShow}
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
                {/* View Modal section */}
                {modalData === "View" && (
                  <>
                    <h4>{singleBlogsInfo.title}</h4>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex justify-content-between align-items-center">
                        <FaIcons.FaUserTie />
                        &nbsp; {singleBlogsInfo.author}
                      </div>
                      <p>
                        <FaIcons.FaCalendarAlt />
                        &nbsp;
                        {moment(singleBlogsInfo.created_at).format("DD-MM-Y")}
                      </p>
                    </div>

                    <div className="text-center my-5">
                      <img
                        className="img-fluid"
                        src={`${BACKEND_BASE_URL}/${singleBlogsInfo.image}`}
                        alt=""
                      />
                    </div>
                    <div className="mt-2">
                      {Parse(`${singleBlogsInfo.description}`)}
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

export default AllBlogs;
