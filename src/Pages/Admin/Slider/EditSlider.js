import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { BACKEND_BASE_URL } from "../../../Component/GlobalVariables";

const EditSlider = () => {
  const { bannerId } = useParams();
  console.log(bannerId);
  const sliderTitleOne = useRef();
  const sliderTitleTwo = useRef();
  // const sliderBtn = useRef();
  const sliderImage = useRef();

  // ===================== Edit data ==========================================

  // Edit value
  const [Id, setId] = useState();
  const [editedSliderTitle1, setEditedSliderTitle1] = useState();
  const [editedSliderTitle2, setEditedSliderTitle2] = useState();
  const [editedSliderImage, setEditedSliderImage] = useState();

  const fetchDataForEdit = () => {
    setFile([]);

    axios
      .get(`${BACKEND_BASE_URL}/api/admin/banners-image/edit/${bannerId}`)
      .then((res) => {
        const { id, title1, title2, image } = res.data.editBanner;
        setId(id);
        setEditedSliderTitle1(title1);
        setEditedSliderTitle2(title2);
        setEditedSliderImage(image);
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
    formdata.append("title1", sliderTitleOne.current.value);
    formdata.append("title2", sliderTitleTwo.current.value);
    if(sliderImage.current.files[0]){
      formdata.append("image", sliderImage.current.files[0]);
    }

    // console.log(formdata);
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
            <Link to="#" className="before">
              Update Slider
            </Link>
          </div>
          <div className="breadcrumb-item p-0">
            <Link to="/admin/sliders">All Sliders</Link>
          </div>
        </div>
        <div className="col-md-12 mt-3">
          <div className="card">
            <div className="card-body">
              <div className="col-lg-12">
                <span className="top-border"></span>
                <Form onSubmit={updateSliderInfo}>
                  <div className="content-wrapper">
                    <div className="card">
                      <div className="card-body">
                        <Row className="py-3">
                          {/* Slider Title One */}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Slider Title One
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              ref={sliderTitleOne}
                              defaultValue={editedSliderTitle1}
                            />
                            <Form.Control.Feedback type="invalid">
                              Title is required
                            </Form.Control.Feedback>
                          </Form.Group>

                          {/* Slider Title Two */}
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Slider Title Two
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              ref={sliderTitleTwo}
                              defaultValue={editedSliderTitle2}
                            />
                            <Form.Control.Feedback type="invalid">
                              Title is required
                            </Form.Control.Feedback>
                          </Form.Group>

                          {/* Slider Image */}
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom01"
                            className="mb-3"
                          >
                            <Form.Label className="label fw-bold">
                              Image
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
                                className="img-thumbnail mt-1"
                                width={80}
                                height={50}
                                src={`${BACKEND_BASE_URL}/${editedSliderImage}`}
                                alt={sliderTitleOne}
                                name="img"
                              />
                            )}

                            <Form.Control.Feedback type="invalid">
                              Please choose an image
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSlider;
