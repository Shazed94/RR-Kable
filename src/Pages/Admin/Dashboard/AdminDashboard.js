import axios from "axios";
import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import * as CgIcons from "react-icons/cg";
import * as BiIcons from "react-icons/bi";
import { Link } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../../Component/GlobalVariables";

import "./admindashboard.css";

const AdminDashboard = () => {
  const [productCount, setProductCount] = useState([]);
  const [news, setNewsCount] = useState([]);
  const [Events, setEvents] = useState([]);
  const [videos, setVideos] = useState([]);
  const [slider, setSlider] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [careers, setCareers] = useState([]);

  const DashboardInfo = async () => {
    await axios
      .get(`${BACKEND_BASE_URL}/api/admin/card-count-master`)
      .then((res) => {
        setProductCount(res.data.numOfProducts);
        setNewsCount(res.data.numOfNews);
        setEvents(res.data.numOfEvents);
        setVideos(res.data.numOfVideos);
        setSlider(res.data.numOfSliders);
        setBlogs(res.data.numOfBlogs);
        setContacts(res.data.numOfContacts);
        setCareers(res.data.numOfCareers);
      });
  };

  useEffect(() => {
    DashboardInfo();
  }, []);

  return (
    <div className="">
      <div className="body-wrapper">
        <div className="card-effect">
          <div className="dashboard">
            <b>Dashboard</b>
          </div>
        </div>
        <div className="">
          <div className="row py-3">
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div className="card mb-3">
                <div className="widget">
                  <div className="widget-icon">
                    <FaIcons.FaProductHunt className="w-icon" />
                  </div>
                  <div className="widget-content">
                    <h6 className="text-uppercase text widget-title">
                      <strong>Products</strong>
                    </h6>
                    <h1 className=" text-dark font-weight-bold">
                      {productCount}
                    </h1>
                    <p>
                      <Link to="products" className="btn">
                        View All
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div className="card mb-3">
                <div className="widget">
                  <div className="widget-icon">
                    <FaIcons.FaWindowRestore className="w-icon" />
                  </div>
                  <div className="widget-content">
                    <h6 className="text-uppercase text widget-title">
                      <strong>Slider</strong>
                    </h6>
                    <h1 className=" text-dark font-weight-bold">{slider}</h1>
                    <p>
                      <Link to="sliders" className="btn">
                        View All
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div className="card mb-3">
                <div className="widget">
                  <div className="widget-icon">
                    <BiIcons.BiNews className="w-icon" />
                  </div>
                  <div className="widget-content">
                    <h6 className="text-uppercase text widget-title">
                      <strong>News</strong>
                    </h6>
                    <h1 className=" text-dark font-weight-bold">{news}</h1>
                    <p>
                      <Link to="news" className="btn">
                        View All
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div className="card mb-3">
                <div className="widget">
                  <div className="widget-icon">
                    <FaIcons.FaBookReader className="w-icon" />
                  </div>
                  <div className="widget-content">
                    <h6 className="text-uppercase text widget-title">
                      <strong>Blogs</strong>
                    </h6>
                    <h1 className=" text-dark font-weight-bold">{blogs}</h1>
                    <p>
                      <Link to="blogs" className="btn">
                        View All
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div className="card mb-3">
                <div className="widget">
                  <div className="widget-icon">
                    <CgIcons.CgEventbrite className="w-icon" />
                  </div>
                  <div className="widget-content">
                    <h6 className="text-uppercase text widget-title">
                      <strong>Events</strong>
                    </h6>
                    <h1 className=" text-dark font-weight-bold">{Events}</h1>
                    <p>
                      <Link to="events" className="btn">
                        View All
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div className="card mb-3">
                <div className="widget">
                  <div className="widget-icon">
                    <FaIcons.FaVideo className="w-icon" />
                  </div>
                  <div className="widget-content">
                    <h6 className="text-uppercase text widget-title">
                      <strong>Videos</strong>
                    </h6>
                    <h1 className=" text-dark font-weight-bold">{videos}</h1>
                    <p>
                      <Link to="videos" className="btn">
                        View All
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div className="card mb-3">
                <div className="widget">
                  <div className="widget-icon">
                    <BsIcons.BsLightbulb className="w-icon" />
                  </div>
                  <div className="widget-content">
                    <h6 className="text-uppercase text widget-title">
                      <strong>Career</strong>
                    </h6>
                    <h1 className=" text-dark font-weight-bold">{careers}</h1>
                    <p>
                      <Link to="career" className="btn">
                        View All
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div className="card mb-3">
                <div className="widget">
                  <div className="widget-icon">
                    <MdIcons.MdContactPhone className="w-icon" />
                  </div>
                  <div className="widget-content">
                    <h6 className="text-uppercase text widget-title">
                      <strong>Contact</strong>
                    </h6>
                    <h1 className=" text-dark font-weight-bold">{contacts}</h1>
                    <p>
                      <Link to="contact" className="btn">
                        View All
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
