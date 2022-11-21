import React from 'react';

const OurProfile = () => {
    return (
        <>
            <div className='d-flex flex-wrap  h-100'>

                <div className="w_xs_12_md_4 bg_dark_red_gradient">
                    <div className="content mx-xl-4 mx-lg-2 mx-md-2 mx-3 my-3 cl_white">
                        <h5>Our Profile</h5>

                        <p className="py-5" style={{ fontSize: '25px', maxWidth: '200px' }}>
                            <span className="cl_dark_white me-2">Establishing a safe and strong environment</span>
                            {/* <span className='cl_white f_bold'>90+
                                countries</span> */}
                        </p>
                    </div>
                </div>
                <div className="w_xs_12_md_8">
                    <img className="w-100 h-100" src={require('../../Assets/Who-we-are-Image.png')} alt="Card_image" />
                </div>

            </div>
            <div className="content mx-md-3 text_justify ">
                <div>
                    <h4 className='title_after my-4'> <span className='cl_dark_red f_extrabold'>At a Glance</span></h4>
                    <p className='text-muted f_medium'>
                        One of the leading electrical wires and cables manufacturers in the world, RR Kabel is a joint venture company.

                        <br />
                        <br />

                        RR Kabel is a pioneer in wire design, technology, and applicability. The focus on cutting-edge technology and research has continually enhanced the products' efficiency, reliability, and safety aspects. This, in turn, supported the core of RR Kabel’s engineering endeavor, which is to guarantee safe environments everywhere – offices, retail spaces, industrial plants, and residences. Ever since our inception, we have been inspired by the promise of a better life, which innovative engineering promises. This inspiration has transformed into a relentless pursuit, which has seen us engineer and manufactures a colossal range of products apposite for prodigious industries. Our products have been engineered to survive the harshest of environments like the crushing, high pressure of the ocean, or sweltering heat or cold of arid lands.

                        <br />
                        <br />

                        Wires and cables permeate every aspect of our modern lifestyle, which commands an uninterrupted and efficient electricity supply. From planes to trains, telecommunication to entertainment, satellites to Wi-Fi – wires are the omnipresent, unsung heroes pulsating with electricity, bringing surroundings to life, and bridging distances. Our diverse product offerings are nimble and energy efficient, minimizing losses, tending security, and earning your savings through every millimeter it pervades. In our 25-year journey so far, we have been lauded with several products and system certifications, and awards that speak for our quality and dependable wires, making us one of the best quality wire and cable companies. Yet, we at RR Kabel, will not cease to excel in the wire and cable industry, through our diligent efforts and commitment to the creation of the best.

                        <br />
                        <br />

                        RR Kabel is manufactured in Bangladesh by RR Imperial Electricals Ltd, an ambitious ISO-certified joint venture between Imperial Group, Bangladesh and RR Group. Incorporated with the objective of manufacturing, processing, sale and distribution of heavy-duty cables and wires for industrial usage, Low voltage and HT cables and other electrical products. RR Imperial Electricals also has an extended product line under the brand name of RR Shramik, manufacturing Super Enameled wires, copper strips (bare and paper insulated), bus bars. RR Imperial aims to enhance customer satisfaction by consistently meeting the needs and expectations related to products and services. RR Kabel achieved 2 valuable certifications: one is UL and another is VBE.

                        <br />
                        <br />

                        Imperial Group is easily amongst the leaders in chemicals and colorants business in Bangladesh, having contributed to the rise of the now very powerful textile industry of Bangladesh. With an experience of over 20 years in sales and distribution, a country wide establishment and network, Imperial Group is very well versed with the needs and expectations of the Bangladesh market.

                        <br />
                        <br />

                        RR Group is one of the premier enameled wires and cable producers, processing over 50,000 MT of Copper every year. With an experience of over 45 years in the electrical field, RR Group is currently exporting its products to over 80 countries worldwide. Its wires and cables have been internationally certified to cover all continents,

                        <br />
                        <br />

                        RR Imperial Electricals Ltd is the amalgamation of two like-minded groups, who share a mutual passion for bringing the best to Bangladesh as it grows rapidly to become a force in the Asia. With expertise complementing each other’s strengths, RR Imperial Electricals Ltd aims to be a leader in the horizon of Bangladesh’s highly potential electrical industry.
                    </p>
                </div>
            </div>
        </>
    );
};

export default OurProfile;