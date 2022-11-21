import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AwardRecognitions = () => {
    return (
        <>
            {/* <Helmet>
                <title>Media Centre | Events |Wires & Cables Manufactures | RR Kabel</title>
            </Helmet> */}
            <Card className="bg-dark text-white border-0 rounded-0 mb-4">
                <Card.Img style={{ maxHeight: '350px' }} src={require('../../Assets/AboutUs/award_bg.png')} alt="Card_image" />
                <Card.ImgOverlay className='dark_layer' >
                    <Card.Title className='f_medium'>Awards & Recognitions</Card.Title>
                </Card.ImgOverlay>
            </Card>
            <div className="events_list">

                <Row className='mt-4 event_content_after align-items-center mt-3'>
                    <Col md={4} className='mb-4 mb-sm-0'>
                        <img className='w-100' src={require('../../Assets/AboutUs/Award.png')} alt="" />
                    </Col>
                    <Col md={8}>

                        <h5 className="f_bold cl_dark_gray ">All India Kaizen Competition 2021 - 2022</h5>
                        <p className='text-muted mb-1 f_medium text_justify'>
                            We are proud to receive the BPC - PGP Glass All India Kaizen Competition
                            2021 - 2022 award in the Productivity and Environment categories, where
                            we are winners in the Productivity category - Quality Department (Technical Cell) and 1st runners up in Environment category.
                        </p>
                        <Link to='/' className='text-muted f_bold'>Read More....</Link>

                    </Col>
                </Row>
                <Row className='mt-4 event_content_after align-items-center mt-3'>
                    <Col md={4} className='mb-4 mb-sm-0'>
                        <img className='w-100' src={require('../../Assets/AboutUs/Award.png')} alt="" />
                    </Col>
                    <Col md={8}>

                        <h5 className="f_bold cl_dark_gray ">All India Kaizen Competition 2021 - 2022</h5>
                        <p className='text-muted mb-1 f_medium text_justify'>
                            We are proud to receive the BPC - PGP Glass All India Kaizen Competition
                            2021 - 2022 award in the Productivity and Environment categories, where
                            we are winners in the Productivity category - Quality Department (Technical Cell) and 1st runners up in Environment category.
                        </p>
                        <Link to='/' className='text-muted f_bold'>Read More....</Link>

                    </Col>
                </Row>
                <Row className='mt-4 event_content_after align-items-center mt-3'>
                    <Col md={4} className='mb-4 mb-sm-0'>
                        <img className='w-100' src={require('../../Assets/AboutUs/Award.png')} alt="" />
                    </Col>
                    <Col md={8}>

                        <h5 className="f_bold cl_dark_gray ">All India Kaizen Competition 2021 - 2022</h5>
                        <p className='text-muted mb-1 f_medium text_justify'>
                            We are proud to receive the BPC - PGP Glass All India Kaizen Competition
                            2021 - 2022 award in the Productivity and Environment categories, where
                            we are winners in the Productivity category - Quality Department (Technical Cell) and 1st runners up in Environment category.
                        </p>
                        <Link to='/' className='text-muted f_bold'>Read More....</Link>

                    </Col>
                </Row>

            </div>
        </>
    );
};

export default AwardRecognitions;