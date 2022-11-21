import { Card, Col, Container, Pagination, Row } from 'react-bootstrap';
import Footer from '../../Component/Footer/Footer';
import Header from '../../Component/Header/Header';
import * as FaIcons from "react-icons/fa";
import './Media.css'

import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';

const Media = () => {

    const [pageActive, setPageActive] = useState(1);
    let paggination = [];

    for (let number = 1; number <= 6; number++) {
        paggination.push(
            <Pagination.Item key={number} active={number === pageActive} onClick={() => setPageActive(number)}>
                {number}
            </Pagination.Item>
        );
    }

    

    return (
        <>
            <Header />
            <div className="media_page main_section">
                <div className="header">
                    <Card className="bg-dark text-white border-0 rounded-0">
                        <Card.Img className='dark_filter' src={require('../../Assets/media_bg.jpeg')} alt="media_image" />
                        <Card.ImgOverlay className="d-flex justify-content-center align-items-center">
                            <h1 className='m-0 f_bold ls_3px text-capitalize'>Media</h1>
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
                                        <NavLink to='news'>
                                            <li className='text-capitalize px-3 py-3 f_bold'>
                                                <FaIcons.FaAngleDoubleRight className="me-2 mb_2px" />
                                                News
                                            </li>
                                        </NavLink>
                                        <NavLink to='events'>
                                            <li className='text-capitalize px-3 py-3 f_bold'>
                                                <FaIcons.FaAngleDoubleRight className="me-2 mb_2px" />
                                                Events
                                            </li>
                                        </NavLink>
                                        <NavLink to='blog'>
                                            <li className='text-capitalize px-3 py-3 f_bold'>
                                                <FaIcons.FaAngleDoubleRight className="me-2 mb_2px" />
                                                Blogs
                                            </li>
                                        </NavLink>
                                        {/* <NavLink to='/maintenance'>
                                            <li className='text-capitalize px-3 py-3 f_bold'>
                                                <FaIcons.FaAngleDoubleRight className="me-2 mb_2px" />
                                                Media Kit
                                            </li>
                                        </NavLink> */}
                                        <NavLink to='download'>
                                            <li className='text-capitalize px-3 py-3 f_bold'>
                                                <FaIcons.FaAngleDoubleRight className="me-2 mb_2px" />
                                                Download
                                            </li>
                                        </NavLink>
                                        <NavLink to='video'>
                                            <li className='text-capitalize px-3 py-3 f_bold'>
                                                <FaIcons.FaAngleDoubleRight className="me-2 mb_2px" />
                                                Videos
                                            </li>
                                        </NavLink>
                                        {/* <NavLink to='/maintenance'>
                                            <li className='text-capitalize px-3 py-3 f_bold'>
                                                <FaIcons.FaAngleDoubleRight className="me-2 mb_2px" />
                                                MD's Desk
                                            </li>
                                        </NavLink> */}
                                    </ul>
                                </div>
                            </Col>
                            <Col md={8} lg={8} >
                                <div className="rightbar h-100">
                                    <Outlet />
                                    {/* <Pagination >{paggination}</Pagination> */}
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
export default Media;