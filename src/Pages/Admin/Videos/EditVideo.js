import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { BACKEND_BASE_URL } from "../../../Component/GlobalVariables";

import JoditEditor from "jodit-react";
import config from "../../../Component/JoditConfiq";

const EditVideo = () => {
  const { videoId } = useParams();
  const videoTitle = useRef();
  const videoDesc = useRef();
  const videoLink = useRef();

  // ===================== Edit data ==========================================

  // Edit value
  const [Id, setId] = useState();
  const [editedVideoTitle, setEditedVideoTitle] = useState();
  const [editedVideoLink, setEditedVideoLink] = useState();
  const [editedVideoDesc, setEditedVideoDesc] = useState();

  const fetchDataForEdit = () => {
    axios
      .get(`${BACKEND_BASE_URL}/api/admin/videos/edit/${videoId}`)
      .then((res) => {
        const { id, title, description, videoLink } = res.data.editVideo;
        setId(id);
        setEditedVideoTitle(title);
        setEditedVideoLink(videoLink);
        setEditedVideoDesc(description);
      });
  };

  useEffect(() => {
    fetchDataForEdit();
  }, []);

  // ===================== Updated data to backend ===============================
  const updateSliderInfo = (e) => {
    const formdata = new FormData();
    formdata.append("_method", "PUT");

    formdata.append("title", videoTitle.current.value);
    formdata.append("description", videoDesc.current.value);
    formdata.append("videoLink", videoLink.current.value);

    // console.log(formdata);
    axios
      .post(`${BACKEND_BASE_URL}/api/admin/videos/update/${Id}`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })

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
        <div className="breadcrumb">
          <div className="breadcrumb-item">
            <Link to="/admin">Dashboard</Link>
            <Link to="#" className="before">
              Update Video
            </Link>
          </div>
        </div>
        <div className="col-md-12 mt-3">
          <div className="card">
            <div className="card-body">
              <div className="col-lg-12">
                <span className="top-border"></span>
                <div className=" mt-2">
                  <Link to="/admin/videos">
                    <Button variant="danger">All Videos</Button>
                  </Link>
                </div>

                <Form onSubmit={updateSliderInfo}>
                  <div className="content-wrapper">
                    <div className="card">
                      <div className="card-body">
                        <Row className="py-3">
                          {/* Video Title */}
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Video Title
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              ref={videoTitle}
                              defaultValue={editedVideoTitle}
                            />
                            <Form.Control.Feedback type="invalid">
                              Title is required
                            </Form.Control.Feedback>
                          </Form.Group>

                          {/* Video Link */}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              YouTube Embed Link &nbsp;{" "}
                              <span className="text-danger">*</span>
                            </Form.Label>

                            <Form.Control
                              required
                              type="text"
                              placeholder=" YouTube Embed Link"
                              ref={videoLink}
                              defaultValue={editedVideoLink}
                            />

                            <Form.Control.Feedback type="invalid">
                              Please choose a link
                            </Form.Control.Feedback>
                          </Form.Group>

                          {/* News Description */}
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
                              ref={videoDesc}
                              value={editedVideoDesc}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVideo;
