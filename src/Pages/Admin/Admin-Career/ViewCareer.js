import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../../Component/GlobalVariables";

const ViewCareer = () => {
  const { careerId } = useParams();

  const [singleCareerInfo, setSingleCareerInfo] = useState([]);
  // ===================== View single image ===================================
  const SingleCareerInfo = () => {
    axios
      .get(`${BACKEND_BASE_URL}/api/admin/careers/${careerId}`)
      .then((res) => {
        setSingleCareerInfo(res.data?.career);
      });
  };

  useEffect(() => {
    SingleCareerInfo();
  }, []);

  return (
    <div className="main__container">
      <div className="content-wrapper">
        <div className="breadcrumb d-flex justify-content-between">
          <div className="breadcrumb-item">
            <Link to="/admin">Dashboard</Link>
          </div>
          <div className="breadcrumb-item p-0">
            <Link to="/admin/career">All Careers</Link>
          </div>
        </div>

        <div className="col-md-12 mt-3">
          <div className="card">
            <div className="card-body">
              <div className="col-lg-12">
                <span className="top-border"></span>
              </div>
              <div className="p-4 mt-3">
                <h4>Name: {singleCareerInfo?.name}</h4>
                <h6>Email: {singleCareerInfo?.email}</h6>
                <h6>Contact Number: {singleCareerInfo?.contact_no}</h6>
                <p>Subject: {singleCareerInfo?.subject}</p>
                <p>
                  Message: <br />
                  {singleCareerInfo?.message}
                </p>
                <p>
                  Resume/CV:{" "}
                  <a
                    href={`${BACKEND_BASE_URL}/${singleCareerInfo?.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="btn btn-info"
                  >
                    Download Resume
                  </a>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* ===================== */}
      </div>
    </div>
  );
};

export default ViewCareer;
