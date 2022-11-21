import axios from "axios";
import React, { useEffect, useState } from "react";

import * as FaIcons from "react-icons/fa";

import { Link } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../Components/GlobalVariables";
import Swal from "sweetalert2";

const AllCustomers = () => {
  //=================================== Fetch Table Data ===================================

  const [allCustomers, setAllCustomers] = useState([]);

  const getAllCustomers = async () => {
    try {
      await axios
        .get(`${BACKEND_BASE_URL}/api/admin/all-customers`)
        .then((res) => {
          setAllCustomers(res.data.allCustomers);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  // =============================== Delete Data ===============================
  //   const deleteData = async (id) => {
  //     const isConfirm = await Swal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#d33",
  //       cancelButtonColor: "green",
  //       confirmButtonText: "Yes, delete it!",
  //     }).then((result) => {
  //       return result.isConfirmed;
  //     });

  //     if (!isConfirm) {
  //       return;
  //     }

  //     if (isConfirm) {
  //       axios
  //         .delete(`${BACKEND_BASE_URL}/api/admin/brands/delete/${id}`)
  //         .then((res) => {
  //           Swal.fire({
  //             icon: "success",
  //             text: res.data.message,
  //             confirmButtonColor: "#5eba86",
  //           });
  //           getAllCustomers();
  //         });
  //     }
  //   };

  return (
    <div className="main__container">
      <div className="content-wrapper">
        <div className="breadcrumb">
          <div className="breadcrumb-item">
            <Link to="/admin">Dashboard</Link>
            {/* <Link to="#" className="before">
              Add
            </Link> */}
          </div>
        </div>

        <div className="col-md-12 mt-3">
          <div className="card">
            <div className="card-body">
              <div className="col-lg-12">
                <span className="top-border"></span>
                <div className="p-2">
                  <div className="card-header my-2">
                    <h4>All Customers</h4>
                    <hr />
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col"> Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone No </th>
                        <th scope="col">Joined Date</th>
                        {/* <th scope="col">Handle</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {allCustomers.map((data, index) => (
                        <tr key={index}>
                          <td> {index + 1}</td>
                          <td>{data.name}</td>
                          <td>{data.email}</td>
                          <td>{data.phone}</td>
                          <td>{data.created_at.toString().slice(0, 10)}</td>
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

export default AllCustomers;
