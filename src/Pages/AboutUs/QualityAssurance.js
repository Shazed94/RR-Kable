import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const QualityAssurance = () => {
    return (
        <div className="policy">
            <div className=''>
                <Card className="bg-dark text-white border-0 rounded-0 mb-4">
                    <Card.Img style={{ maxHeight: '350px' }} src={require('../../Assets/product_sample.jpeg')} alt="Card_image" />
                    <Card.ImgOverlay className='dark_layer'>
                        <Card.Title className='f_medium'>Quality Assurance</Card.Title>
                    </Card.ImgOverlay>
                </Card>
            </div>
            <div className="content mx-md-3 text_justify ">
                <div>
                    <h4 className='title_after my-4'> <span className='cl_dark_red f_extrabold'> Certifications </span></h4>
                    <p className='text-muted f_medium'>

                        These certifications are a testament to the efficiency and continual improvement in our purpose to deliver customer service and satisfaction to our valued clients. Our each product
                        meets an intensive Quality Assurance Inspection, which is endorsed by certifications of a
                        dozen national & international standards monitoring agencies. We are Inhouse NABL accredited company as per ISO 17025 and in wires and cables category, our products are the
                        most certified which makes them trustworthy in more than 85+ countries across the world
                        making us the leading wires and cables manufacturers.

                        <br />
                        <br />

                        RoHS (Restriction of Hazardous Substances) is a directive on the restriction of the use of certain hazardous substances in electrical and electronic equipment. It is often referred to as
                        the ‘lead-free directive’, but there are 10 such hazardous substances not available or controlled for the cables offered by us for more than a decade.

                        <br />
                        <br />

                        However to actually fulfill the purpose, we offer our products with REACH Compliance offering a high degree of human and environmental safety. REACH (Registration, Evaluation, Authorisation and Restriction of Chemicals) is a regulation adopted to improve the protection
                        of human health and the environment from the risks that can be posed by chemicals most of
                        which are carcinogenic is nature. When it comes to environment friendly initiative, we are 1st
                        Indian cable manufacturing company to offer REACH Compliant cables. Currently under
                        REACH, our cables are free from more than 200 hazardous substances.

                        <br />
                        <br />

                        REACH addresses the production and use of chemical substances and their potential impacts on both human health and environment. It also addresses the continued use of chemical substances of very high concern (SVHC) because of their negative impact on human
                        health and environment. One of the major elements of REACH regulation is the requirement
                        to communicate information on chemicals up and down the supply chain. This ensures that
                        the manufacturers, customers and the end customers are aware of information regarding
                        health and safety of the product supplied.
                    </p>
                </div>


            </div>

            <div className="certificate">
                <Row>
                    <Col sm={4} md={6} lg={4} className='mb-3'>
                        <Card className='border-0 w-100'>
                            <Card.Img variant="top" className='w-100' src={require('../../Assets/certificate_h_205.jpg')} style={{ maxHeight: '205px' }} />
                            <Card.Footer className='bg_transparent px-0 border-0'>
                                <small className="text-muted  f_bold">ISO 9001:2015 (Silvassa)</small>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col sm={4} md={6} lg={4} className='mb-3'>
                        <Card className='border-0 w-100'>
                            <Card.Img variant="top" className='w-100' src={require('../../Assets/certificate_h_205.jpg')} style={{ maxHeight: '205px' }} />
                            <Card.Footer className='bg_transparent px-0 border-0'>
                                <small className="text-muted  f_bold">ISO 9001:2015 (Silvassa)</small>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col sm={4} md={6} lg={4} className='mb-3 '>
                        <Card className='border-0 w-100'>
                            <Card.Img variant="top" className='w-100' src={require('../../Assets/certificate_h_205.jpg')} style={{ maxHeight: '205px' }} />
                            <Card.Footer className='bg_transparent px-0 border-0'>
                                <small className="text-muted  f_bold">ISO 9001:2015 (Silvassa)</small>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col sm={4} md={6} lg={4} className='mb-3'>
                        <Card className='border-0 w-100'>
                            <Card.Img variant="top" className='w-100' src={require('../../Assets/certificate_h_205.jpg')} style={{ maxHeight: '205px' }} />
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

export default QualityAssurance;