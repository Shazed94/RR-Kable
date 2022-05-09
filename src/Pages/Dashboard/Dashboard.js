import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

import "./dashboard.css";

import RichTextEditor from "../../Components/RichTextEditor";
import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSlidersH,
  faTruck,
  faTags,
  faLocationDot,
  faShoppingCart,
  faList,
  faLock,
  faUser,
  faCogs,
  faMinus,
  faTachometerAlt,
  faSignOut,
  faExpandArrowsAlt,
  faTable,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
// import { faProductHunt } from "@fortawesome/free-brands-svg-icons";

const Dashboard = () => {
  // Jodit
  const [value, setValue] = useState("");
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  const getValue = (value) => {
    setValue(value);
  };

  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className="row m-0">
        <div
          className={
            sidebar
              ? "sidebar-left active col-sm-8 col-md-4 col-lg-2 p-0 h-100"
              : "sidebar-left p-0 "
          }
        >
          <div className="logo">
            <img
              src="https://via.placeholder.com/120x40"
              alt="logo"
              className="w-100"
            />
          </div>
          <div className="sidebar__menu-wrapper">
            <ul className="sidebar__menu py-2 p-0" id="side-menu">
              {/* DASHBOARD */}
              <li className="sidebar-menu-item">
                <Link to="form" className="nav-link">
                  <FontAwesomeIcon
                    icon={faTachometerAlt}
                    className="text-white fa-icon"
                  />
                  <span className="menu-title"> Form</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div
          style={{ height: "100vh", overflowY: "scroll" }}
          className={
            sidebar
              ? "sidebar-right col-sm-4 col-md-8 col-lg-10 p-0"
              : "sidebar-right w-100 p-0"
          }
        >
          <div className="navbar-wrapper">
            <div className="navbar-right ms-auto">
              <li className="fullscreen-btn">
                <FontAwesomeIcon
                  icon={faExpandArrowsAlt}
                  className="text-white fa-icon"
                  onClick={showSidebar}
                />
                <Link to="/">
                  <FontAwesomeIcon
                    icon={faSignOut}
                    className="text-white fa-icon "
                  />
                </Link>
              </li>
            </div>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
