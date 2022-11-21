import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../../Component/GlobalVariables";

const ViewContact = () => {
  const { contactId } = useParams();

  const [singleContactInfo, setSingleContactInfo] = useState([]);
  // ===================== View single image ===================================
  const SingleContactInfo = () => {
    axios
      .get(`${BACKEND_BASE_URL}/api/admin/contacts/${contactId}`)
      .then((res) => {
        setSingleContactInfo(res.data?.contact);
      });
  };

  useEffect(() => {
    SingleContactInfo();
  }, []);

  return (
    <div className="main__container">
      <div className="content-wrapper">
        <div className="breadcrumb d-flex justify-content-between">
          <div className="breadcrumb-item">
            <Link to="/admin">Dashboard</Link>
          </div>
          <div className="breadcrumb-item p-0">
            <Link to="/admin/contact">All Product Design</Link>
          </div>
        </div>

        <div className="col-md-12 mt-3">
          <div className="card">
            <div className="card-body">
              <div className="col-lg-12">
                <span className="top-border"></span>
              </div>
              <div className="p-4 mt-3">
                <h4>Name: {singleContactInfo?.name}</h4>
                <h6>Email: {singleContactInfo?.email}</h6>
                <h6>Contact Number: {singleContactInfo?.phone}</h6>
                <p>Subject: {singleContactInfo?.subject}</p>
                <p>
                  Message: <br />
                  {singleContactInfo?.message}
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

export default ViewContact;
