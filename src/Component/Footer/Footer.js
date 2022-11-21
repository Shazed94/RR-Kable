import { Col, Container, Row } from 'react-bootstrap';
import './Footer.css';
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import { NavLink } from 'react-router-dom';
const Footer = (props) => {
    return (
        <div className='footer'>
            {/* top_footer */}
            <div className={`top_footer ${props.topHeader}`}>
                <Container fluid="xl">
                    <Row className="py-5 py-md-0">
                        <Col sm={6} md={4} lg={4} className='section_border py-md-5 mb-3 mb-md-0'>
                            <div className="d-flex align-items-center">
                                <div className="icon d-flex justify-content-center align-items-center me-4" >
                                    <FiIcons.FiMapPin />
                                </div>
                                <div className="content">
                                    <h6 className="mb-0 ">LOCATION</h6>
                                    <p className="mb-0">Senpara, Kanchpur, Narayanganj</p>
                                    <p className="mb-0">Dhaka, Bangladesh</p>
                                </div>
                            </div>
                        </Col>
                        <Col sm={6} md={4} lg={4} className='section_border py-md-5 mb-3 mb-md-0'>
                            <div className="d-flex align-items-center justify-content-md-center">
                                <div className="icon d-flex justify-content-center align-items-center me-4" >
                                    <FaIcons.FaRegClock />
                                </div>
                                <div className="content">
                                    <h6 className="mb-0 ">WORKING HOURS</h6>
                                    <p className="mb-0">Sat to Thur : 10:00-18:00</p>
                                    <p className="mb-0">Friday Closed</p>
                                </div>
                            </div>
                        </Col>
                        <Col sm={6} md={4} lg={4} className='py-md-5 mb-3 mb-md-0'>
                            <div className="d-flex align-items-center justify-content-md-end">
                                <div className="icon d-flex justify-content-center align-items-center me-4" >
                                    <FiIcons.FiPhoneCall />
                                </div>
                                <div className="content">
                                    <h6 className="mb-0 ">CONTACT US</h6>
                                    <p className="mb-0">02-55034813</p>
                                    <p className="mb-0">info@rr-imperial.com</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* mid_footer */}
            <div className="mid_footer">
                <Container fluid="xl" className="py-5">
                    <Row>
                        <Col lg={4} md={4} sm={6} xs={12}>
                            <h5 className='mb-4 f_bold'>About Us</h5>
                            <p className='mb-5'>RR Imperial Electricals Ltd. is One of the leading electrical wires and cables manufacturers in the world, & it's a joint venture company.</p>
                            <div className="icon">
                                <ul className="p-0 d-flex flex-wrap">
                                    <a className='mb-2 mb-lg-0' href="https://www.facebook.com/RRImperialElectricalLimited/" target="_blank" rel="noreferrer">
                                        <li >
                                            <FaIcons.FaFacebookF />
                                        </li>
                                    </a>
                                    <a className='mb-2 mb-lg-0' href="https://twitter.com/imperial_rr?lang=en" target="_blank" rel="noreferrer">
                                        <li>
                                            <FaIcons.FaTwitter />
                                        </li>
                                    </a>
                                    <a className='mb-2 mb-lg-0' href="" target="_blank" rel="noreferrer">
                                        <li>
                                            <FaIcons.FaInstagram />
                                        </li>
                                    </a>
                                    <a className='mb-2 mb-lg-0' href="https://www.linkedin.com/company/rr-imperial-electricals-ltd/" target="_blank" rel="noreferrer">
                                        <li>
                                            <FaIcons.FaLinkedinIn />
                                        </li>
                                    </a>

                                    <a className='mb-2 mb-md-0' href="https://www.youtube.com/channel/UC2Y_uRNmMz6KO3rW-FJHggQ" target="_blank" rel="noreferrer">
                                        <li>
                                            <FaIcons.FaYoutube />
                                        </li>
                                    </a>
                                </ul>
                            </div>
                        </Col>
                        <Col lg={2} md={2} sm={3} xs={6}>
                            <h5 className="mb-4  f_bold">Links</h5>
                            <ul className="p-0">
                                <NavLink to='/who-we-are'>
                                    <li className='text-capitalize'>
                                        Who We Are
                                    </li>
                                </NavLink>
                                <NavLink to='/maintenance'>
                                    <li className='text-capitalize'>
                                        Our Brands
                                    </li>
                                </NavLink>
                                <NavLink to='/product'>
                                    <li className='text-capitalize'>
                                        Products
                                    </li>
                                </NavLink>
                                <NavLink to='/contact-us/head-office'>
                                    <li className='text-capitalize'>
                                        Contact Us
                                    </li>
                                </NavLink>
                            </ul>
                        </Col>
                        <Col lg={2} md={2} sm={3} xs={6}>
                            <h5 className="mb-4  f_bold">Explore</h5>
                            <ul className="p-0 ">
                                <NavLink to='/media'>
                                    <li className='text-capitalize'>
                                        Media
                                    </li>
                                </NavLink>

                                <NavLink to='/maintenance'>
                                    <li className='text-capitalize'>
                                    Our Story
                                    </li>
                                </NavLink>

                                <NavLink to='/maintenance'>
                                    <li className='text-capitalize'>
                                    Latest Posts
                                    </li>
                                </NavLink>

                                <NavLink to='/maintenance'>
                                    <li className='text-capitalize'>
                                        Help Center
                                    </li>
                                </NavLink>
                            </ul>
                        </Col>
                        <Col lg={4} md={4} sm={12} xs={12}>
                            <h5>Office Maps</h5>
                            <iframe title="Office Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29202.2894880896!2d90.39487138189729!3d23.80842031187588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c727497c47e7%3A0x5e18063b966d3e18!2sR.R%20Imperial%20Ltd!5e0!3m2!1sen!2sbd!4v1656416424661!5m2!1sen!2sbd" width="100%" height="200px" style={{ borderRadius: "5px" }} allowFullScreen ={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </Col>

                    </Row>
                </Container>
            </div>
            {/* bottom_footer */}
            <div className="bottom_footer">
                <Container fluid="xl" className='text-center py-3'>
                    {/* <span>Copyright © 2022 RRKABLE. All Right Reserved | Developed by <a className='mb-2 mb-md-0' href="https://sarfaa.com/" target="_blank" rel="noreferrer">SARFAA.</a></span> */}

                    <div className="d-flex flex-wrap justify-content-between align-items-center">
                        <small><span style={{ fontSize: '17px' }}>2022</span> RR Kabel, All Rights Reserved.</small>
                        {/* <small style={{fontSize: '11px'}}>DEVELOPED  <span className='mx-1'>BY</span> <a  href="https://sarfaa.com/" target="_blank" rel="noreferrer">SARFAA.</a></small> */}
                    </div>
                </Container>
            </div>

        </div>
    );
};
export default Footer;