import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../Component/GlobalVariables";
import Parse from "html-react-parser";
import LoadingSpinner from "../../Component/LoadingSpinner";

const Events = () => {
  //=================================== Fetch Events ===================================

  const [eventsInfo, setEventsInfo] = useState([]);

  const AllEvents = () => {
    try {
      axios.get(`${BACKEND_BASE_URL}/api/all-medias`).then((res) => {
        setEventsInfo(res.data.allEvents);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AllEvents();
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Media Centre | Events |Wires & Cables Manufactures | RR Kabel
        </title>
      </Helmet>
      <Card className="bg-dark text-white border-0 rounded-0 mb-4">
        <Card.Img
          style={{ maxHeight: "350px" }}
          src={require("../../Assets/product_sample.jpeg")}
          alt="Card_image"
        />
        <Card.ImgOverlay className="dark_layer">
          <Card.Title className="f_medium">Events</Card.Title>
        </Card.ImgOverlay>
      </Card>
      <div className="events_list">
        {eventsInfo.length == 0 ? (
          <div className="w-auto m-auto mt-5">
            <LoadingSpinner />
          </div>
        ) : (
          eventsInfo.map((data, index) => (
            <Row
              className="mt-4 event_content_after align-items-center mt-3"
              key={index}
            >
              <Col md={4} className="mb-4 mb-sm-0">
                <img
                  className="w-100"
                  style={{ maxHeight: "200px" }}
                  src={`${BACKEND_BASE_URL}/${data.image}`}
                  alt=""
                />
              </Col>
              <Col md={8}>
                <h5 className="f_bold cl_dark_red">{data.title}</h5>
                <div className="f_medium text-muted event_desc">
                  {" "}
                  {Parse(`${data.description}`)}
                </div>
                <Link
                  to={`/media/events/${data.id}`}
                  className="cl_dark_red f_medium"
                >
                  Read MOre <FaIcons.FaAngleDoubleRight className="ms-2" />
                </Link>
              </Col>
            </Row>
          ))
        )}
      </div>
    </>
  );
};

export default Events;
