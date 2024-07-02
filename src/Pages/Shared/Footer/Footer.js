import React from 'react';
import './f.css'; 
import logo from '../../../logo/logo.png';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <Link to="view-post">
                    <img src={logo} alt="JobHunt Logo" />
                </Link>
                <Link to="view-post" className="footer-text">
                    JobHunt
                </Link>
            </div>
            <Link to="https://ca.indeed.com/about" className="footer-about">
                    About Us
                </Link>
            <Link to="https://hrtechprivacy.com/brands/indeed#privacypolicy" className="footer-privacy">
                    Privacy Policy
                </Link>

            <p className="footer-rights">
                All Rights Reserved © 2024
            </p>
        </div>
    );
};

export default Footer;
