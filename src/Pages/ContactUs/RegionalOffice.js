import { Button, Card, Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import Footer from "../../Component/Footer/Footer";
import Header from "../../Component/Header/Header";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import "./ContactUs.css";
import ContactForm from "../../Component/ContactFrom";
import { useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../Component/GlobalVariables";
import { useEffect } from "react";
import LoadingSpinner from "../../Component/LoadingSpinner";
import Parse from "html-react-parser";

const RegionalOffice = () => {
  //=================================== Fetch Table Data ===================================

  const [officeInfo, setOfficeInfo] = useState([]);

  const renderAllOffice = async () => {
    try {
      await axios
        .get(`${BACKEND_BASE_URL}/api/all-regional-offices`)
        .then((res) => {
          setOfficeInfo(res.data?.all_offices);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    renderAllOffice();
  }, []);

  return (
    <>
      <Header />
      <div className="contact_us main_section">
        <div className="header">
          <Card className="bg-dark text-white border-0 rounded-0">
            <Card.Img
              className="dark_filter"
              src={require("../../Assets/contact_us.jpg")}
              alt="media_image"
            />
            <Card.ImgOverlay className="d-flex justify-content-center align-items-center">
              <h1 className="m-0 f_bold ls_3px text-capitalize">Contact Us</h1>
            </Card.ImgOverlay>
          </Card>
        </div>
        <div className="bg_white my-5">
          <Container fluid="xl">
            <Row className="justify-content-center">
              <Col lg={10} xl={8} xxl={7}>
                <div className="title text-center">
                  <h2 className="f_medium">Regional Offices</h2>
                  <p className="text-muted ">
                    Welcome to RR Imperial Electrical Ltd. Please feel free to
                    contact with us any time. We are always here for your help.
                    For any kind of queries please submit the forms below. And
                    for sales related information, Corporate Sales Hotline: +880
                    17 55552582, 017 55552589. And check below for our regional
                    offices address.
                  </p>
                </div>
              </Col>
            </Row>
            <Row className="py-5 py-md-0 justify-content-center">
              {/* <Col sm={6} md={4} lg={4} className="py-md-5 mb-3 mb-md-0">
                <div className="d-flex align-items-center">
                  <div className="me-4 cl_dark_red">
                    <FiIcons.FiMapPin size="30px" />
                  </div>
                  <div className="content text-dark">
                    <h6 className="mb-0 f_bold">LOCATION</h6>
                    <p className="mb-0">Senpara, Kanchpur Narayanganj</p>
                    <p className="mb-0">Dhaka Division, Bangladesh</p>
                  </div>
                </div>
              </Col> */}
              <Col lg={10} xl={8} xxl={7}>
                <Row className="justify-content-center">
                  <Col sm={6} md={4} lg={5} className="py-md-5 mb-3 mb-md-0">
                    <div className="d-flex align-items-center justify-content-sm-center">
                      <div className=" cl_dark_red me-4">
                        <FiIcons.FiPhoneCall size="30px" />
                      </div>
                      <div className="content text-dark">
                        <h6 className="mb-0 f_bold">CONTACT US</h6>
                        <p className="mb-0">02-55034813</p>
                        <p className="mb-0">info@rr-imperial.com</p>
                      </div>
                    </div>
                  </Col>
                  <Col sm={6} md={4} lg={5} className="py-md-5 mb-3 mb-md-0">
                    <div className="d-flex align-items-center justify-content-sm-center">
                      <div className=" cl_dark_red me-4">
                        <FaIcons.FaRegClock size="30px" />
                      </div>
                      <div className="content text-dark">
                        <h6 className="mb-0 f_bold">WORKING HOURS</h6>
                        <p className="mb-0">Sat to Thur : 10:00-18:00</p>
                        <p className="mb-0">Friday Closed</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="submit_form py-5">
          <Container fluid="xl">
            <Row className="my_7 justify-content-center">
              <Col md={12} lg={11} xl={10} xxl={10} >
                <Row>
                  {officeInfo.lenght == 0 ? (
                    <LoadingSpinner />
                  ) : (
                    officeInfo?.map((data, index) => (
                      <Col md={4} sm={6} className="mb-4 office_location_right_border " key={index}>
                        <div className="h-100 my-2 office_location_border">
                          <div className="content  ">
                            {/* <h6 className="f_extrabold cl_dark_red mb-1">
                              {data?.shop_name}
                            </h6>
                            <div className="mb-0 contact_highlight">
                              {Parse(`${data?.shop_address}`)}
                            </div> */}
                            <Dropdown>
                              <Dropdown.Toggle  id="dropdown-basic" className="f_extrabold cl_dark_red mb-1 btn_custom">
                                {/* <h6 > */}
                                  {data?.shop_name}
                                {/* </h6> */}
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <div className="mb-0 contact_highlight ">
                                  {Parse(`${data?.shop_address}`)}
                                </div>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                      </Col>
                    ))
                  )}
                </Row>
              </Col>
            </Row>
            <Row className="justify-content-center home">
              <Col xl={8}>
                <div className="form_title mb-5">
                  <h2 className="f_medium">Submit Your Queries!</h2>
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat.
                  </p>
                </div>
                {/* Contact -> Submit your queries */}
                <ContactForm />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Footer topHeader="d-none" />
    </>
  );
};

export default RegionalOffice;
