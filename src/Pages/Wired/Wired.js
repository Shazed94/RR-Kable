import { Card, Col, Container, Row } from 'react-bootstrap';
import * as FaIcons from "react-icons/fa";

import { NavLink, Outlet } from 'react-router-dom';

import Header from '../../Component/Header/Header';
import Footer from '../../Component/Footer/Footer';



const Wired = () => {





    return (
        <>
            <Header />
            <div className="media_page main_section">
                <div className="header">
                    <Card className="bg-dark text-white border-0 rounded-0">
                        <Card.Img className='dark_filter' src={require('../../Assets/wired_bg.jpeg')} alt="media_image" />
                        <Card.ImgOverlay className="d-flex justify-content-center align-items-center">
                            <h1 className='m-0 f_bold ls_3px text-capitalize'>Wired</h1>
                        </Card.ImgOverlay>
                    </Card>
                </div>
                <div className="user content my-4">
                    <Container fluid="xl">
                        <Row>
                            <Col md={4} className='mb-4'>

                                {/* customise css (navActive)is in product.css page */}
                                <div className="leftbar navActive h-100 bg_dark_red">
                                    <ul className=' pb-3 mb-0 px-4'>
                                        <NavLink to='pricelist'>
                                            <li className='text-capitalize px-3 py-3 f_bold'>
                                                <FaIcons.FaAngleDoubleRight className="me-2 mb_2px" />
                                                Price List
                                            </li>
                                        </NavLink>
                                        <NavLink to='calculator'>
                                            <li className='text-capitalize px-3 py-3 f_bold'>
                                                <FaIcons.FaAngleDoubleRight className="me-2 mb_2px" />
                                                Kable Assist Calculator
                                            </li>
                                        </NavLink>
                                        {/* <NavLink to='kableconnect'>
                                            <li className='text-capitalize px-3 py-3 f_bold'>
                                                <FaIcons.FaAngleDoubleRight className="me-2 mb_2px" />
                                                Kabel Connect
                                            </li>
                                        </NavLink> */}

                                       

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
export default Wired;