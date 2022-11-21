import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Report = () => {
    return (
        <>

            <Container>
                <Row className='align-items-center align-content-center' style={{ height: '99vh', backgroundColor: 'white' }}>
                    <Col md={6} className='order-md-1 order-2'>
                        <div style={{ maxWidth: '500px' }}>
                            <h1 className='fw-bold text-start mb-5' style={{ color: '#76786A' }}>
                                Sorry for the
                                <br />
                                inconvenience.
                            </h1>
                            <p className='mb-5' style={{ color: '#76786A' }}>
                                This page is currently under maintenance, to better your experience we are improving the quality of some of our pages. Your understanding is much appreciated.
                            </p>
                            <Link to="/">
                                <Button className='px-5 py-2 border-0' style={{ backgroundColor: '#76786A', borderRadius: '10px',letterSpacing: '1.5px'}}>
                                    Get Updates
                                </Button>
                            </Link>

                        </div>
                    </Col>
                    <Col md={6} className='order-md-2 order-1'>
                        <img className='w-100' src={require('../Assets/404.png')} alt="maintenance_page" />
                    </Col>
                </Row>
            </Container>

        </>
    );
};

export default Report;