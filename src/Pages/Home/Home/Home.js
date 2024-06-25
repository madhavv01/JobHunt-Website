import React from 'react';
import ViewPost from './../ViewPost/ViewPost';
import homeImg from "../../../images/home.svg";
import useStyles from "../../../Styles/Styles";

const Home = () => {
    const classes = useStyles();
    
    return (
        <div>
            <div className={classes.homeDiv}>
                <img className={classes.homeImg} src={homeImg} alt="" />
            </div>
            <ViewPost />
        </div>
    );
};

export default Home;