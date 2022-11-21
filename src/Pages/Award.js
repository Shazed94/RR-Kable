import React, { useState } from "react";
import { Card, Figure, Row, Col, Button, Modal } from "react-bootstrap";
import Footer from "../Component/Footer/Footer";
import Header from "../Component/Header/Header";
import * as CgIcons from "react-icons/cg";

const Award = () => {

  const [show, setShow] = useState(false);
  const [imageValue, setimageValue] = useState();
  const modal = (showValue, imageProps) => {

    const imageDynamicData = <img className="w-100 h-100" src={require(`../Assets/Award/${imageProps}`)} />
    setShow(showValue);
    setimageValue(imageDynamicData);
  }
  return (
    <>
      <Header />
      <div className="media_page main_section">
        <div className="header">
          <Card className="bg-dark text-white border-0 rounded-0">
            <Card.Img
              className="dark_filter"
              src={require("../Assets/Award/award.png")}
              alt="media_image"
            />
            <Card.ImgOverlay className="d-flex justify-content-center align-items-center">
              <h1 className="m-0 f_bold ls_3px text-capitalize">Awards & Certifications</h1>
            </Card.ImgOverlay>
          </Card>
        </div>
        <div className="container-xl award">

          <Modal
            className="modal_gallery"
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            {/* <Modal.Header closeButton /> */}

            <Modal.Header className="award_gallery">
              <Button
                className="p-0 border-0 bg-danger ms-auto"
                onClick={() => setShow(false)}
              >
                <CgIcons.CgClose
                  style={{
                    fontSize: "26px",
                  }}
                />
              </Button>
            </Modal.Header>

            <Modal.Body className='p-0'>
              {imageValue}
            </Modal.Body>
          </Modal>

          <Row className="justify-content-center py-5">
            <Col sm={6} md={4} lg={3} className="mb-4 cursor">
              <Figure className="p-3 w-100">
                <Figure.Image 
                  className="img-fluid d-block mx-auto award_image"

                  alt="171x180"
                  src={require("../Assets/Award/award-1.png")}
                  style={{ border: "2px solid #ED1D24", borderRadius: "5px" }}
                  onClick={() => modal(true, 'award-1.png')}
                />
                <Figure.Caption className="text-center">
                  UL Certificate
                </Figure.Caption>
              </Figure>
            </Col>
            <Col sm={6} md={4} lg={3} className="mb-4 cursor">
              <Figure className="p-3 w-100">
                <Figure.Image
                  className="img-fluid d-block mx-auto"
                  alt="171x180"
                  src={require("../Assets/Award/award-2.png")}
                  style={{ border: "2px solid #ED1D24", borderRadius: "5px" }}
                  onClick={() => modal(true, 'award-2.png')}
                />
                <Figure.Caption className="text-center">
                  UL Certificate
                </Figure.Caption>
              </Figure>
            </Col>
            <Col sm={6} md={4} lg={3} className="mb-4 cursor">
              <Figure className="p-3 w-100">
                <Figure.Image
                  className="img-fluid d-block mx-auto"
                  alt="171x180"
                  src={require("../Assets/Award/award-3.png")}
                  style={{ border: "2px solid #ED1D24", borderRadius: "5px" }}
                  onClick={() => modal(true, 'award-3.png')}
                />
                <Figure.Caption className="text-center">
                  VDE Certificate
                </Figure.Caption>
              </Figure>
            </Col>
            <Col sm={6} md={4} lg={3} className="mb-4 cursor">
              <Figure className="p-3 w-100">
                <Figure.Image
                  className="img-fluid d-block mx-auto"
                  alt="171x180"
                  src={require("../Assets/Award/award-4.png")}
                  style={{ border: "2px solid #ED1D24", borderRadius: "5px" }}
                  onClick={() => modal(true, 'award-4.png')}
                />
                <Figure.Caption className="text-center">
                  VDE Certificate
                </Figure.Caption>
              </Figure>
            </Col>
            <Col sm={6} md={4} lg={3} className="mb-4 cursor">
              <Figure className="p-3 w-100">
                <Figure.Image
                  className="img-fluid d-block mx-auto"
                  alt="171x180"
                  src={require("../Assets/Award/award-5.png")}
                  style={{ border: "2px solid #ED1D24", borderRadius: "5px" }}
                  onClick={() => modal(true, 'award-5.png')}
                />
                <Figure.Caption className="text-center">
                  VDE Certificate
                </Figure.Caption>
              </Figure>
            </Col>
            <Col sm={6} md={4} lg={3} className="mb-4 cursor">
              <Figure className="p-3 w-100">
                <Figure.Image
                  className="img-fluid d-block mx-auto"
                  alt="171x180"
                  src={require("../Assets/Award/award-6.png")}
                  style={{ border: "2px solid #ED1D24", borderRadius: "5px" }}
                  onClick={() => modal(true, 'award-6.png')}
                />
                <Figure.Caption className="text-center">
                  VDE Certificate
                </Figure.Caption>
              </Figure>
            </Col>
          </Row>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Award;
