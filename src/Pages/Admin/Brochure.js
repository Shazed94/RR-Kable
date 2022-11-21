import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../Component/GlobalVariables";

const Brochure = () => {
  //=================================== Fetch News Details ===================================

  const [brochureInfo, setBrochureInfo] = useState([]);
  const AllBrochure = () => {
    axios.get(`${BACKEND_BASE_URL}/api/admin/all-download-info`).then((res) => {
      setBrochureInfo(res.data.download_infos);
    });
  };

  useEffect(() => {
    AllBrochure();
  }, []);

  return (
    <div className="main__container">
      <div className="content-wrapper">
        <div className="breadcrumb d-flex justify-content-between">
          <div className="breadcrumb-item">
            <Link to="/admin">Dashboard</Link>
          </div>
        </div>

        <div className="content-wrapper">
          <div className="card">
            <div className="card-body">
              <span className="top-border"></span>

              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {brochureInfo?.map((data, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{data?.first_name + " " + data?.last_name}</td>
                      <td>{data?.email}</td>
                      <td>{data?.contact_no}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brochure;
