import { Button, Collapse, Container, Dropdown, DropdownButton, Form, FormControl, InputGroup, Nav, Navbar, Offcanvas } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import { Link, NavLink } from 'react-router-dom';
import { BACKEND_BASE_URL } from '../GlobalVariables';

import './Header.css'
import { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {

    useEffect(() => {
        window.onscroll = function () { scrollFunction() };
    })

    const scrollFunction = () => {
        const addClass = document.querySelector('.header2');
        if (window.pageYOffset > 30) {
            addClass.classList.add('header_shrink');
        }
        else {
            addClass.classList.remove('header_shrink');
        }
    }

    // =============== Search Product ====================
    const [open, setOpen] = useState(false);
    const [searchProduct, setSearchProduct] = useState([]);
    const [search_string, setSearch_string] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    console.log(search_string);


    const getResult = (e) => {
        e.preventDefault();
        setOpen(true);
        setIsLoading(true);
        axios.post(`https://backend-rrkabel.trodad.com/api/search`, { search_string }).then((res) => {
            console.log(res.data.search_result);

            // if (res.data.search_result.length != 0) {
            setSearchProduct(res.data.search_result);
            // }

        }).finally(() => { setIsLoading(false) });
    }

    useEffect(() => {
        if (search_string == "") {
            setOpen(false);
            setSearchProduct([])
        }
    }, [search_string])

    const navClose = () => {
        document.querySelector('.btn-close').click();
    }

    return (
        <>
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
                                <a href="https://twitter.com/imperial_rr?lang=en" target="_blank" rel="noreferrer">
                                    <li className="me-3">
                                        <FaIcons.FaTwitter />
                                    </li>
                                </a>
                                <a href="" target="_blank" rel="noreferrer">
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

            <Navbar expand='lg' sticky="top" className='d-flex flex-column header2' style={{ backgroundColor: 'white' }}>
                {/* mid_Header */}

                <Container className="mid_Header dnone_lg  border-bottom " fluid="xl">
                    <div className="d-flex flex-wrap  align-items-center w-100 py-3 transition_ease_io_3">
                        <div className="left_content mb-3 mb-sm-0 logo">
                            <Link to='/' >
                                <img as={Link} to='/' src={require('../../Assets/logo.png')} alt="" />
                            </Link>
                        </div>
                        <div className="right_content ms-sm-auto">
                            <div className="d-flex flex_xs_wrap shramik_list">
                                <a href={require('../../Assets/RR-Kabel-Price-list-22-11-21.pdf')} download>


                                    <div className="d-flex flex-wrap align-items-center border border-2 me-1 me-sm-5 mb-sm-0 mb-2">
                                        <BsIcons.BsFillArrowDownSquareFill className='cl_dark_red me-3' size="44px" />
                                        <div className='px-2 '>
                                            <p className='m-0'>RR KABEL</p>
                                            <p className='m-0'>PRICE LIST</p>
                                        </div>
                                    </div>
                                </a>
                                <a href={require('../../Assets/Shramik-Price-list-22.11.2021.pdf')} download >
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
                {/* bottom border */}
                <Container fluid="xl" className="bottom_border mt-2">
                    <Navbar.Brand as={Link} to='/' className="d-lg-none  logo">
                        <img src={require('../../Assets/logo.png')} alt="" />
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
                            <Nav className="justify-content-start  flex-grow-1 main-nav">

                                <li className='dropdown' onClick={navClose}>
                                    <NavLink to='/' >Home</NavLink>
                                </li>

                                <li className='dropdown' onClick={navClose}>
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
                                        <NavLink to='/who-we-are/policy'>
                                            <li className='text-capitalize px-3 f_bold'>
                                                Policy
                                            </li>
                                        </NavLink>
                                    </ul>
                                </li>

                                <li className='dropdown' onClick={navClose}>
                                    <NavLink to='/our-brand' >Our Brands</NavLink>
                                    {/*  Start of Dropdown */}
                                    <ul className="dropdown-nav">
                                        <NavLink to='/product'>
                                            <li className='text-capitalize px-3 f_bold'>
                                                RR Kable
                                            </li>
                                        </NavLink>
                                        <NavLink to='/'>
                                            <li className='text-capitalize px-3 f_bold'>
                                                RR Shramik
                                            </li>
                                        </NavLink>
                                    </ul>
                                </li>

                                <li className='dropdown' onClick={navClose}>
                                    <Nav.Link >Products</Nav.Link>
                                    {/*  Start of Dropdown */}
                                    <ul className="dropdown-nav">
                                        <NavLink to='/product'>
                                            <li className='text-capitalize px-3 f_bold'>
                                                RR Kable Products List
                                            </li>
                                        </NavLink>
                                        <NavLink to='/maintenance'>
                                            <li className='text-capitalize px-3 f_bold'>
                                                RR Shramik Products List
                                            </li>
                                        </NavLink>
                                    </ul>
                                </li>

                                {/* <li className='dropdown' onClick={navClose}>
                                    <NavLink to='/product' >Products</NavLink>
                                    <Nav.Link >Link</Nav.Link>
                                </li> */}

                                <li className='dropdown' onClick={navClose}>
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

                                <li className='dropdown' onClick={navClose}>
                                    <NavLink to='/career' >Career</NavLink>
                                    {/*  Start of Dropdown */}
                                    <ul className="dropdown-nav">
                                        <NavLink to='/career/current-opening'>
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

                                <li className='dropdown' onClick={navClose}>
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
                                    </ul>
                                </li>



                                <li className='dropdown' onClick={navClose}>
                                    <NavLink to='/contact-us'>Contact Us</NavLink>
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
                            <Form className="serach " onSubmit={getResult}>
                                <InputGroup className='align-items-center p-0 m-0 g-0 '>
                                    <DropdownButton
                                        title="All"
                                        classname="bg_transparent p-0 m-0 g-0 drop_down_btn"
                                    >
                                        <Dropdown.Item >HOUSE WIRE</Dropdown.Item>
                                        <Dropdown.Item >LOW VOLTAGE CABLES</Dropdown.Item>
                                        <Dropdown.Item >MEDIUM VOLTAGE CABLES</Dropdown.Item>
                                        <Dropdown.Item >HIGH VOLTAGE CABLES</Dropdown.Item>

                                        <Dropdown.Item >FIRE SURVIVAL CABLES</Dropdown.Item>
                                        <Dropdown.Item >COMMUNICATION CABLES</Dropdown.Item>
                                        <Dropdown.Item >INSTRUMENTATION CABLES</Dropdown.Item>
                                        <Dropdown.Item >OVERHEAD CONDUCTOR</Dropdown.Item>
                                    </DropdownButton>
                                    <FormControl
                                        type="text"
                                        placeholder="Search here"
                                        onChange={(e) => { setSearch_string(e.target.value); }}
                                        value={search_string}
                                        required
                                    />
                                    <Button type="submit" className="icon border-0">
                                        <FaIcons.FaSistrix />
                                    </Button>

                                </InputGroup>
                                <div className="position-relative search_wrapper" onClick={() => { setOpen(false); setSearch_string("") }}>
                                    <Collapse in={open}>
                                        <div
                                            id="example-collapse-text"
                                            className="search_result rounded-2 "
                                        >
                                            {
                                                isLoading && (
                                                    <div className="spinner-border text-danger m-3" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                )
                                            }
                                            {
                                                (!isLoading && searchProduct?.length > 0) && (


                                                    searchProduct?.map((data, i) => (
                                                        <Link to={`/product/details/${data.slug}`}>
                                                            <div
                                                                key={i}
                                                                className="search_result_box d-flex p-3 text-dark"

                                                            >
                                                                <img
                                                                    src={`${BACKEND_BASE_URL}/${data.image}`}
                                                                    height={30}
                                                                    width={30}
                                                                    alt={data.name}
                                                                />

                                                                <p className="ms-2 p-0 mb-2">{data.name}</p>
                                                            </div>
                                                        </Link>
                                                    ))
                                                )
                                            }
                                            {
                                                (!isLoading && searchProduct?.length == 0) && (
                                                    <p className="p-3">No Product Found</p>
                                                )
                                            }
                                        </div>
                                    </Collapse>
                                </div>
                            </Form>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>


            </Navbar>



        </>
    );
};

export default Header;