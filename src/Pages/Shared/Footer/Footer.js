import React from 'react';
import './f.css';
import logo from '../../../logo/logo.png';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-nav-logo">
                <Link to="/">
                    <img src={logo} alt="JobHunt Logo" className="logo"/>
                </Link>
                <Link to="/" className="footer-brand-name">
                    JobHunt
                </Link>
            </div>
            <p className="footer-rights">
                All Rights Reserved © 2024
            </p>
        </div>
    );
};

export default Footer;
