import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import * as FiIcons from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import Parse from "html-react-parser";
import { BACKEND_BASE_URL } from "../../../Component/GlobalVariables";
import moment from "moment";
import LoadingSpinner from "../../../Component/LoadingSpinner";

const News = () => {
  //=================================== Fetch News ===================================

  const [newsInfo, setNewsInfo] = useState([]);

  const AllNews = () => {
    try {
      axios.get(`${BACKEND_BASE_URL}/api/all-medias`).then((res) => {
        setNewsInfo(res.data.allNews);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AllNews();
  }, []);

  return (
    <>
      <Row className="justify-content-center mb-5">
        {newsInfo.length == 0 ? (
          <div className="w-auto m-auto mt-5">
            <LoadingSpinner />
          </div>
        ) : (
          newsInfo.map((data, index) => (
            <Col sm={12} className="mb-4" key={index}>
              <Card className="border-0  transition_ease_io">
                <div className="position-relative">
                  <Card.Img
                    className="rounded-0"
                    src={`${BACKEND_BASE_URL}/${data.image}`}
                    alt="Card image"
                  />
                  <Card.Header
                    className="border-0 bg_dark_red w_xs_100_md_50 position-absolute py-1"
                    style={{ bottom: "0" }}
                  >
                    <div className="d-flex flex-wrap cl_white">
                      <div className="d-flex align-items-center me-3  ">
                        <FiIcons.FiCalendar className="me-2" />
                        <p className="mb-0  f_bold">
                          {" "}
                          {moment(data.created_at).format("DD-MM-Y")}
                        </p>
                      </div>

                      <div className="d-flex align-items-center me-3">
                        <FaIcons.FaUserAlt className="me-2" />
                        <p className="mb-0 mt-1 f_bold">{data.author}</p>
                      </div>
                    </div>
                  </Card.Header>
                </div>

                <Card.Body className="px-0 news_content_after">
                  <a className="cl_light_black" href={data.src_link} target="_blank" rel="noreferrer">
                    <h5 className="text-truncate  f_bold transition_ease_io_3">{data.title}</h5>
                  </a>

                  <div className="f_medium text-muted event_desc">
                    {Parse(`${data.description}`)}
                  </div>
                  <Link
                    to={`/media/news/${data.id}`}
                    className="cl_dark_red f_medium"
                  >
                    Read Details <FaIcons.FaAngleDoubleRight className="ms-2" />
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
      {/* <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner> */}
    </>
  );
};

export default News;
