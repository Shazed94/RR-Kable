import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Card, Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { BACKEND_BASE_URL } from '../../../Component/GlobalVariables';
import './KabelCalculator.css';
import * as RiIcons from "react-icons/ri";


const KableCalculator = () => {

    const nominalConductorValue = [
        {
            "nominal_area_of_conductor": "1"
        },
        {
            "nominal_area_of_conductor": "1.5"
        },
        {
            "nominal_area_of_conductor": "2.25"
        },
        {
            "nominal_area_of_conductor": "4"
        },
        {
            "nominal_area_of_conductor": "6"
        },
        {
            "nominal_area_of_conductor": "10"
        },
        {
            "nominal_area_of_conductor": "16"
        },
        {
            "nominal_area_of_conductor": "25"
        },
        {
            "nominal_area_of_conductor": "35"
        },
        {
            "nominal_area_of_conductor": "50"
        },
        {
            "nominal_area_of_conductor": "70"
        },
        {
            "nominal_area_of_conductor": "95"
        },
        {
            "nominal_area_of_conductor": "120"
        },
        {
            "nominal_area_of_conductor": "150"
        },
        {
            "nominal_area_of_conductor": "185"
        },
        {
            "nominal_area_of_conductor": "240"
        },
        {
            "nominal_area_of_conductor": "300"
        },
        {
            "nominal_area_of_conductor": "400"
        },
        {
            "nominal_area_of_conductor": "500"
        },
        {
            "nominal_area_of_conductor": "630"
        },
        {
            "nominal_area_of_conductor": "800"
        },
        {
            "nominal_area_of_conductor": "1000"
        }
    ]

    const [recommendValue, setRecommendValue] = useState({});
    const [powerOptionValue, setPowerOptionValue] = useState([]);

    const [value, setValue] = useState();
    const [power, setPower] = useState("kw");
    const [nominalValue, setNominalValue] = useState(1);
    const [nominalValueJson, setNominalValueJson] = useState();


    const onClear2 = () => {
        document.getElementById("nominal_select").selectedIndex = 0;
        setNominalValue(1)
    }

    const onClear1 = () => {
        document.getElementById("powerOptionValue").selectedIndex = 0;
        setPower('kw');
        setValue(0.37)
    }

    useEffect(() => {
        axios.get(`${BACKEND_BASE_URL}/api/get-kw-hp/${power}`).then((res) => {
            setPowerOptionValue(res.data.options_values);
            for (const [value] of Object.entries(res.data.options_values[0])) {
                setValue(`${value}`);
            }
        });
    }, [power])


    useEffect(() => {

        axios.get(`${BACKEND_BASE_URL}/api/get-calculator-value/${power}/${value}`).then((res) => {
            setRecommendValue(res.data.calculator_values);
        });

    }, [value, power]);

    useEffect(() => {
        axios.get(`${BACKEND_BASE_URL}/api/get-current-ratting-of-wire-and-cables-value/${nominalValue}`).then((res) => {
            setNominalValueJson(res.data.wire_and_cables_calculator_values);
        });
    }, [nominalValue])


    return (
        <div className="kabel_calculator">
            <div className='heading'>
                {/* <Card className="bg-dark text-white border-0 rounded-0 mb-4">
                    <Card.Img style={{ maxHeight: '350px' }} src={require('../../../Assets/Kabel_Assist_Calculator.jpg')} alt="Kabel Assist Calculator" />
                    <Card.ImgOverlay className='dark_layer'>
                        <Card.Title className='f_medium'>Kabel Assist Calculator</Card.Title>
                    </Card.ImgOverlay>

                    <iframe width="100%" height="400px"
                        src="https://www.youtube.com/embed/1h4VkY1oWvo?start=10"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen={true} />
                </Card> */}
                <Tabs
                    defaultActiveKey="1"
                    transition={false}
                    id="noanim-tab-example"
                    // className="mb-3"
                    justify
                >
                    <Tab eventKey="1" title="RECOMMENDED CABLE SIZES FOR MOTORS">
                        <div className="tab_border p-4 mb-3">
                            {/* sorting1 */}
                            <Row className="sorting_set top gx-0 px-2 align-items-lg-center ">
                                <Col sm={8}>
                                    <Row className='align-items-center'>
                                        <Col sm={12} md={12} lg={4} xl={3} className='my-2'>
                                            <p className="mb-0 cl_ash fw-bold">Motor Output</p>
                                        </Col>
                                        <Col sm={6} md={6} lg={4} xl={4} className='my-2'>
                                            <Form.Select aria-label="Default select example"
                                                onChange={e => { setValue(e.target.value); }}
                                                id="powerOptionValue"
                                            >
                                                {
                                                    powerOptionValue?.map((data) => (
                                                        power === "kw" ?
                                                            (<option value={data.kw} key={data.kw}>{data.kw}</option>)
                                                            :
                                                            (<option value={data.hp} key={data.hp}>{data.hp}</option>)
                                                    ))
                                                }
                                            </Form.Select>
                                        </Col>
                                        <Col sm={6} md={6} lg={4} xl={4} className='my-2'>
                                            <Form.Select aria-label="Default select example" onChange={e => { setPower(e.target.value); }}>
                                                <option value="kw">kW</option>
                                                <option value="hp">HP</option>
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={4}>
                                    <button className="btn_clear d-flex align-items-center my-2" onClick={onClear1}>
                                        <RiIcons.RiEraserLine size="16px" />
                                        <span className='ms-2 mt-1 d-block'>Clear</span>
                                    </button>
                                </Col>
                            </Row>
                            {/* sorting2 box*/}
                            <div className="sorting_set">
                                <h4 className='pt-5 pb-2 text-center border_bottom_white_1px'>Full Load Current</h4>
                                <Row className=" gx-0  px-2  py-2  justify-content-center">
                                    <Col xs={6} md={3} xl={2} className="box mb-3">
                                        <div className="box_content">
                                            <p>{recommendValue?.full_load_current_1}</p>
                                            <p>AMP</p>
                                        </div>
                                    </Col>
                                    <Col xs={6} md={3} xl={2} className="box mb-3">
                                        <div className="box_content">
                                            <p>{recommendValue?.full_load_current_2}</p>
                                            <p>AMP</p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            {/* sorting3 box*/}
                            <div className="sorting_set">
                                <h4 className='pt-3 pb-2 text-center border_bottom_white_1px'>Star Delta Starter</h4>
                                <Row className="gx-0  px-2  py-2 justify-content-center">
                                    <Col xs={6} md={3} xl={2} className="box mb-3">
                                        <div className="box_header">
                                            <h5 className="min_height">Overload Relay Range</h5>
                                        </div>
                                        <div className="box_content">
                                            <p>{recommendValue?.star_delta_starter_overload_relay_range}</p>
                                            <p>AMP</p>
                                        </div>
                                    </Col>
                                    <Col xs={6} md={3} xl={2} className="box mb-3">
                                        <div className="box_header">
                                            <h5 className="min_height">Max. Backup fuse</h5>
                                        </div>
                                        <div className="box_content">
                                            <p>{recommendValue?.star_delta_starter_max_backup_fuse}</p>
                                            <p>AMP</p>
                                        </div>
                                    </Col>
                                    <Col xs={6} md={3} xl={2} className="box mb-3">
                                        <div className="box_header">
                                            <h5 className="min_height">Recommended Cable</h5>
                                        </div>
                                        <div className="box_content">
                                            <p>{recommendValue?.star_delta_starter_recommended_cable}</p>
                                            <p>Sq. mm Al</p>
                                        </div>
                                    </Col>
                                    <Col xs={6} md={3} xl={2} className="box mb-3">
                                        <div className="box_header">
                                            <h5 className="min_height">Size Supply Side</h5>
                                        </div>
                                        <div className="box_content">
                                            <p>{recommendValue?.star_delta_starter_size_supply_side}</p>
                                            <p>Sq. mm Cu</p>
                                        </div>
                                    </Col>
                                    <Col xs={6} md={3} xl={2} className="box mb-3">
                                        <div className="box_header">
                                            <h5 className="min_height">Size Motor Side</h5>
                                        </div>
                                        <div className="box_content">
                                            <p>{recommendValue?.star_delta_starter_size_motor_side}</p>
                                            <p>Sq.mm Al</p>
                                        </div>
                                    </Col>
                                    <Col xs={6} md={3} xl={2} className="box mb-3">
                                        <div className="box_header">
                                            <h5 className="min_height"></h5>
                                        </div>
                                        <div className="box_content">
                                            <p>{recommendValue?.star_delta_starter_none}</p>
                                            <p>Sq.mm Cu</p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            {/* sorting4 box*/}
                            <div className="sorting_set">
                                <h4 className='pt-3 pb-2 text-center border_bottom_white_1px'>Direct Online Startert</h4>
                                <Row className="sorting_set gx-0  px-2  py-2 justify-content-center">

                                    <Col xs={6} md={3} xl={2} className="box mb-3">
                                        <div className="box_header">
                                            <h5 className="min_height">Direct Online Starter</h5>
                                        </div>
                                        <div className="box_content">
                                            <p>{recommendValue?.direct_online_starter_overload_relay_range}</p>
                                            <p>AMP</p>
                                        </div>
                                        <div className="box_footer">
                                            <p></p>
                                        </div>
                                    </Col>
                                    <Col xs={6} md={3} xl={2} className="box mb-3">
                                        <div className="box_header">
                                            <h5 className="min_height">Max. Backup fuse</h5>
                                        </div>
                                        <div className="box_content">
                                            <p>{recommendValue?.direct_online_starter_max_backup_fuse}</p>
                                            <p>AMP</p>
                                        </div>
                                        <div className="box_footer">
                                            <p>(415V)</p>
                                        </div>
                                    </Col>
                                    <Col xs={6} md={3} xl={2} className="box mb-3">
                                        <div className="box_header">
                                            <h5 className="min_height">Recommended Cable</h5>
                                        </div>
                                        <div className="box_content">
                                            <p>{recommendValue?.direct_online_starter_recommended_cable}</p>
                                            <p>Sq. mm Al</p>
                                        </div>
                                        <div className="box_footer">
                                            <p>(3Ph)</p>
                                        </div>
                                    </Col>
                                    <Col xs={6} md={3} xl={2} className="box mb-3">
                                        <div className="box_header">
                                            <h5 className="min_height">Size</h5>
                                        </div>
                                        <div className="box_content">
                                            <p>{recommendValue?.direct_online_starter_size}</p>
                                            <p>Sq. mm Cu</p>
                                        </div>
                                        <div className="box_footer">
                                            <p>(50 Hz)</p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                        </div>
                        {/* notice */}
                        <Row className="notice gx-0  mt-5 ">
                            <h3 className='border_bottom_red_1px'>NOTE</h3>
                            <p className='mb-3 ms-1'>We recommend 6 Core cable between Star Delta starter and Motor. If 6 Core cable is not available, use 2 Nos. of 3 Core unarmoured cable.</p>
                        </Row>
                    </Tab>
                    <Tab eventKey="2" title="CURRENT RATING OF WIRES & CABLES">
                        <div className="tab_border p-4 mb-3 tab_2">
                            <Row className="sorting_set top gx-0 px-2 align-items-lg-center ">
                                <Col sm={8} md={9}>
                                    <Row className='align-items-center'>
                                        <Col sm={12} md={12} lg={5} className='my-2'>
                                            <p className="mb-0 cl_ash fw-bold">Nominal area of conductor</p>
                                        </Col>
                                        <Col sm={6} md={6} lg={4} className='my-2'>
                                            <Form.Select aria-label="Default select example" id="nominal_select"
                                                onChange={e => { setNominalValue(e.target.value); }}
                                            >
                                                {
                                                    nominalConductorValue?.map((data) => (
                                                        <option
                                                            value={data.nominal_area_of_conductor}
                                                            key={data.nominal_area_of_conductor}
                                                        >
                                                            {data.nominal_area_of_conductor}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Select>
                                        </Col>
                                        <Col sm={6} md={4} lg={3} className='my-2'>
                                            <p className="mb-0 cl_ash fw-bold">Sq. mm.</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={4} md={3}>
                                    <button className="btn_clear d-flex align-items-center my-2" onClick={onClear2}>
                                        <RiIcons.RiEraserLine size="16px" />
                                        <span className='ms-2 mt-1 d-block'>Clear</span>
                                    </button>
                                </Col>
                            </Row>



                            <Row className=" gx-0 align-items-center justify-content-between">
                                <Col md={6} >
                                    <div className="sorting_set   me-md-1">
                                        <h5 className="pb-3 pt-4 text-center border_bottom_white_1px px-1  px-sm-2">1.1kV-3, 3.5, 4Core RR kabel XLPE Cables</h5>
                                        <Row className=" gx-0 justify-content-center">

                                            <Col xs={6} md={5} xl={4} className="box mb-3">
                                                <div className="box_content">
                                                    <p>{nominalValueJson?.four_core_RR_kabel_XLPE_cables_1}</p>
                                                </div>
                                            </Col>
                                            <Col xs={6} md={5} xl={4} className="box mb-3">
                                                <div className="box_content">
                                                    <p>{nominalValueJson?.four_core_RR_kabel_XLPE_cables_2}</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                <Col md={6} >
                                    <div className="sorting_set   ms-md-1">
                                        <h5 className="pb-3 pt-4 text-center border_bottom_white_1px px-1  px-sm-2">
                                            1.1kV-3, 3.5, 4Core RR Kabel PVC Cables
                                        </h5>
                                        <Row className=" gx-0 justify-content-center">

                                            <Col xs={6} md={5} xl={4} className="box mb-3">
                                                <div className="box_content">
                                                    <p>{nominalValueJson?.four_core_RR_kabel_PVC_cables_1}</p>
                                                </div>
                                            </Col>
                                            <Col xs={6} md={5} xl={4} className="box mb-3">
                                                <div className="box_content">
                                                    <p>{nominalValueJson?.four_core_RR_kabel_PVC_cables_2}</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>

                            </Row>


                            {/* sorting2 box*/}
                            <Row className=" gx-0   justify-content-between">
                                <Col md={6} >
                                    <div className="sorting_set me-md-1 h-100">
                                        <h5 className="pb-3 pt-4 text-center border_bottom_white_1px px-1  px-sm-2 min_height">3.3kV, 6.6kV, 11kV-3 Core RR Kabel PVC Cables</h5>
                                        <Row className=" gx-0 justify-content-center ">

                                            <Col xs={6} md={5} xl={4} className="box mb-3 ">
                                                <div className="box_content">
                                                    <p>{nominalValueJson?.three_core_RR_kabel_PVC_cables_1}</p>
                                                </div>
                                            </Col>
                                            <Col xs={6} md={5} xl={4} className="box mb-3">
                                                <div className="box_content">
                                                    <p>{nominalValueJson?.three_core_RR_kabel_PVC_cables_2}</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="sorting_set ms-md-1 h-100">
                                        <h5 className="pb-3 pt-4 text-center border_bottom_white_1px px-1  px-sm-2">
                                            Single Core RR Kabel XLPE Cables 3.8/6.6kV(E),
                                            6.6/6.6kV(UE), 6.35/11kV(E)
                                        </h5>
                                        <Row className=" gx-0  justify-content-center">

                                            <Col xs={6} md={5} xl={4} className="box mb-3">
                                                <div className="box_content">
                                                    <p>{nominalValueJson?.single_core_RR_kabel_XLPE_cables_1}</p>
                                                </div>
                                            </Col>
                                            <Col xs={6} md={5} xl={4} className="box mb-3">
                                                <div className="box_content">
                                                    <p>{nominalValueJson?.single_core_RR_kabel_XLPE_cables_2}</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>

                            </Row>


                            <div className="sorting_set border_top_white_1px">

                                <h5 className="pb-3 pt-5 text-center border_bottom_white_1px px-1  px-sm-2">
                                    3 Core RR Kabel XLPE Cables1.9/3.3kV(E), 3.3/3.3kV(UE), 3.8/6.6kV(E),6.35/11kV((E)-35 to 400 sq.mm,
                                    11/11kV(UE) -70 to 400 sq.mm, 12.7/22kV(E), 19/33kV(E)-95 to 400 sq. mmand 33/33kV(UE)-120 to 400 sq.mm
                                </h5>

                                <Row className="sorting_set gx-0  px-1  align-items-center justify-content-center">



                                    <Col xs={6} md={3} xl={2} className="box mb-3">
                                        <div className="box_content">
                                            <p>{nominalValueJson?.three_core_RR_kabel_XLPE_cables_1}</p>
                                        </div>
                                    </Col>
                                    <Col xs={6} md={3} xl={2} className="box mb-3">
                                        <div className="box_content">
                                            <p>{nominalValueJson?.three_core_RR_kabel_XLPE_cables_2}</p>
                                        </div>
                                    </Col>

                                </Row>
                            </div>

                            <div className="sorting_set">
                                {/* sorting2 box*/}
                                <h5 className="py-3 text-center border_bottom_white_1px px-1  px-sm-2">
                                    Current ratings for Building wires & Flexibles, in Amps. with Copper cond.
                                </h5>


                                <Row className="sorting_set gx-0  px-1   mb-3  align-items-center justify-content-center">


                                    <Col xs={6} md={3} xl={2} className="box mb-3">
                                        <div className="box_content">
                                            <p>{nominalValueJson?.current_ratings_for_building_wires}</p>
                                        </div>
                                    </Col>

                                </Row>
                            </div>

                        </div>

                        {/* notice */}
                        <Row className="notice gx-0  mt-5 ">
                            <h3 className='border_bottom_red_1px'>NOTE</h3>
                            <h4 className='mb-3 ms-1 mt-3 cl_dark_red'>Current Rating for Power Cables with Aluminium conductors</h4>
                            <ul className="d-flex flex-wrap ms-1">
                                <li className="me-3">Figures in Red are Current Rating for Cables laid in Air</li>
                                <li>Figure in Black are Current Rating for Cables laid in Ground</li>
                            </ul>
                            <p className='mb-3 ms-1 cl_dark_red fw-bold'>For Approx, current rating for Power cables with copperconductor increase the above rating by 25%</p>
                            <p className='mb-3 ms-1 '>The above rating are normal rating & will subject to de rating factors for various conditions as per IS:3961</p>
                        </Row>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default KableCalculator;