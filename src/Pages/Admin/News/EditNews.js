import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { BACKEND_BASE_URL } from "../../../Component/GlobalVariables";

import JoditEditor from "jodit-react";
import config from "../../../Component/JoditConfiq";

const EditNews = () => {
  const { newsId } = useParams();

  const newsAuthor = useRef();
  const newsTitle = useRef();
  const newsLink = useRef();
  const newsDesc = useRef();
  const newsImage = useRef();

  // ===================== Edit data ==========================================

  // Edit value
  const [Id, setId] = useState();
  const [editedAuthorName, setEditedAuthorName] = useState();
  const [editedNewsTitle, setEditedNewsTitle] = useState();
  const [editedNewsLink, setEditedNewsLink] = useState();
  const [editedNewsImage, setEditedNewsImage] = useState();
  const [editedNewsDesc, setEditedNewsDesc] = useState();

  const fetchDataForEdit = () => {
    setFile([]);

    axios
      .get(`${BACKEND_BASE_URL}/api/admin/news/edit/${newsId}`)
      .then((res) => {
        const { id, author, date, title, description, image,src_link } =
          res.data.editNews;
        setId(id);
        setEditedAuthorName(author);
        setEditedNewsTitle(title);
        setEditedNewsLink(src_link);
        setEditedNewsImage(image);
        setEditedNewsDesc(description);
      });
  };

  useEffect(() => {
    fetchDataForEdit();
  }, []);

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
  const updateSliderInfo = (e) => {
    const formdata = new FormData();
    formdata.append("_method", "PUT");
    formdata.append("author", newsAuthor.current.value);
    formdata.append("title", newsTitle.current.value);
    formdata.append("src_link", newsLink.current.value);
    formdata.append("description", newsDesc.current.value);

    if (newsImage.current.files[0]) {
      formdata.append("image", newsImage.current.files[0]);
    }

    // console.log(formdata);
    axios
      .post(`${BACKEND_BASE_URL}/api/admin/news/update/${Id}`, formdata, {
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
              Update News
            </Link>
          </div>
        </div>
        <div className="col-md-12 mt-3">
          <div className="card">
            <div className="card-body">
              <div className="col-lg-12">
                <span className="top-border"></span>
                <div className=" mt-2">
                  <Link to="/admin/news">
                    <Button variant="danger">All News</Button>
                  </Link>
                </div>

                <Form onSubmit={updateSliderInfo}>
                  <div className="content-wrapper">
                    <div className="card">
                      <div className="card-body">
                        <Row className="py-3">
                          {/* News Title */}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              News Title
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              ref={newsTitle}
                              defaultValue={editedNewsTitle}
                            />
                            <Form.Control.Feedback type="invalid">
                              Title is required
                            </Form.Control.Feedback>
                          </Form.Group>
                          {/* News Link */}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              News Link
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              ref={newsLink}
                              defaultValue={editedNewsLink}
                            />
                            <Form.Control.Feedback type="invalid">
                              Title is required
                            </Form.Control.Feedback>
                          </Form.Group>

                          {/* News Author */}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Author Name
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              ref={newsAuthor}
                              defaultValue={editedAuthorName}
                            />
                            <Form.Control.Feedback type="invalid">
                              Author Name is required
                            </Form.Control.Feedback>
                          </Form.Group>

                          {/* News Image */}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Image
                            </Form.Label>

                            <Form.Control
                              type="file"
                              ref={newsImage}
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
                                src={`${BACKEND_BASE_URL}/${editedNewsImage}`}
                                alt={newsTitle}
                                name="img"
                              />
                            )}

                            <Form.Control.Feedback type="invalid">
                              Please choose an image
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
                              Short Description
                            </Form.Label>
                            <JoditEditor
                              tabIndex={1}
                              config={config}
                              ref={newsDesc}
                              value={editedNewsDesc}
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

export default EditNews;
