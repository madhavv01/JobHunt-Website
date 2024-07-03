import React from 'react';
import './f.css'; 
import logo from '../../../logo/logo.png';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <Link to="/view-post">
                    <img src={logo} alt="JobHunt Logo" />
                </Link>
                <Link to="/view-post" className="footer-text">
                    JobHunt
                </Link>
            </div>
            <div className="footer-links">
                <Link to="https://ca.indeed.com/hire/faq" className="footer-link">
                    FAQs
                </Link>
                <Link to="https://support.indeed.com/hc/en-us/articles/217124046-Contacting-Indeed" className="footer-link">
                    Contact Us
                </Link>
                <Link to="https://ca.indeed.com/about" className="footer-link">
                    About Us
                </Link>
                <Link to="https://hrtechprivacy.com/brands/indeed#privacypolicy" className="footer-link">
                    Privacy Policy
                </Link>
            </div>
            <p className="footer-rights">
                All Rights Reserved © 2024
            </p>
        </div>
    );
};

export default Footer;
