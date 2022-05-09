import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./main-dashboard.css";
import {
  faShoppingCart,
  faListAlt,
  faWindowRestore,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";

const MainDashboard = () => {
  return (
    <div className="body-wrapper">
      <div className="card-effect">
        <div className="dashboard">
          <b>Dashboard</b>
        </div>
      </div>
      <div className="container">
        <div className="row py-3">
          <div className="col-md-6 col-xl-4">
            <div className="card mb-3">
              <div className="widget">
                <div className="widget-icon">
                  <FontAwesomeIcon icon={faListAlt} className="w-icon" />
                </div>
                <div className="widget-content">
                  <h6 className="text-uppercase text">
                    <strong>Mega Menu</strong>
                  </h6>
                  <h1 className=" text-dark font-weight-bold">2</h1>
                  <p>
                    <a href="#" className="btn">
                      View All
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-4">
            <div className="card mb-3">
              <div className="widget">
                <div className="widget-icon">
                  <FontAwesomeIcon icon={faWindowRestore} className="w-icon" />
                </div>
                <div className="widget-content">
                  <h6 className="text-uppercase text">
                    <strong>Mega Menu</strong>
                  </h6>
                  <h1 className=" text-dark font-weight-bold">2</h1>
                  <p>
                    <a href="#" className="btn">
                      View All
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-4">
            <div className="card mb-3">
              <div className="widget">
                <div className="widget-icon">
                  <FontAwesomeIcon icon={faShoppingCart} className="w-icon" />
                </div>
                <div className="widget-content">
                  <h6 className="text-uppercase text">
                    <strong>Mega Menu</strong>
                  </h6>
                  <h1 className=" text-dark font-weight-bold">2</h1>
                  <p>
                    <a href="#" className="btn">
                      View All
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-4">
            <div className="card mb-3">
              <div className="widget">
                <div className="widget-icon">
                  <FontAwesomeIcon icon={faUsers} className="w-icon" />
                </div>
                <div className="widget-content">
                  <h6 className="text-uppercase text">
                    <strong>Mega Menu</strong>
                  </h6>
                  <h1 className=" text-dark font-weight-bold">2</h1>
                  <p>
                    <a href="#" className="btn">
                      View All
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-4">
            <div className="card mb-3">
              <div className="widget">
                <div className="widget-icon">
                  <FontAwesomeIcon icon={faProductHunt} className="w-icon" />
                </div>
                <div className="widget-content">
                  <h6 className="text-uppercase text">
                    <strong>Mega Menu</strong>
                  </h6>
                  <h1 className=" text-dark font-weight-bold">2</h1>
                  <p>
                    <a href="#" className="btn">
                      View All
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
