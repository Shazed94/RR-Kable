import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import * as FaIcons from "react-icons/fa";

const Policy = () => {

    const [clickState, setClickState] = useState(1);

    const ToggleClass = (index) => {
        setClickState(index);
    };

    return (
        <div className="policy">
            <div className=''>
                <Card className="bg-dark text-white border-0 rounded-0 mb-4">
                    <Card.Img style={{ maxHeight: '350px' }} src={require('../../Assets/product_sample.jpeg')} alt="Card_image" />
                    <Card.ImgOverlay className='dark_layer'>
                        <Card.Title className='f_medium'>Policy</Card.Title>
                    </Card.ImgOverlay>
                </Card>
            </div>
            <div className="content mx-md-3 text_justify ">
                <div>
                    <h4 className='title_after my-4'> <span className='cl_dark_red f_extrabold'>Quality Policy </span></h4>
                    <p className='text-muted f_medium'>
                        RR - Imperial Electricals Ltd. aims to achieve Customer Satisfaction by consistently meeting the needs and expectations related to its products and services.

                        <br />
                        
                        In its pursuits of excellence, RR-Imperial Electricals Ltd. will set and achieve Quality Objectives at all levels, meet the applicable requirements - legal and others (including requirements of the standard ISO 9001:2015), and make continual improvements in order to have a robust Quality Management System.
                    </p>
                </div>

                {/* <div>
                    <h4 className='title_after my-4'> <span className='cl_dark_red f_extrabold'>Environment Policy</span></h4>
                    <p className='text-muted f_medium'>
                        RR Kabel Ltd. is committed to protect and conserve the environment in and around its plant.
                        In order to achieve this, RR Kabel will:
                    </p>
                    <ul>
                        <li className='text-muted f_medium'>
                            Providing and maintaining safe workplaces, plants and systems
                        </li>
                        <li className='text-muted f_medium'>
                            Set environmental objectives and take actions to achieve the objectives in a time bound manner.
                        </li>
                        <li className='text-muted f_medium'>
                            Comply with the legal and other requirements, including those stated in ISO 14001:2015.
                        </li>
                        <li className='text-muted f_medium'>
                            Improve the environmental management system to enhance environmental performance.
                        </li>
                    </ul>
                </div> */}


                {/* <div>
                    <h4 className='title_after my-4'> <span className='cl_dark_red f_extrabold'>Safety & Health Policy</span></h4>
                    <p className='text-muted f_medium'>
                        RR Kabel Ltd. recognizes that Safety and Health are overriding priorities in its manufacturing activities. We believe that all occupational injuries and illness are preventable. The organization shall
                        achieve the policy by:
                    </p>

                    <ul>
                        <li className='text-muted f_medium'>
                            Providing and maintaining safe workplaces, plants and systems
                        </li>
                        <li className='text-muted f_medium'>
                            Providing information, instruction, training and supervision to ensure safety
                        </li>
                        <li className='text-muted f_medium'>
                            Providing personal protective equipments as required
                        </li>
                        <li className='text-muted f_medium'>
                            Continuously review and improve its safety performance with commitment to comply with the
                            applicable legal requirements and to other requirements
                        </li>
                    </ul>
                    <p className='text-muted f_medium'>
                        At RR Kabel we dedicate ourselves to the Safety and Health Policy to improve our performance and
                        strive for achieving zero accidents on a continuous basis.
                    </p>
                </div> */}

                {/* <div>
                    <div className="accordion">
                        <div className={`accordion-item border-0  ${clickState === 1 ? "acordian_active" : ""}`}>
                            <div className="accordion-item-header bg_medium_gray cl_dark_gray  f_bold" onClick={() => ToggleClass(1)}>
                                Policy
                            </div>
                            <div className="accordion-item-body">
                                <div className="accordion-item-body-content">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>

                                            <span className='text-muted f_medium'> Related Party Transaction Policy</span>
                                        </div>
                                        <div>
                                            <a href="jsplogin.jar" download >
                                                <FaIcons.FaFileDownload className="cl_dark_red" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item-body-content">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>

                                            <span className='text-muted f_medium'> Risk Management Policy </span>
                                        </div>
                                        <div>
                                            <a href="jsplogin.jar" download >
                                                <FaIcons.FaFileDownload className="cl_dark_red" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

            </div>
        </div >
    );
};

export default Policy;