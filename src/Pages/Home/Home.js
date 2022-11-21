import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import Footer from "../../Component/Footer/Footer";
import Header from "../../Component/Header/Header";
import "./Home.css";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { useState } from "react";
import { BACKEND_BASE_URL } from "../../Component/GlobalVariables";
import axios from "axios";
import moment from "moment";
import { useEffect } from "react";
import Headertest from "../../Headertest";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import Slider from "react-slick";

const Home = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  //=================================== Fetch Events ===================================

  const [sliders, setSliders] = useState([]);
  const [recentNews, setRecentNews] = useState([]);

  const AllEvents = () => {
    try {
      axios.get(`${BACKEND_BASE_URL}/api/home-items`).then((res) => {
        setSliders(res.data.sliders);
        setRecentNews(res.data.recentNews);
      });
    } catch (error) {
    }
  };

  // Fetch data from api
  const [category, setCategories] = useState([{}]);
  const [categoryProduct, setCategoryProduct] = useState();
  // const [categoryId, setCategoryId] = useState(1);

  const getCategoryProduct = (data) => {
    axios.get(`${BACKEND_BASE_URL}/api/products-categories/${data}`).then((res) => {
      setCategoryProduct(res?.data?.category_product);
    });
  }

  const fetchProductData = () => {
    axios.get(`${BACKEND_BASE_URL}/api/products-categories`).then((res) => {
      setCategories(res?.data?.product_categories);
    });
  };

  useEffect(() => {
    fetchProductData();
    getCategoryProduct(1);
    AllEvents();
  }, []);

  const [visible, setvisible] = useState();

  function onChange(isVisible) {
    setvisible(isVisible);
  }

  return (
    <div>
      <Header />
      {/* <Headertest /> */}

      <div className="home main_section">
        <div className="sec1_carousel ">
          {/* Carousel */}
          <div className="">
            <Carousel>
              {sliders?.map((data, id) => (
                <Carousel.Item key={id}>
                  <img
                    className=" w-100"
                    src={`${BACKEND_BASE_URL}/${data.image}`}
                    alt={data.title1}
                  />


                  <Carousel.Caption>
                    <Container fluid="xl">
                      <h3 className="f_medium">{data.title1}</h3>
                      <h2 className="f_extrabold">{data.title2}</h2>
                      <Link to='/who-we-are'>
                        <Button className="slider_btn">
                          {" "}
                          Learn More <FaIcons.FaAngleDoubleRight className="ms-2" />
                        </Button>
                      </Link>
                    </Container>
                  </Carousel.Caption>

                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>

        <div className="sec2_card pb-5">
          <Container fluid="xl">
            <Row className="justify-content-center">
              <Col
                lg={4}
                sm={6}
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-duration="1000"
              >
                <Card style={{ width: "100%" }}>
                  <div className="cardContent mx-xxl-5 mx-xl-3 mx-3">
                    <Card.Body className="px-0">
                      <div className="icon my-2">
                        <img
                          className="w-100 h-100"
                          src={require("../../Assets/Home/profile1.png")}
                          alt="company_profile"
                        />
                      </div>
                      <h4 className="f_bold">Company Profile</h4>
                      <Card.Text className="my-4 f_medium">
                        RR Imperials is one of the most awarded electricals company with multiple international certifications
                      </Card.Text>
                      <Link to='/who-we-are/our-profile'>
                        <Button>
                          {" "}
                          Read More{" "}
                          <FaIcons.FaAngleDoubleRight className="ms-2" />
                        </Button>
                      </Link>
                    </Card.Body>
                  </div>
                </Card>
              </Col>
              <Col
                lg={4}
                sm={6}
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-duration="1000"
              >
                <Card style={{ width: "100%" }}>
                  <div className="cardContent mx-xxl-5 mx-xl-3 mx-3">
                    <Card.Body className="px-0">
                      <div className="icon my-2">
                        <img
                          className="w-100 h-100"
                          src={require("../../Assets/Home/profile2.png")}
                          alt="mission_vission"
                        />
                      </div>
                      <h4 className="f_bold">Mission & Vission</h4>
                      <Card.Text className="my-4 f_medium">
                        At RR-Imperial, we value the safety and the satisfaction of our customers above everything else.
                      </Card.Text>
                      <Link to='/who-we-are/mission'>
                        <Button>
                          {" "}
                          Read More{" "}
                          <FaIcons.FaAngleDoubleRight className="ms-2" />
                        </Button>
                      </Link>
                    </Card.Body>
                  </div>
                </Card>
              </Col>
              <Col
                lg={4}
                sm={6}
                data-aos="fade-up"
                data-aos-delay="400"
                data-aos-duration="1000"
              >
                <Card style={{ width: "100%" }}>
                  <div className="cardContent mx-xxl-5 mx-xl-3 mx-3">
                    <Card.Body className="px-0">
                      <div className="icon my-2">
                        <img
                          className="w-100 h-100"
                          src={require("../../Assets/Home/profile3.png")}
                          alt="award_certificate"
                        />
                      </div>
                      <h4 className="f_bold">Awards & Certifications</h4>
                      <Card.Text className="my-4 f_medium">
                        RR Imperials is one of the most awarded electricals company with multiple international certifications.
                      </Card.Text>

                      <Link to='/award-certificate'>
                        <Button>
                          {" "}
                          Read More{" "}
                          <FaIcons.FaAngleDoubleRight className="ms-2" />
                        </Button>
                      </Link>
                    </Card.Body>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="sec3_about py-5">
          <Container fluid="xl">
            <Row className="align-items-center">
              <Col lg={5} md={6} className="mb-4">
                <div
                  className="mainImage"
                  data-aos="fade-up"
                  data-aos-delay="100"
                  data-aos-duration="1000"
                >
                  <img
                    src={require("../../Assets/Home/aboutMain.png")}
                    alt=""
                  />
                </div>
                <div
                  className="subImage d-flex justify-content-end"
                  data-aos="fade-up"
                  data-aos-delay="150"
                  data-aos-duration="1000"
                >
                  <img src={require("../../Assets/Home/aboutSub.png")} alt="" />
                </div>
              </Col>

              <Col
                lg={7}
                md={6}
                className="gx-5 mb-3"
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-duration="1000"
              >
                <h1 className="mb-4 text-uppercase f_extrabold text-start">
                  ABOUT RR IMPERIAL
                </h1>
                <p className="mb-4 text-muted f_medium text_justify">
                  One of the leading electrical wires and cables manufacturers in the world, RR Kabel is a joint venture company.
                  RR Kabel is a pioneer in wire design, technology, and applicability. The focus on cutting-edge technology and research has continually enhanced the products' efficiency, reliability, and safety aspects.
                </p>

                <div className="call_us mb-4">
                  <Row>
                    <Col sm={8} md={12} xl={7}>
                      <a href="tel:+0255034813" rel="noreferrer">
                        <div className="d-flex flex-wrap align-items-center  justify-content-sm-start p-3 bg-white rounded-3">
                          <div className="icon me-3 my-2 my-sm-0">
                            <FiIcons.FiPhoneCall />
                          </div>
                          <div className="content ">
                            <span className="text-muted f_bold">
                            Saturday to Thrusday (10am to 6pm)
                            </span>
                            <br />
                            <p
                              className="f_medium mb-0"
                              style={{ color: "black", fontSize: "25px" }}
                            >
                              Call Us : +02-55034813
                            </p>
                          </div>
                        </div>
                      </a>
                    </Col>
                  </Row>
                </div>
                <Link to='/who-we-are/our-profile'>
                  <Button>
                    {" "}
                    Read More{" "}
                    <FaIcons.FaAngleDoubleRight className="ms-2" />
                  </Button>
                </Link>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="sec4_pdShowcase ">
          <Container fluid="xl">
            <h1 className="text-uppercase text-center f_extrabold mb-5 title">
              product showcase
            </h1>

            <div className="sorting mb-5">
              <div className="sorting_title">
                <ul className="p-0 d-flex flex-wrap justify-content-center">
                  {
                    category.map((categoryName, id) => (
                      <li className="text-capitalize f_bold" onClick={() => getCategoryProduct(categoryName.id)} key={id}>
                        {
                          categoryName.category_name
                        }
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
            {categoryProduct?.length ?
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                className="mySwiper card_content"
                modules={[Autoplay, Navigation]}
                autoplay={{
                  delay: 3000,
                }}
                loop={true}
                navigation={true}

                breakpoints={{

                  100: {

                    slidesPerView: 1,
                  },
                  550: {

                    slidesPerView: 2,
                  },

                  768: {
                    slidesPerView: 3,
                  }
                }}

              >
                {
                  categoryProduct?.map((data, id) => (
                    <SwiperSlide key={id}>
                      <Card className="transition_ease_io">
                        <Card.Img
                          style={{ maxHeight: "300px" }}
                          variant="top"
                          src={`${BACKEND_BASE_URL}/${data.image}`}
                        />
                        <Card.Footer className="text-center border-0 transition_ease_io">
                          <Link
                            to={`/product/details/${data.slug}`}
                            className="f_medium"
                          >
                            <p className="text-muted mb-0 f_bold">{data.name}</p>
                            Read More{" "}
                            <FaIcons.FaAngleDoubleRight className="ms-2" />
                          </Link>
                        </Card.Footer>
                      </Card>
                    </SwiperSlide>
                  ))


                }
              </Swiper>
              :
              <Card className="transition_ease_io w_xs_100_md_50 mx-auto border-0">
                <Card.Body className="bg-danger text-white text-center rounded-3">
                  <Card.Title className="fw-bold m-0 py-4">Product is not available for this category</Card.Title>
                </Card.Body>
              </Card>

            }

          </Container>
        </div>


        <div className="sec5_count py_6">
          <Container fluid="xl">
            <Row className="justify-content-lg-center">
              <Col xl={3} lg={3} md={4} sm={6} className="my-3">
                <div className="d-flex   counter align_center">
                  <div className="counter_icon d-flex justify-content-center  align-items-center me-lg-3 me-1">
                    <img src={require('../../Assets/Home/bd_map.png')} alt="Electrice Products" />
                  </div>
                  <div className="counter_content">
                    <VisibilitySensor onChange={onChange}>
                      <h1 className="mb-0 f_extrabold text-start">
                        <CountUp
                          className={visible ? "" : "d-none"}
                          start={0}
                          end={49}
                          duration={2}
                        />{" "}
                        <span style={{ fontSize: '20px' }}>Districts</span>
                      </h1>
                    </VisibilitySensor>
                    <small className="text-uppercase mb-0 f_medium" >
                      covered with an
                      <br />
                      ever growing network
                    </small>
                  </div>
                </div>
              </Col>
              <Col xl={3} lg={3} md={4} sm={6} className="my-3">
                <div className="d-flex counter ">
                  <div className="counter_icon d-flex justify-content-center  align-items-center me-lg-3 me-1">
                    <img src={require('../../Assets/Home/industry.png')} alt="Manufacturing Facilities" />
                  </div>
                  <div className="counter_content">
                    <VisibilitySensor onChange={onChange}>
                      <h1 className="mb-0 f_extrabold lh-1 text-start text-lg-center">
                        <CountUp
                          className={visible ? "" : "d-none"}
                          start={0}
                          end={27}
                          duration={2}
                        />
                      </h1>
                    </VisibilitySensor>
                    <small className="text-uppercase mb-0 f_medium">
                      Operation <br /> Hub
                    </small>
                  </div>
                </div>
              </Col>
              <Col xl={3} lg={3} md={4} sm={6} className="my-3">
                <div className="d-flex flex-wrap   counter ">
                  <div className="counter_icon d-flex justify-content-center  align-items-center me-lg-3 me-1">
                    <img src={require('../../Assets/Home/employee.png')} alt="Employees" />
                  </div>
                  <div className="counter_content">
                    <VisibilitySensor onChange={onChange}>
                      <h1 className="mb-0 f_extrabold text-start text-lg-center">
                        <CountUp
                          className={visible ? "" : "d-none"}
                          start={0}
                          end={1000}
                          duration={2}
                        />{" "}
                        +
                      </h1>
                    </VisibilitySensor>
                    <small className="text-uppercase mb-0 f_medium">
                      EMPLOYEES
                    </small>
                  </div>
                </div>
              </Col>
              <Col xl={3} lg={3} md={4} sm={6} className="my-3">
                <div className="d-flex counter">
                  <div className="counter_icon d-flex justify-content-center  align-items-center me-lg-3 me-1">
                    <img src={require('../../Assets/Home/dealers.png')} alt="Proud Dealers" />
                  </div>
                  <div className="counter_content">
                    <VisibilitySensor onChange={onChange}>
                      <h1 className="mb-0 f_extrabold text-start text-lg-center">
                        <CountUp
                          className={visible ? "" : "d-none"}
                          start={0}
                          end={4500}
                          duration={2}
                        />{" "}
                        +
                      </h1>
                    </VisibilitySensor>
                    <small className="text-uppercase mb-0 f_medium">
                      PROUD DEALERS
                    </small>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="sec6_news py-5">
          <Container fluid="xl">
            <h1 className="text-uppercase text-center f_extrabold mb-5 title">
              recent news
            </h1>

            <Row className="justify-content-center">
              {recentNews?.map((data, id) => (
                <Col key={id}
                  lg={4}
                  md={5}
                  sm={6}
                  className="mb-4"
                  data-aos="fade-up"
                  data-aos-delay="300"
                  data-aos-duration="1000"
                >
                  <Card className="border-0 rounded_10pxDown box_shadow_light transition_ease_io">
                    <Card.Img
                      className="rounded_10pxUp  "
                      style={{ height: "250px" }}
                      variant="top"
                      src={`${BACKEND_BASE_URL}/${data.image}`}
                      alt={data.title}
                    />

                    <Card.Body className="">
                      <div className="d-flex flex-wrap my-4">
                        <div className="d-flex align-items-center me-3 mb-2 mb-sm-0">
                          <FiIcons.FiCalendar className="me-2 cl_dark_red" />
                          <p className="mb-0 mt-1 text-muted f_bold">
                            {moment(data.created_at).format("DD-MM-Y")}
                          </p>
                        </div>

                        <div className="d-flex align-items-center me-3">
                          <FaIcons.FaUserAlt className="me-2 cl_dark_red" />
                          <p className="mb-0 mt-1 text-muted f_bold">
                            {data.author}
                          </p>
                        </div>
                      </div>

                      <h4 className="text-truncate mb-4 f_bold">
                        {data.title}
                      </h4>
                      <Link
                        to={`/media/news/${data.id}`}
                        className="cl_dark_red f_medium"
                      >
                        Read Details{" "}
                        <FaIcons.FaAngleDoubleRight className="ms-2" />
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}

              {/* <Col lg={3} md={4} sm={6} className='mb-4' data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
                                <Card className='border-0 rounded_10pxDown box_shadow_light transition_ease_io'>
                                    <Card.Img className='rounded_10pxUp  ' style={{ height: '250px' }} variant="top" src={require('../../Assets/Home/recent_news2.jpg')} />

                                    <Card.Body className=''>

                                        <div className="d-flex flex-wrap my-4">

                                            <div className="d-flex align-items-center me-3 mb-2 mb-sm-0">
                                                <FiIcons.FiCalendar className="me-2 cl_dark_red" />
                                                <p className='mb-0 mt-1 text-muted f_bold'>05-05-2022</p>
                                            </div>

                                            <div className="d-flex align-items-center me-3">
                                                <FaIcons.FaUserAlt className="me-2 cl_dark_red" />
                                                <p className='mb-0 mt-1 text-muted f_bold'>Mr Sam</p>
                                            </div>
                                        </div>

                                        <h4 className="text-truncate mb-4 f_bold">Recent News or BLoguyuylililili</h4>
                                        <Link to={`/media/news/Recent News or BLoguyuyli`} className='cl_dark_red f_medium'>Read Details <FaIcons.FaAngleDoubleRight className="ms-2" /></Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={3} md={4} sm={6} className='mb-4' data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
                                <Card className='border-0 rounded_10pxDown box_shadow_light transition_ease_io'>
                                    <Card.Img className='rounded_10pxUp  ' style={{ height: '250px' }} variant="top" src={require('../../Assets/Home/recent_news3.jpg')} />

                                    <Card.Body className=''>

                                        <div className="d-flex flex-wrap my-4">

                                            <div className="d-flex align-items-center me-3 mb-2 mb-sm-0">
                                                <FiIcons.FiCalendar className="me-2 cl_dark_red" />
                                                <p className='mb-0 mt-1 text-muted f_bold'>05-05-2022</p>
                                            </div>

                                            <div className="d-flex align-items-center me-3">
                                                <FaIcons.FaUserAlt className="me-2 cl_dark_red" />
                                                <p className='mb-0 mt-1 text-muted f_bold'>Mr Sam</p>
                                            </div>
                                        </div>

                                        <h4 className="text-truncate mb-4 f_bold">Recent News or BLoguyuylililili</h4>
                                        <Link to={`/media/news/Recent News or BLoguyuyli`} className='cl_dark_red f_medium'>Read Details <FaIcons.FaAngleDoubleRight className="ms-2" /></Link>
                                    </Card.Body>
                                </Card>
                            </Col> */}
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Home;
