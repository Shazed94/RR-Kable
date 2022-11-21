import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import "./Product.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import { BACKEND_BASE_URL } from "../../Component/GlobalVariables";
import Parse from "html-react-parser";
import { NavLink, Outlet } from "react-router-dom";
import axios from "axios";

const Product = () => {

  const [clickState, setClickState] = useState();

  const ToggleClass = (index) => {
    setClickState(index);
  };


  const [productInfo, setProductInfo] = useState([{}]);
  console.log(productInfo);

  const fetchProductData = () => {
    axios.get(`${BACKEND_BASE_URL}/api/products-categories`).then((res) => {
      setProductInfo(res?.data?.category_with_product);
    });
  };

  useEffect(() => {
    fetchProductData();
  }, []);


  return (
    <>
      <Header />
      <div className="product main_section">
        <div className="sec1_header">
          <Card className="bg-dark text-white border-0 rounded-0">
            <Card.Img
              src={require("../../Assets/product_bg.png")}
              alt="Card_image"
            />
            <Card.ImgOverlay className="d-flex justify-content-center align-items-center">
              <h1 className="m-0 f_bold ls_3px">Product</h1>
            </Card.ImgOverlay>
          </Card>
        </div>

        <div className="user my-4">
          <Container fluid="xl">
            <Row>
              <Col md={4} className="mb-4 mb-md-0">
                <div className="leftbar noInterrupt h-100 bg_dark_red">
                  <ul className=" pb-3 mb-0 px-4">
                    {
                      productInfo.map((data, id) => (
                        <div key={id}
                          className={`accordion_item  ${clickState === data.id ? "acordian_active" : ""
                            }`}

                        >
                          <div
                            className="accordion_item_header f_bold"
                            onClick={() => ToggleClass(data.id)}
                          >
                            <li className="text-capitalize px-3 py-3 f_bold w-100">
                              <FaIcons.FaAngleDoubleRight className="me-2 mb_2px rotate_test" />
                              {data.category_name}
                            </li>

                          </div>
                          <ul className="accordion_item_body px-0">
                            {
                              data?.products?.map((product, id) => (
                                <NavLink to={`details/${product.slug}`} key={id}>
                                  <li className="text-capitalize  ps-5 pe-3 py-3 f_bold w-100">
                                    {product.name}
                                  </li>
                                </NavLink>
                              ))
                            }

                          </ul>
                        </div>
                      ))
                    }
                  </ul>
                </div>
              </Col>

              <Col md={8}>
                <div className="rightbar  ">
                  <Outlet />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
