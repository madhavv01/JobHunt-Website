import React, { useContext } from 'react';
import { Typography, Grid } from '@mui/material';
import useStyles from "../../../Styles/Styles";
import { useState, useEffect } from 'react';
import ViewPostCard from './ViewPostCard';
import { AuthContext } from './../../../AuthProvider';


const ViewPost = () => {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const {user, logOutUser } = useContext(AuthContext);

    useEffect(() => {
        fetch('https://job-portal-weld.vercel.app/posts', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('job-token')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    return logOutUser();
                }
                return res.json();
            })
            .then(data => setPosts(data))
    }, [user?.email, logOutUser]);

    return (
        <div className={classes.viewPost}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <Typography className={classes.viewPostCard} variant="h3" align="center" gutterBottom>
                        View Posts
                    </Typography>
                       
                </Grid>
            </Grid>
            <Grid container spacing={2}>
               {
                 posts && posts.length > 0 && posts.map(post => <ViewPostCard post={post} key={post._id} />)
               }
            </Grid>
            
        </div>
    );
};

export default ViewPost;