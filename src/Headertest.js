import { Container, Dropdown, DropdownButton, Form, FormControl, InputGroup, Nav, Navbar, Offcanvas } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import { Link, NavLink } from 'react-router-dom';

import './Component/Header/Header.css'
import { useEffect, useState } from "react";

const Headertest = () => {

    const [scrollValue, setscrollValue] = useState(0);


    useEffect(() => {


        const addClass = document.querySelector('.sticky_header');
        const mainSection = document.querySelector('.main_section');



        if (scrollValue >= 30) {
            addClass.classList.add('fixed');
            addClass.classList.add('header_shrink');
            mainSection.classList.add('space');
        }
        else {
            addClass.classList.remove('fixed');
            addClass.classList.remove('header_shrink');
            mainSection.classList.remove('space');
        }
    })

    window.addEventListener('scroll', () => {
        setscrollValue(window.scrollY);
    })




    return (
        <div className="">
            {/* top_Header */}
            <div className="topHeader">
                <Container fluid="xl">
                    <div className="d-flex flex-wrap justify-content-between align-items-center py-2">
                        <div className="left_content">
                            <span className=''>Welcome to RR-Imperial Electricals Limited</span>
                        </div>
                        <div className="right_content">
                            <ul className="d-flex flex-wrap m-0 p-0">
                                <a href="https://www.facebook.com/RRImperialElectricalLimited/" target="_blank" rel="noreferrer">
                                    <li className="me-3">
                                        <FaIcons.FaFacebookF />
                                    </li>
                                </a>
                                <a href="https://www.w3schools.com" target="_blank" rel="noreferrer">
                                    <li className="me-3">
                                        <FaIcons.FaTwitter />
                                    </li>
                                </a>
                                <a href="https://www.w3schools.com" target="_blank" rel="noreferrer">
                                    <li className="me-3">
                                        <FaIcons.FaInstagram />
                                    </li>
                                </a>
                                <a href="https://www.linkedin.com/company/rr-imperial-electricals-ltd/" target="_blank" rel="noreferrer">
                                    <li className="me-3">
                                        <FaIcons.FaLinkedinIn />
                                    </li>
                                </a>

                                <a href="https://www.youtube.com/channel/UC2Y_uRNmMz6KO3rW-FJHggQ" target="_blank" rel="noreferrer">
                                    <li className="me-3">
                                        <FaIcons.FaYoutube />
                                    </li>
                                </a>

                            </ul>
                        </div>
                    </div>
                </Container>
            </div>

            <div className="sticky_header">
                {/* mid_Header */}
                <div className="mid_Header dnone_md transition_ease_io">
                    <Container className="border-bottom" fluid="xl">
                        <div className="d-flex flex-wrap  align-items-center w-100 py-4 transition_ease_io_3">
                            <div className="left_content mb-3 mb-sm-0 logo">
                                <Link to='/' >
                                    <img as={Link} to='/' src={require('../src/Assets/logo.png')} alt="" />
                                </Link>
                            </div>
                            <div className="right_content ms-sm-auto">
                                <div className="d-flex flex_xs_wrap shramik_list">
                                    <a href={require('../src/Assets/RR-Kabel-Price-list-22-11-21.pdf')} download>


                                        <div className="d-flex flex-wrap align-items-center border border-2 me-1 me-sm-5 mb-sm-0 mb-2">
                                            <BsIcons.BsFillArrowDownSquareFill className='cl_dark_red me-3' size="44px" />
                                            <div className='px-2 '>
                                                <p className='m-0'>RR KABEL</p>
                                                <p className='m-0'>PRICE LIST</p>
                                            </div>
                                        </div>
                                    </a>
                                    <a href={require('../src/Assets/Shramik-Price-list-22.11.2021.pdf')} download >
                                        <div className="d-flex flex-wrap align-items-center border border-2 mb-sm-0 mb-2">
                                            <BsIcons.BsFillArrowDownSquareFill className='cl_dark_red me-3' size="44px" />
                                            <div className='px-2 '>
                                                <p className='m-0'>RR SHRAMIK</p>
                                                <p className='m-0'>PRICE LIST</p>
                                            </div>
                                        </div>
                                    </a>


                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
                <Navbar expand='md' sticky="top">

                    {/* bottom border */}
                    <Container fluid="xl">
                        <Navbar.Brand as={Link} to='/' className="d-md-none  logo">
                            <img src={require('../src/Assets/logo.png')} alt="" />
                        </Navbar.Brand>


                        <Navbar.Toggle aria-controls='offcanvasNavbar-expand-md' />

                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-md`}
                            aria-labelledby='offcanvasNavbarLabel-expand-md'
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id='offcanvasNavbarLabel-expand-md'>
                                    RR CABLE
                                </Offcanvas.Title>
                            </Offcanvas.Header>


                            <Offcanvas.Body className='flex-wrap'>
                                <Nav className="justify-content-start  flex-grow-1 pe-3 main-nav">

                                    <li className='dropdown'>
                                        <NavLink to='/' >Home</NavLink>
                                    </li>

                                    <li className='dropdown'>
                                        <NavLink to='/who-we-are' >Who We Are</NavLink>
                                        {/*  Start of Dropdown */}
                                        <ul className="dropdown-nav">
                                            <NavLink to='/who-we-are/our-profile'>
                                                <li className='text-capitalize px-3 f_bold'>
                                                    Our Profile
                                                </li>
                                            </NavLink>

                                            <NavLink to='/who-we-are/mission'>
                                                <li className='text-capitalize px-3 f_bold'>
                                                    Mission
                                                </li>
                                            </NavLink>
                                            <NavLink to='/who-we-are/vision'>
                                                <li className='text-capitalize px-3 f_bold'>
                                                    Vision
                                                </li>
                                            </NavLink>
                                            <NavLink to='/maintenance'>
                                                <li className='text-capitalize px-3 f_bold'>
                                                    Organogram
                                                </li>
                                            </NavLink>
                                            <NavLink to='/who-we-are/policy'>
                                                <li className='text-capitalize px-3 f_bold'>
                                                    Policy
                                                </li>
                                            </NavLink>
                                        </ul>
                                    </li>

                                    <li className='dropdown'>
                                        <NavLink to='/maintenance' >Our Brands</NavLink>
                                    </li>

                                    <li className='dropdown'>
                                        <NavLink to='/product' >Products</NavLink>
                                    </li>

                                    <li className='dropdown'>
                                        <NavLink to='/media' >Media</NavLink>
                                        {/*  Start of Dropdown */}
                                        <ul className="dropdown-nav">
                                            <NavLink to='/media/news'>
                                                <li className='text-capitalize px-3 f_bold'>

                                                    News
                                                </li>
                                            </NavLink>
                                            <NavLink to='/media/events'>
                                                <li className='text-capitalize px-3 f_bold'>

                                                    Events
                                                </li>
                                            </NavLink>
                                            <NavLink to='/media/blog'>
                                                <li className='text-capitalize px-3 f_bold'>

                                                    Blogs
                                                </li>
                                            </NavLink>
                                            {/* <NavLink to='/maintenance'>
                                            <li className='text-capitalize px-3 f_bold'>
                                                
                                                Media Kit
                                            </li>
                                        </NavLink> */}
                                            <NavLink to='/media/download'>
                                                <li className='text-capitalize px-3 f_bold'>

                                                    Download
                                                </li>
                                            </NavLink>
                                            <NavLink to='/media/video'>
                                                <li className='text-capitalize px-3 f_bold'>

                                                    Videos
                                                </li>
                                            </NavLink>
                                            {/* <NavLink to='/maintenance'>
                                            <li className='text-capitalize px-3 f_bold'>
                                                
                                                MD's Desk
                                            </li>
                                        </NavLink> */}
                                        </ul>
                                    </li>


                                    <li className='dropdownx'>
                                        <NavLink to='/career' >Career</NavLink>
                                        {/*  Start of Dropdown */}
                                        <ul className="dropdown-nav">
                                            <NavLink to='/maintenance'>
                                                <li className='text-capitalize px-3 f_bold'>
                                                    Current Openings
                                                </li>
                                            </NavLink>
                                            <NavLink to='/career/submitcv'>
                                                <li className='text-capitalize px-3 f_bold'>
                                                    Submit Your CV
                                                </li>
                                            </NavLink>
                                        </ul>
                                    </li>



                                    <li className='dropdown'>
                                        <NavLink to='/wired' >Wired</NavLink>
                                        {/*  Start of Dropdown */}
                                        <ul className="dropdown-nav">
                                            <NavLink to='/wired/pricelist'>
                                                <li className='text-capitalize px-3 f_bold'>
                                                    Price List
                                                </li>
                                            </NavLink>
                                            <NavLink to='/wired/calculator'>
                                                <li className='text-capitalize px-3 f_bold'>
                                                    Kable Assist Calculator
                                                </li>
                                            </NavLink>
                                            {/* <NavLink to='/wired/kableconnect'>
                                                    <li className='text-capitalize px-3 f_bold'>
                                                        Kabel Connect
                                                    </li>
                                                </NavLink> */}
                                        </ul>
                                    </li>


                                    <li className='dropdown'>
                                        <NavLink to='/contact-us/head-office'>Contact Us</NavLink>
                                        {/*  Start of Dropdown */}
                                        <ul className="dropdown-nav">
                                            <NavLink to='/contact-us/head-office'>
                                                <li className='text-capitalize px-3 f_bold'>
                                                    Head Office
                                                </li>
                                            </NavLink>
                                            <NavLink to='/contact-us/factory-office'>
                                                <li className='text-capitalize px-3 f_bold'>
                                                    Factory
                                                </li>
                                            </NavLink>
                                            <NavLink to='/contact-us/regional-office'>
                                                <li className='text-capitalize px-3 f_bold'>
                                                    Regional Office
                                                </li>
                                            </NavLink>
                                        </ul>
                                    </li>



                                </Nav>
                                {/* pe-5 pe-lg-0 */}
                                <Form className="serach ">
                                    <InputGroup className='align-items-center p-0 m-0 g-0 '>
                                        <DropdownButton
                                            title="All"
                                            classname="bg_transparent p-0 m-0 g-0 "
                                        >
                                            <Dropdown.Item href="#">Action</Dropdown.Item>
                                            <Dropdown.Item href="#">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item href="#">Separated link</Dropdown.Item>
                                        </DropdownButton>
                                        <FormControl type="search"
                                            placeholder="Search Here"
                                            className="me-2 border-0"
                                            aria-label="Search" />

                                        <div className="icon d-flex justify-content-center align-items-center">
                                            <FaIcons.FaSistrix />
                                        </div>

                                    </InputGroup>
                                </Form>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>

                </Navbar>


            </div>
        </div>
    );
};

export default Headertest;