import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { BACKEND_BASE_URL } from "../../Component/GlobalVariables";
import Parse from "html-react-parser";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../Component/LoadingSpinner";

const ProductDetails = () => {
  const { productSlug } = useParams();
  // Fetch Table DATA
  const [productInfo, setProductInfo] = useState([]);

  const fetchProductData = () => {
    axios.get(`${BACKEND_BASE_URL}/api/products/${productSlug}`).then((res) => {
      setProductInfo(res?.data?.product_info);
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productSlug]);

  return (
    <>
      {productInfo == null ? (
        <div className="d-flex justify-content-center mt-5">
          <LoadingSpinner />
        </div>
      ) : (
        <div>

          {/* sec2_header */}
          <div className="sec2_header bg_dark_red">
            <p className="my-0 mx-2 py-2 cl_white f_bold">
              <span className="f_medium">{productInfo?.name}</span>&nbsp;|&nbsp;
              <span className="f_medium">{productInfo?.specification}</span>
            </p>
          </div>
          {/* Reach/Rohs */}

          <div className="reach_rohs mt-4">
            <div className="reach_rohs_content">
              <Row>
                <Col md={6} className="position-relative image_partition">
                  <h6 className="f_extrabold  cl_dark_red text-end">
                    *REACH | RoHS | CE
                  </h6>

                  <div className="cable_image mb-4">
                    <img
                      className="img-fluid"
                      src={`${BACKEND_BASE_URL}/${productInfo?.image}`}
                      alt=""
                    />
                  </div>
                  <div className="insulator_image">
                    <img
                      className="img-fluid ms-3"
                      src={`${BACKEND_BASE_URL}/${productInfo?.small_image}`}
                      alt=""
                    />
                  </div>
                </Col>

                <Col md={6} className="">
                  <div>
                    <h5 className="title_after my-4 text-uppercase">
                      {" "}
                      <span className="cl_dark_red f_extrabold">
                        {" "}
                        characteristics{" "}
                      </span>
                    </h5>

                    <div className="characteristics_image d-flex flex-wrap">
                      <img
                        className="img-fluid me-2 mb-2"
                        src={require("../../Assets/characteristics.png")}
                        alt=""
                      />
                      <img
                        className="img-fluid me-2 mb-2"
                        src={require("../../Assets/characteristics.png")}
                        alt=""
                      />
                      <img
                        className="img-fluid me-2 mb-2"
                        src={require("../../Assets/characteristics.png")}
                        alt=""
                      />
                      <img
                        className="img-fluid me-2 mb-2"
                        src={require("../../Assets/characteristics.png")}
                        alt=""
                      />
                      <img
                        className="img-fluid me-2 mb-2"
                        src={require("../../Assets/characteristics.png")}
                        alt=""
                      />
                      <img
                        className="img-fluid me-2 mb-2"
                        src={require("../../Assets/characteristics.png")}
                        alt=""
                      />
                      <img
                        className="img-fluid me-2 mb-2"
                        src={require("../../Assets/characteristics.png")}
                        alt=""
                      />
                      <img
                        className="img-fluid me-2 mb-2"
                        src={require("../../Assets/characteristics.png")}
                        alt=""
                      />
                      <img
                        className="img-fluid me-2 mb-2"
                        src={require("../../Assets/characteristics.png")}
                        alt=""
                      />
                    </div>
                  </div>

                  <div>
                    <h5 className="title_after my-4 text-uppercase">
                      {" "}
                      <span className="cl_dark_red f_extrabold">
                        {" "}
                        Installation Condition{" "}
                      </span>
                    </h5>

                    <div className="characteristics_image d-flex flex-wrap">
                      <img
                        className="img-fluid me-2 mb-2"
                        src={require("../../Assets/characteristics.png")}
                        alt=""
                      />
                      <img
                        className="img-fluid me-2 mb-2"
                        src={require("../../Assets/characteristics.png")}
                        alt=""
                      />
                      <img
                        className="img-fluid me-2 mb-2"
                        src={require("../../Assets/characteristics.png")}
                        alt=""
                      />
                      <img
                        className="img-fluid me-2 mb-2"
                        src={require("../../Assets/characteristics.png")}
                        alt=""
                      />
                      <img
                        className="img-fluid me-2 mb-2"
                        src={require("../../Assets/characteristics.png")}
                        alt=""
                      />
                      <img
                        className="img-fluid me-2 mb-2"
                        src={require("../../Assets/characteristics.png")}
                        alt=""
                      />
                      <img
                        className="img-fluid me-2 mb-2"
                        src={require("../../Assets/characteristics.png")}
                        alt=""
                      />
                      <img
                        className="img-fluid me-2 mb-2"
                        src={require("../../Assets/characteristics.png")}
                        alt=""
                      />
                      <img
                        className="img-fluid me-2 mb-2"
                        src={require("../../Assets/characteristics.png")}
                        alt=""
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          {/* sec3_application */}
          <div className="sec3_application mb-4">
            <h5 className="title_after my-4 text-uppercase">
              {" "}
              <span className="cl_dark_red f_extrabold"> Application </span>
            </h5>
            <div className="product_application p-0 d-flex flex-wrap">
              {Parse(`${productInfo?.application}`)}
            </div>
          </div>
          {/* sec4_construction */}
          <div className="sec4_construction mb-3">
            <h5 className="title_after my-4 text-uppercase">
              {" "}
              <span className="cl_dark_red f_extrabold"> Construction </span>
            </h5>
            {/* content */}
            <div className="content">
              {Parse(`${productInfo?.construction}`)}
            </div>
          </div>

          {/* Voltage Grade & Operating Temp */}
          <div>
            <Row>
              <Col className="pe-0 mb-3" md={6}>
                <div className="">
                  <h5 className="title_after my-4 text-uppercase">
                    {" "}
                    <span className="cl_dark_red f_extrabold">
                      {" "}
                      Voltage Grade{" "}
                    </span>
                  </h5>
                  {/* content */}
                  <div className="content">
                    {Parse(`${productInfo?.voltage_grade}`)}
                  </div>
                </div>
              </Col>
              <Col md={6} className="pe-0 px-lg-0  mb-3">
                <div className="">
                  <h5 className="title_after my-4 text-uppercase">
                    {" "}
                    <span className="cl_dark_red f_extrabold">
                      {" "}
                      Operating Temp{" "}
                    </span>
                  </h5>
                  {/* content */}
                  <div className="content">
                    {Parse(`${productInfo?.operating_temp}`)}
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          {/* Min.bending Radius & Standard  & Color */}
          <div>
            <Row>
              <Col className="pe-0 mb-3" sm={6} lg={4}>
                <div className="sec4_construction">
                  <h5 className="title_after my-4 text-uppercase">
                    {" "}
                    <span className="cl_dark_red f_extrabold">
                      {" "}
                      Min.bending Radius{" "}
                    </span>
                  </h5>
                  {/* content */}
                  <div className="content">
                    {Parse(`${productInfo?.min_bending_radius}`)}
                  </div>
                </div>
              </Col>
              <Col sm={6} lg={3} className="pe-0 px-lg-0 mb-3">
                <div className="sec4_construction">
                  <h5 className="title_after my-4 text-uppercase">
                    {" "}
                    <span className="cl_dark_red f_extrabold"> Standard </span>
                  </h5>
                  {/* content */}
                  <div className="content">
                    {Parse(`${productInfo?.standard}`)}
                  </div>
                </div>
              </Col>
              <Col sm={6} lg={5} className="pe-0 px-lg-0 mb-3">
                <div className="sec4_construction">
                  <h5 className="title_after my-4 text-uppercase">
                    <span className="cl_dark_red f_extrabold"> Color </span>
                  </h5>
                  {/* content */}
                  <div className="content">
                    {/* Insulation */}
                    <div className="d-flex">
                      <p className="f_bold mb-0" style={{ minWidth: "85px" }}>
                        Insulation :
                      </p>

                      {/* color variable */}
                      <div>
                        {productInfo?.colors?.map((data, index) => {
                          var color = data.color_code.split("-");

                          return (
                            <>
                              <div className="d-flex flex-wrap align-items-center">
                                <div
                                  className="color_circle"
                                  style={{
                                    backgroundColor: color[1],
                                    height: "15px",
                                    width: "15px",
                                    borderRadius: "50%",
                                    marginLeft: "5px",
                                  }}
                                >
                                  {" "}
                                </div>
                                <div className="ms-1">{color[0]} &nbsp;</div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                    {/* Sheath */}
                    {/* <div className="d-flex">
                <p className="f_bold mb-0" style={{ minWidth: "85px" }}>
                  Sheath :
                </p>

             

                <div>
                  <div className="d-flex flex-wrap align-items-center">
                    <p
                      className="dynami_color_code mb-0"
                      style={{ background: "grey" }}
                    ></p>
                    <p className="mb-0">Grey</p>
                  </div>
                </div>
              </div> */}
                  </div>
                </div>
              </Col>
            </Row>
          </div>



          {/* table */}

          <div className="table-responsive mt-5">
            <div className="product_details_table">
              {Parse(`${productInfo?.cable_design_parameter}`)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
