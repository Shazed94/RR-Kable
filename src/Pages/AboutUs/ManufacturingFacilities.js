import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const ManufacturingFacilities = () => {
    return (
        <div className="policy">
            <div className=''>
                <Card className="bg-dark text-white border-0 rounded-0 mb-4">
                    <Card.Img style={{ maxHeight: '350px' }} src={require('../../Assets/product_sample.jpeg')} alt="Card_image" />
                    <Card.ImgOverlay className='dark_layer'>
                        <Card.Title className='f_medium'>Manufacturing Facilities</Card.Title>
                    </Card.ImgOverlay>
                </Card>
            </div>
            <div className="content mx-md-3 text_justify ">
                <div>
                    <h4 className='title_after my-4'> <span className='cl_dark_red f_extrabold'>Manufacturing Facilities </span></h4>
                    <p className='text-muted f_medium'>
                        Apart from innovative technology and ideas that power lives daily, we need to credit two of
                        our factories that have catapulted us to the highest peak in the wires and cables industry. It’s
                        because of them that we have acquired an identity as the best wires and cables manufacturers in India along with a strong international presence.

                        <br />
                        <br />

                        RR Kabel has always strived to offer best quality products to the market on time. In order to
                        achieve this, RR Kabel has set up manufacturing plants at two places in India. These manufacturing plants are located at Silvassa and Waghodia.

                        <br />
                        <br />

                        The manufacturing plants are well-equipped with modern machinery for producing quality
                        products. All the plants are ISO 9001: 2015, 14001 : 2004, 18001 : 2007 and ISO 45001 certified. All these plants are continuously upgraded to offer quality outcome. They have an excellent safety record, making RR Kabel wires and cables toppers of their range.
                    </p>
                </div>


            </div>

            <div className="certificate">
                <Row>
                    <Col sm={4} md={6} lg={4} className='mb-3'>
                        <Card className='border-0 w-100'>
                            <Card.Img variant="top" className='w-100' src={require('../../Assets/certificate_h_205.jpg')} style={{maxHeight: '205px'}}/>
                            <Card.Footer className='bg_transparent px-0 border-0'>
                                <small className="text-muted  f_bold">ISO 9001:2015 (Silvassa)</small>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col sm={4} md={6} lg={4} className='mb-3'>
                        <Card className='border-0 w-100'>
                            <Card.Img variant="top" className='w-100' src={require('../../Assets/certificate_h_205.jpg')} style={{maxHeight: '205px'}}/>
                            <Card.Footer className='bg_transparent px-0 border-0'>
                                <small className="text-muted  f_bold">ISO 9001:2015 (Silvassa)</small>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col sm={4} md={6} lg={4} className='mb-3 '>
                        <Card className='border-0 w-100'>
                            <Card.Img variant="top" className='w-100' src={require('../../Assets/certificate_h_205.jpg')} style={{maxHeight: '205px'}}/>
                            <Card.Footer className='bg_transparent px-0 border-0'>
                                <small className="text-muted  f_bold">ISO 9001:2015 (Silvassa)</small>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col sm={4} md={6} lg={4} className='mb-3'>
                        <Card className='border-0 w-100'>
                            <Card.Img variant="top" className='w-100' src={require('../../Assets/certificate_h_205.jpg')} style={{maxHeight: '205px'}}/>
                            <Card.Footer className='bg_transparent px-0 border-0'>
                                <small className="text-muted  f_bold">ISO 9001:2015 (Silvassa)</small>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div >
    );
};

export default ManufacturingFacilities;