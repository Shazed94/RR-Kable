import React from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as CgIcons from "react-icons/cg";
import * as MdIcons from "react-icons/md";
import { BACKEND_BASE_URL } from "../../../Component/GlobalVariables";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useRef } from "react";
import Swal from "sweetalert2";

const AllProduct = () => {
  //=================================== Fetch Table Data ===================================

  const [allProducts, setAllProducts] = useState([]);

  const renderAllProducts = async () => {
    await axios.get(`${BACKEND_BASE_URL}/api/admin/products`).then((res) => {
      setAllProducts(res.data.all_products);
    });
  };

  useEffect(() => {
    renderAllProducts();
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
        .delete(`${BACKEND_BASE_URL}/api/admin/products/delete/${id}`)
        .then((res) => {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            confirmButtonColor: "#5eba86",
          });
          renderAllProducts();
        });
    }
  };

  

  return (
    <div className="main__container">
      <div className="content-wrapper">
        <div className="breadcrumb d-flex justify-content-between">
          <div className="breadcrumb-item">
            <Link to="/admin">Dashboard</Link>
            <Link to="add-new" className="before">
              Add New Product
            </Link>
          </div>
          <div className="breadcrumb-item p-0">
            <Link to="#">All Product</Link>
          </div>
        </div>

        <div className="content-wrapper">
          <div className="card">
            <div className="card-body">
              <span className="top-border"></span>
              <div className="p-2">
                <div className="card-header">
                  <Button
                    as={Link}
                    to="add-new"
                    variant="success"
                    size="sm"
                    className="border-0"
                  >
                    Add &nbsp;
                    <span>
                      <AiIcons.AiOutlinePlusCircle />
                    </span>
                  </Button>

                  <hr />
                </div>
              </div>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>News Title</th>
                    <th>Featured Image</th>
                    <th>Handle</th>
                  </tr>
                </thead>
                <tbody>
                  {allProducts.map((data, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{data.name}</td>
                      <td>{data.category.category_name}</td>
                      <td>
                        <img
                          className="img-thumbnail"
                          width={50}
                          src={`${BACKEND_BASE_URL}${data.image}`}
                          alt={data.title}
                        />
                      </td>
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
                        {/* edit button */}
                        <Link to={`edit/${data.id}`}>
                          <button className="py-1 px-2 bg-warning border-0 rounded-3 me-1 mb-1">
                            <BiIcons.BiEdit
                              style={{
                                color: "white",
                              }}
                              title="Edit"
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
              </Table>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default AllProduct;
