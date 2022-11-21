import React from 'react';
import { Card } from 'react-bootstrap';
import './KabelConnect.css'

const KabelConnect = () => {
    return (
        <>
            <div className=''>
                <Card className="bg-dark text-white border-0 rounded-0 mb-4">
                    <Card.Img style={{ maxHeight: '350px' }} src={require('../../../Assets/product_sample.jpeg')} alt="Card_image" />
                    <Card.ImgOverlay className='dark_layer'>
                        <Card.Title className='f_medium'>Construction And Building Range</Card.Title>
                    </Card.ImgOverlay>
                </Card>
            </div>
            <div className="content mx-md-3 text_justify">
                <h4 className='title_after my-4'> <span className='cl_dark_red f_extrabold'>What is Kabel Connect ? </span></h4>
                <p className='text-muted f_medium'>Kabel Connect is a unique loyalty program available as a mobile app on Google Play Store.
                    This mobile platform recognises and rewards registered RETAILERS and ELECTRICIANS. It
                    also serves as a direct channel for the brand to keep in touch with its channel and trade partners. Registered users earn Reward Points on every purchase of select RR Kabel products
                    and redeem it as per their convenience from a list of options provided. Unlike usual loyalty
                    programs, Kabel Connect is designed to understand and address the needs of our channel
                    and trade associates in the quickest and easiest manner
                </p>
                <h4 className='title_after my-4'> <span className='cl_dark_red f_extrabold'>All that's on offer</span></h4>
                <p className='text-muted f_medium '>The RR Kabel Connect App is not just restricted to gift vouchers and cash backs, but a lot
                    more. All reward points can be converted for cash to be transferred directly to the registered
                    bank account. So, every purchase provides an opportunity to sell more and earn more.
                </p>
                <h4 className='title_after my-4'> <span className='cl_dark_red f_extrabold'>Register today</span></h4>
                <p className='text-muted f_medium '>Download the application via Google Play Store, fill in basic details (Name, Number, Address)
                    and the registered Electrician/Retailer code. For any information or query feel free to call
                    1800 103 6633 (Toll Free number) where our executives would be happy to assist.
                </p>
                <h4 className='title_after my-4'> <span className='cl_dark_red f_extrabold'>Unlimited earning potential</span></h4>
                <p className='text-muted f_medium '>The RR Kabel Connect App offers a wide range of benefits to choose from. The most amazing
                    thing is that one can convert reward points into cash to be transferred directly to the registered bank account. The reward points can also be redeemed for Mobile/DTH recharges.
                </p>
            </div>
        </>
    );
};

export default KabelConnect;