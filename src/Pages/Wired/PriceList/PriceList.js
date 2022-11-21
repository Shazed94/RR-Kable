import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import './PriceList.css';
import * as FaIcons from "react-icons/fa";

const PriceList = () => {

    const [clickState, setClickState] = useState(1);

    const ToggleClass = (index) => {
        setClickState(index);
    };

    return (
        <>
            <div className='heading'>
                <Card className="bg-dark text-white border-0 rounded-0 mb-4">
                    <Card.Img style={{ maxHeight: '350px' }} src={require('../../../Assets/wired_sample.png')} alt="wired_sample" />
                    <Card.ImgOverlay className='dark_layer'>
                        <Card.Title className='f_medium'>Price List</Card.Title>
                    </Card.ImgOverlay>
                </Card>
            </div>
            <div className="content">

                <div className="accordion">
                    <div className={`accordion-item  ${clickState === 1 ? "acordian_active" : ""}`}>
                        <div className="accordion-item-header f_bold" onClick={() => ToggleClass(1)}>
                            RR Kable
                        </div>
                        <div className="accordion-item-body">
                            <div className="accordion-item-body-content">
                            <a href={require('../../../Assets/RR-Kabel-Price-list-22-11-21.pdf')} download>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <FaIcons.FaAngleDoubleRight className="me-2 mb_2px cl_dark_red" />
                                        <span className='text-muted f_medium'> Price List</span>
                                    </div>
                                    <div>
                                        {/* <a href={require('../../../Assets/RR-Kabel-Price-list-22-11-21.pdf')} download> */}
                                            <FaIcons.FaFileDownload className="cl_dark_red" />
                                        {/* </a> */}
                                    </div>
                                </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="accordion">
                    <div className={`accordion-item  ${clickState === 2 ? "acordian_active" : ""}`}>
                        <div className="accordion-item-header f_bold" onClick={() => ToggleClass(2)}>
                            RR Shramik
                        </div>
                        <div className="accordion-item-body">
                            <div className="accordion-item-body-content">
                                <a href={require('../../../Assets/Shramik-Price-list-22.11.2021.pdf')} download>
                                    <div className="d-flex flex-wrapalign-items-center justify-content-between">
                                        <div className='me-2'>
                                            <FaIcons.FaAngleDoubleRight className="me-2 mb_2px cl_dark_red" />
                                            <span className='text-muted f_medium'> Price List</span>
                                        </div>
                                        <div>
                                            {/* <a href={require('../../../Assets/Shramik-Price-list-22.11.2021.pdf')} download> */}
                                                <FaIcons.FaFileDownload className="cl_dark_red" />
                                            {/* </a> */}
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PriceList;