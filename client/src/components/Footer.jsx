import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer bg-dark p-t-80 p-b-40" style={{ background: '#0a0a0a', color: '#888' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 m-b-40">
                        <h4 className="white-txt m-b-20" style={{ fontWeight: '800' }}>VELOCITY <span className="primary-color">SHOP</span></h4>
                        <p className="m-b-30" style={{ lineHeight: '1.8' }}>
                            Your ultimate destination for professional sports equipment.
                            We empower athletes worldwide with top-tier gear and performance-driven apparel.
                        </p>
                        <div className="social-links" style={{ display: 'flex', gap: '15px' }}>
                            <a href="#" className="social-icon"><Facebook size={20} /></a>
                            <a href="#" className="social-icon"><Twitter size={20} /></a>
                            <a href="#" className="social-icon"><Instagram size={20} /></a>
                            <a href="#" className="social-icon"><Youtube size={20} /></a>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-4 col-6 m-b-30">
                        <h5 className="white-txt m-b-20">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li className="m-b-10"><Link to="/" style={{ color: '#888' }}>Home</Link></li>
                            <li className="m-b-10"><Link to="/shop" style={{ color: '#888' }}>Shop</Link></li>
                            <li className="m-b-10"><Link to="/orders" style={{ color: '#888' }}>My Orders</Link></li>
                            <li className="m-b-10"><Link to="/register" style={{ color: '#888' }}>Member Sign Up</Link></li>
                        </ul>
                    </div>

                    <div className="col-lg-2 col-md-4 col-6 m-b-30">
                        <h5 className="white-txt m-b-20">Categories</h5>
                        <ul className="list-unstyled">
                            <li className="m-b-10"><Link to="/shop" style={{ color: '#888' }}>Footwear</Link></li>
                            <li className="m-b-10"><Link to="/shop" style={{ color: '#888' }}>Equipment</Link></li>
                            <li className="m-b-10"><Link to="/shop" style={{ color: '#888' }}>Apparel</Link></li>
                            <li className="m-b-10"><Link to="/shop" style={{ color: '#888' }}>Accessories</Link></li>
                        </ul>
                    </div>

                    <div className="col-lg-4 col-md-4">
                        <h5 className="white-txt m-b-20">Get In Touch</h5>
                        <ul className="list-unstyled">
                            <li className="m-b-15" style={{ display: 'flex', gap: '10px' }}>
                                <MapPin size={18} className="primary-color" />
                                <span>123 Elite Performance Way, Sports City, ST 90210</span>
                            </li>
                            <li className="m-b-15" style={{ display: 'flex', gap: '10px' }}>
                                <Phone size={18} className="primary-color" />
                                <span>+91 6374920993</span>
                            </li>
                            <li className="m-b-15" style={{ display: 'flex', gap: '10px' }}>
                                <Mail size={18} className="primary-color" />
                                <span>mehulbirare6810@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr style={{ borderColor: '#222', margin: '40px 0' }} />

                <div className="row align-items-center">
                    <div className="col-md-6">
                        <p className="m-b-0">&copy; {new Date().getFullYear()} VELOCITY SHOP. All rights reserved.</p>
                    </div>
                    <div className="col-md-6 text-md-right">
                        <img src="https://web-static.moengage.com/moengage/images/payment-icons.72b07e.svg" alt="Payments" style={{ height: '30px', filter: 'grayscale(1) invert(0.5)' }} />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
