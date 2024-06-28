import React from 'react';
import ViewPost from './../ViewPost/ViewPost';
import homeImg from "../../../images/home.svg";
import './h.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-image-container">
                <img src={homeImg} alt="Home" />
            </div>
            <ViewPost />
        </div>
    );
};

export default Home;
