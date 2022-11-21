import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../Component/GlobalVariables";
import Parse from "html-react-parser";
import { FaCentercode } from "react-icons/fa";

const BlogDetails = () => {
  const { blogId } = useParams();
  //=================================== Fetch News Details ===================================

  const [singleBlogInfo, setSingleBlogInfo] = useState([]);
  const AllBlog = () => {
    try {
      axios.get(`${BACKEND_BASE_URL}/api/blogs/${blogId}`).then((res) => {
        setSingleBlogInfo(res.data.singleBlog);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AllBlog();
  }, []);

  return (
    <div>
      {" "}
      {singleBlogInfo ? (
        <Card className="w-100 border-0 transition_ease_io">
          <Card.Img
            className="rounded-0"
            variant="top"
            src={`${BACKEND_BASE_URL}/${singleBlogInfo.image}`}
            alt="news"
          />
          <Card.Body className="px-0">
            <Card.Title className="f_bold"> <h2>{singleBlogInfo.title}</h2> </Card.Title>
            <Card.Text className="f_medium text-muted">
              {Parse(`${singleBlogInfo.description}`)}
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden ">Loading...</span>
        </Spinner>
      )}
      
    </div>
  );
};

export default BlogDetails;
