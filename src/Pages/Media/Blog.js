import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import * as FiIcons from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../Component/GlobalVariables";
import axios from "axios";
import moment from "moment";
import Parse from "html-react-parser";
import LoadingSpinner from "../../Component/LoadingSpinner";

const Blog = () => {
  //=================================== Fetch Blogs ===================================

  const [blogsInfo, setBlogsInfo] = useState([]);


  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const AllBlogs = () => {

    setIsLoading(true);
    try {
      axios.get(`${BACKEND_BASE_URL}/api/all-medias`).then((res) => {
        setBlogsInfo(res.data.allBlogs);
        setIsLoading(false);
      });
    } catch (error) {
    }
  };

  useEffect(() => {
    AllBlogs();
  }, []);

  return (
    <>
      <Row className={`justify-content-center ${blogsInfo?.length == 0 ? "align-items-center" : "" }  mb-5 h-100`}>

        {
          (isLoading) && (
            <div className="w-auto m-auto mt-5">
              <LoadingSpinner />
            </div>
          )
        }
        {
          (!isLoading && blogsInfo?.length == 0) && (
            <div className="text-center">
              <h2>No  Post Found</h2>
            </div>
          )
        }

        {
           (!isLoading && blogsInfo?.length > 0) && 
          blogsInfo.map((data, i) => (
            <Col sm={6} className="mb-4" key={i}>
              <Card className="border-0 box_shadow_high transition_ease_io rounded_10px">
                <Card.Img
                  className="rounded_10pxUp"
                  variant="top"
                  src={`${BACKEND_BASE_URL}/${data.image}`}
                />

                <Card.Body>
                  <div className="d-flex flex-wrap my-4">
                    <div className="d-flex align-items-center me-3 ">
                      <FiIcons.FiCalendar className="me-2 cl_dark_red" />
                      <p className="mb-0 mt-1 text-muted f_bold">
                        {moment(data.created_at).format("DD-MM-Y")}
                      </p>
                    </div>

                    <div className="d-flex align-items-center me-3">
                      <FaIcons.FaUserAlt className="me-2 cl_dark_red" />
                      <p className="mb-0 mt-1 text-muted f_bold">
                        {data.author}
                      </p>
                    </div>
                  </div>

                  <h4 className=" mb-4 f_bold event_desc">
                    {Parse(`${data.description}`)}
                  </h4>
                  <Link
                    to={`/media/blog/${data.id}`}
                    className="cl_dark_red f_medium"
                  >
                    Read Details <FaIcons.FaAngleDoubleRight className="ms-2" />
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        }

        
      </Row>
    </>
  );
};

export default Blog;
