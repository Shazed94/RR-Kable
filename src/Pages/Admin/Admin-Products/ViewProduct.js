import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../../Component/GlobalVariables";
import Parse from "html-react-parser";

const ViewProduct = () => {
  const { productId } = useParams();
  const [productInfo, setProductInfo] = useState([]);
  // ===================== View single image ===================================
  const showSingleProductData = (id) => {
    axios
      .get(`${BACKEND_BASE_URL}/api/admin/products/view/${productId}`)
      .then((res) => {
        setProductInfo(res.data.single_product);
      });
  };

  useEffect(() => {
    showSingleProductData();
  }, []);

  return (
    <div className="main__container">
      <div className="content-wrapper">
        <div className="breadcrumb d-flex justify-content-between">
          <div className="breadcrumb-item">
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/products/add-new" className="before">
              Add New Product
            </Link>
          </div>
          <div className="breadcrumb-item p-0">
            <Link to="/admin/products">All Product</Link>
          </div>
        </div>

        <div className="content-wrapper">
          <div className="card ">
            <div className="card-body mb-5">
              <span className="top-border "></span>
            </div>

            <h3>Product Name: {productInfo?.name}</h3>
            <h5>Category: {productInfo?.category?.category_name}</h5>
            <div>
              <img
                src={`${BACKEND_BASE_URL}/${productInfo?.image}`}
                alt=""
                className="img-thumbnail"
              />
            </div>
            {Parse(`Application: ${productInfo?.application}`)}

            {Parse(`Specification: ${productInfo?.specification}`)}
            {Parse(`Construction: ${productInfo?.construction}`)}
            {Parse(`Voltage Grade: ${productInfo?.voltage_grade}`)}
            {Parse(`Operating Temp: ${productInfo?.operating_temp}`)}
            {Parse(`Min Bending Radius ${productInfo?.min_bending_radius}`)}
            {Parse(`Standard: ${productInfo?.standard}`)}
            <div>
              {productInfo?.colors?.map((data, index) => {
                var color = data.color_code.split("-");

                return (
                  <>
                    <div className="d-flex align-items-center">
                      <div className="col-md-1">{color[0]} &nbsp;</div>
                      <div
                        className="color_circle"
                        style={{
                          backgroundColor: color[1],
                          height: "20px",
                          width: "20px",
                          borderRadius: "50%",
                        }}
                      >
                        {" "}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <div>
              {Parse(
                `Cable Design Parameter: ${productInfo?.cable_design_parameter}`
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
