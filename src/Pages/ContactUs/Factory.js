import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Footer from "../../Component/Footer/Footer";
import Header from "../../Component/Header/Header";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import "./ContactUs.css";
import ContactForm from "../../Component/ContactFrom";

const Factory = () => {
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
                  <h2 className="f_medium">Factory Address</h2>
                  <p className="text-muted ">
                    Welcome to RR Imperial Electrical Ltd. Please feel free to
                    contact with us any time. We are always here for your help.
                    For any kind of queries please submit the forms below. And
                    for sales related information, Corporate Sales Hotline: +880
                    17 55552582, 017 55552589.
                  </p>
                </div>
              </Col>
            </Row>
            <Row className="py-5 py-md-0 justify-content-center">
              <Col lg={10} xl={8} xxl={7}>
                <Row className="justify-content-center">
                  <Col sm={6}  className="py-md-5 mb-3 mb-md-0">
                    <div className="d-flex align-items-center justify-content-sm-center">
                      <div className="me-4 cl_dark_red">
                        <FiIcons.FiMapPin size="30px" />
                      </div>
                      <div className="content text-dark">
                        <h6 className="mb-0 f_bold">LOCATION</h6>
                        <p className="mb-0">Senpara, Kanchpur, Sonargaon</p>
                        <p className="mb-0">Narayanganj, Bangladesh</p>
                      </div>
                    </div>
                  </Col>
                  <Col sm={6}  className="py-md-5 mb-3 mb-md-0">
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
                  {/* <Col sm={6} md={4} lg={4} className="py-md-5 mb-3 mb-md-0">
                <div className="d-flex align-items-center justify-content-md-end">
                  <div className=" cl_dark_red me-4">
                    <FaIcons.FaRegClock size="30px" />
                  </div>
                  <div className="content text-dark">
                    <h6 className="mb-0 f_bold">WORKING HOURS</h6>
                    <p className="mb-0">Sat to Thur : 10:00-18:00</p>
                    <p className="mb-0">Friday Closed</p>
                  </div>
                </div>
              </Col> */}
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="submit_form home py-5">
          <Container fluid="xl">
            <Row>
              <Col md={6} className="mb-4">
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
              {/* <Col xl={6} className="h-100">
                <img
                  className="w-100 h-100"
                  src={require("../../Assets/contactUs_map.jpg")}
                  alt=""
                />
              </Col> */}
              <Col md={6} className="h-100">

                <iframe title="Factory Location" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d58430.31288486364!2d90.3579973!3d23.7511393!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b6844a614d53%3A0xa383a5ecc522660d!2sRR-IMPERIAL%20ELECTRICALS%20LTD.!5e0!3m2!1sen!2sbd!4v1661339761219!5m2!1sen!2sbd" width="100%" height="450" allowFullScreen={true} loading="lazy" referrerpolicy="no-referrer-when-downgrade" style={{ borderRadius: "5px" }} />

              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Footer topHeader="d-none" />
    </>
  );
};

export default Factory;
