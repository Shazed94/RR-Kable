import { Card, Col, Container, Row } from 'react-bootstrap';
import Footer from '../../Component/Footer/Footer';
import Header from '../../Component/Header/Header';
import * as FaIcons from "react-icons/fa";
import './AboutUs.css'


import { NavLink, Outlet } from 'react-router-dom';


const AboutUs = () => {


    return (
        <>
            <Header />
            <div className="media_page main_section">
                <div className="header">
                    <Card className="bg-dark text-white border-0 rounded-0">
                        <Card.Img className='dark_filter' src={require('../../Assets/Who-we-are-Banner.png')} alt="media_image" />
                        <Card.ImgOverlay className="d-flex justify-content-center align-items-center">
                            <h1 className='m-0 f_bold ls_3px text-capitalize'>Who We Are</h1>
                        </Card.ImgOverlay>
                    </Card>
                </div>
                <div className="user content my-4">
                    <Container fluid="xl">
                        <Row>
                            <Col md={4} className='mb-4 mb-md-0'>

                                {/* customise css (navActive)is in product.css page */}
                                <div className="leftbar navActive h-100 bg_dark_red">
                                    <ul className=' pb-3 mb-0 px-4'>
                                        <NavLink to='our-profile'>
                                            <li className='text-capitalize px-3 py-3 f_bold'>
                                                <FaIcons.FaAngleDoubleRight className="me-2 mb_2px" />
                                                Our Profile
                                            </li>
                                        </NavLink>
                                        {/* <NavLink to='manufacturing-facilities'>
                                            <li className='text-capitalize px-3 py-3 f_bold'>
                                                <FaIcons.FaAngleDoubleRight className="me-2 mb_2px" />
                                                Manufacturing-Facilities
                                            </li>
                                        </NavLink>
                                        <NavLink to='quality-assurance'>
                                            <li className='text-capitalize px-3 py-3 f_bold'>
                                                <FaIcons.FaAngleDoubleRight className="me-2 mb_2px" />
                                                Quality Assurance
                                            </li>
                                        </NavLink>
                                        <NavLink to='award-Recognitions'>
                                            <li className='text-capitalize px-3 py-3 f_bold'>
                                                <FaIcons.FaAngleDoubleRight className="me-2 mb_2px" />
                                                Awards & Recognitions
                                            </li>
                                        </NavLink>
                                        <NavLink to='research-development'>
                                            <li className='text-capitalize px-3 py-3 f_bold'>
                                                <FaIcons.FaAngleDoubleRight className="me-2 mb_2px" />
                                                Research & Development
                                            </li>
                                        </NavLink> */}
                                        <NavLink to='mission'>
                                            <li className='text-capitalize px-3 py-3 f_bold'>
                                                <FaIcons.FaAngleDoubleRight className="me-2 mb_2px" />
                                                Mission
                                            </li>
                                        </NavLink>
                                        <NavLink to='vision'>
                                            <li className='text-capitalize px-3 py-3 f_bold'>
                                                <FaIcons.FaAngleDoubleRight className="me-2 mb_2px" />
                                                Vision
                                            </li>
                                        </NavLink>
                                        <NavLink to='policy'>
                                            <li className='text-capitalize px-3 py-3 f_bold'>
                                                <FaIcons.FaAngleDoubleRight className="me-2 mb_2px" />
                                                Policy
                                            </li>
                                        </NavLink>
                                    </ul>
                                </div>
                            </Col>
                            <Col md={8} >
                                <div className="rightbar">
                                    <Outlet />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default AboutUs;