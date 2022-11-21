import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../Component/GlobalVariables";
import Parse from "html-react-parser";
import LoadingSpinner from "../../Component/LoadingSpinner";

const NewsDetails = () => {
  const { newsId } = useParams();

  //=================================== Fetch News Details ===================================

  const [singleNewsInfo, setSingleNewsInfo] = useState([]);
  const AllNews = () => {
    try {
      axios.get(`${BACKEND_BASE_URL}/api/news/${newsId}`).then((res) => {
        setSingleNewsInfo(res.data?.singleNews);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AllNews();
  }, []);

  return (
    <div>
      {singleNewsInfo.title == null ? (
        <div className=" d-flex justify-content-center mt-5">
          <LoadingSpinner />
        </div>
      ) : (
        <Card className="w-100 border-0 transition_ease_io">
          <Card.Img
            className="rounded-0"
            variant="top"
            src={`${BACKEND_BASE_URL}/${singleNewsInfo?.image}`}
            alt="news"
          />
          <Card.Body className="px-0">
            <a className="cl_light_black" href={singleNewsInfo.src_link} target="_blank" rel="noreferrer">
              <h5 className="text-truncate  f_bold transition_ease_io_3">{singleNewsInfo.title}</h5>
            </a>
            <Card.Text className="f_medium text-muted">
              {Parse(`${singleNewsInfo?.description}`)}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default NewsDetails;
