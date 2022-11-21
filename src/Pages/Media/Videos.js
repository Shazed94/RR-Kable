import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { BACKEND_BASE_URL } from "../../Component/GlobalVariables";
import Parse from "html-react-parser";
import LoadingSpinner from "../../Component/LoadingSpinner";

const Videos = () => {
  //=================================== Fetch Videos ===================================

  const [videosInfo, setVideosInfo] = useState([]);

  const AllVideos = () => {
    try {
      axios.get(`${BACKEND_BASE_URL}/api/all-medias`).then((res) => {
        setVideosInfo(res.data.allVideos);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AllVideos();
  }, []);
  return (
    <>
      <Card className="bg-dark text-white border-0 rounded-0 mb-4">
        <Card.Img
          style={{ maxHeight: "350px" }}
          src={require("../../Assets/product_sample.jpeg")}
          alt="Card_image"
        />
        <Card.ImgOverlay className="dark_layer">
          <Card.Title className="f_medium">Videos</Card.Title>
        </Card.ImgOverlay>
      </Card>

      <div className="video">
        <Row className="justify-content-center">
          {videosInfo.length === 0 ? (
            <div className="w-auto m-auto mt-5">
              <LoadingSpinner />
            </div>
          ) : (
            videosInfo.map((data, id) => (
              <Col md="4" sm="6" key={id}>
                <Card className="border-0">
                  <iframe
                    width="100%"
                    height="300"
                    src={`https://www.youtube.com/embed/${data.videoLink}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen={true}
                  ></iframe>

                  <Card.Body className="px-0 ">
                    <h6 className="text-truncate  f_bold">{data.title}</h6>
                    {/* <div
                      className="f_medium text-muted lh-sm mb-0"
                      style={{ fontSize: "12px" }}
                    >
                      {Parse(`${data.description}`)}
                    </div> */}
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </div>
    </>
  );
};

export default Videos;
