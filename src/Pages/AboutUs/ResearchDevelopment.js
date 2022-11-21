import React from 'react';
import { Card } from 'react-bootstrap';


const ResearchDevelopment = () => {
    return (
        <>
            <div className="sec1_card">
                <Card className="bg-dark text-white border-0 rounded-0 mb-4">
                    <Card.Img style={{ maxHeight: '350px' }} src={require('../../Assets/product_sample.jpeg')} alt="Card_image" />
                    <Card.ImgOverlay className='dark_layer'>
                        <Card.Title className='f_medium'>Research Development</Card.Title>
                    </Card.ImgOverlay>
                </Card>
            </div>

            <div className=" ">
                <p className='text-muted text_justify f_medium'>
                    At RR Kabel, innovation is a constant process and our research & development facility is one of the
                    prime reasons for our success. In collaboration with a team of highly skilled professionals, we are
                    breaking down barriers that have restrained innovations to be a challenge.
                    <br />
                    <br />
                    Thanks to a close knit team with exceptional skills and expertise, who commission research and
                    deploy the best technologies, we are able to develop unrivalled and patented products like Unilay,
                    that are safer and more reliable for our customers.
                </p>
            </div>
        </>
    );
};

export default ResearchDevelopment;