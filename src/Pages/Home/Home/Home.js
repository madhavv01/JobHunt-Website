import React from 'react';
import ViewPost from '../ViewPost/ViewPost';
import homeImg from '../../../images/home.jpg';
import './home.css';

const Home = () => {
    return (
        <div className="homeDiv">
            <img className="homeImg" src={homeImg} alt="Home" />
            <ViewPost />
        </div>
    );
};

export default Home;
