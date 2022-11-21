import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as CgIcons from "react-icons/cg";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as IoIcons from "react-icons/io5";
import * as AiIcons from "react-icons/ai";
import * as ImIcons from "react-icons/im";
import * as HiIcons from "react-icons/hi";
import { Link, Outlet } from "react-router-dom";
import {
  Button,
  Collapse,
  Container,
  Dropdown,
  NavDropdown,
  Badge,
} from "react-bootstrap";

import "./AdminContent.css";
import AdminFooter from "./AdminFooter";

const Test = () => {
  const [toggleNav, setToggleNav] = useState(false);

  const [clickState, setClickState] = useState(false);
  const [test, setTest] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const ToggleClass = (index) => {
    setClickState(index);
  };

  const logoutAdmin = () => {
    localStorage.removeItem("adminemail");
    localStorage.removeItem("LOGGED_IN_ADMIN_ID");
    localStorage.removeItem("adminName");
  };
  return (
    <div className="admin d-flex test">
      <nav className={`sidebar  ${toggleNav ? "close" : ""}`}>
        <header className="mt-3 mb-2">
          <Link to="/" target="_blank">
            <div className="mx-4 image-text d-flex align-items-center justify-content-between">
              <span className="image">
                {/* <img src={require("../../Assets/test.png")} alt="" /> */}
              </span>
              <div className="text logo-text ">
                <span className="name">RR Kabel</span>
              </div>
            </div>
          </Link>

          <FaIcons.FaChevronCircleRight
            className="bx bx-chevron-right toggle"
            onClick={() => setToggleNav(!toggleNav)}
          />
        </header>

        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links ps-0">
              <li className="nav-link">
                <Link to="">
                  <AiIcons.AiOutlineDashboard className="icon" />
                  <span className="text nav-text">Dashboard</span>
                </Link>
              </li>

              {/* <li className="nav-link">
                <Link to="products/categories">
                  <BiIcons.BiCategory className="icon" />
                  <span className="text nav-text">Product Categories</span>
                </Link>
              </li> */}
              <li className="nav-link d-flex align-items-center">
                <div
                  onClick={() => setOpen(!open)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                  className="d-flex justify-content-between align-items-center"
                >
                  <FaIcons.FaProductHunt className="icon" />
                  <div className="product_dropdown">
                    Products
                    <span>
                      <IoIcons.IoChevronDownOutline
                        className={`ms-4 ${open ? "rotate_icon" : ""}`}
                      />
                    </span>
                  </div>
                </div>
              </li>
              <div className="product_dropdown_item w-100">
                <Collapse in={open}>
                  <div id="example-collapse-text">
                    <Link to="products/categories">
                      <p className="text nav-text mb-0  py-2">
                        Product Category
                      </p>
                    </Link>

                    <Link to="products/table-design">
                      <p className="text nav-text mb-0 py-2"> Table Design</p>
                    </Link>
                    
                    <Link to="products">
                      <p className="text nav-text mb-0 py-2">All Products</p>
                    </Link>


                  </div>
                </Collapse>
              </div>

              <li className="nav-link">
                <Link to="sliders">
                  <BsIcons.BsSliders className="icon" />
                  <span className="text nav-text">Slider Elements</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="news">
                  <BiIcons.BiNews className="icon" />
                  <span className="text nav-text">News</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="blogs">
                  <FaIcons.FaBookReader className="icon" />
                  <span className="text nav-text">Blogs</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="events">
                  <CgIcons.CgEventbrite className="icon" />
                  <span className="text nav-text">Events</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="videos">
                  <FaIcons.FaVideo className="icon" />
                  <span className="text nav-text">Videos</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="career">
                  <BsIcons.BsLightbulb className="icon" />
                  <span className="text nav-text">Career</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="contact">
                  <AiIcons.AiFillContacts className="icon" />
                  <span className="text nav-text">
                    Contact &nbsp;&nbsp;&nbsp;
                    {/* <Badge bg="danger">9</Badge> */}
                  </span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="all-offices">
                  <HiIcons.HiOfficeBuilding className="icon" />
                  <span className="text nav-text">Regional Offices</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="download-user">
                  <FaIcons.FaUsers className="icon" />
                  <span className="text nav-text">Download User</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link to="" onClick={logoutAdmin}>
                  <ImIcons.ImExit className="icon" />
                  <span className="text nav-text">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="rightbar">
        <Container fluid style={{ marginBottom: "100px" }}>
          <Outlet />
        </Container>
        <AdminFooter />
      </section>
    </div>
  );
};

export default Test;
