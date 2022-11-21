import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import { BACKEND_BASE_URL } from "../../../Component/GlobalVariables";
import Swal from "sweetalert2";
import axios from "axios";

const AllCareers = () => {
  //=================================== Fetch Table Data ===================================
  const [careerInfo, setCareerInfo] = useState([]);

  const getAllCareers = async () => {
    try {
      await axios
        .get(`${BACKEND_BASE_URL}/api/admin/careers/all`)
        .then((res) => {
          setCareerInfo(res.data?.careers);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCareers();
  }, []);

  // =============================== Delete Data ===============================
  const deleteData = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "green",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    if (isConfirm) {
      axios
        .delete(`${BACKEND_BASE_URL}/api/admin/careers/delete/${id}`)
        .then((res) => {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            confirmButtonColor: "#5eba86",
          });
          getAllCareers();
        });
    }
  };

  return (
    <div className="main__container">
      <div className="content-wrapper">
        <div className="breadcrumb d-flex justify-content-between">
          <div className="breadcrumb-item">
            <Link to="/admin">Dashboard</Link>
          </div>
          <div className="breadcrumb-item p-0">
            <Link to="/admin/contact">All Careers</Link>
          </div>
        </div>

        <div className="col-md-12 mt-3">
          <div className="card">
            <div className="card-body">
              <div className="col-lg-12">
                <span className="top-border"></span>
                <div className="p-2">
                  <div className="card-header my-2">
                    <h4>All Career Info</h4>
                    <hr />
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone No </th>
                        <th scope="col">Handle</th>
                      </tr>
                    </thead>
                    <tbody>
                      {careerInfo?.map((data, index) => (
                        <tr
                          key={index}
                          className={`  ${data.status == 0 && "bg_grey"}`}
                        >
                          <td> {index + 1}</td>
                          <td>{data?.name}</td>
                          <td>{data?.email}</td>
                          <td>{data?.contact_no}</td>
                          <td>
                            {/* view button */}
                            <Link to={`view/${data.id}`}>
                              <button className="py-1 px-2 bg-info border-0 rounded-3 me-1 mb-1">
                                <FaIcons.FaEye
                                  style={{
                                    color: "white",
                                  }}
                                  title="View"
                                  size="1.5em"
                                />
                              </button>
                            </Link>

                            {/* delete button */}
                            <button
                              onClick={() => deleteData(data.id)}
                              className="py-1 px-2 bg-danger border-0 rounded-3 me-1 mb-1"
                            >
                              <MdIcons.MdDeleteForever
                                style={{
                                  color: "white",
                                }}
                                title="Delete"
                                size="1.5em"
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCareers;
