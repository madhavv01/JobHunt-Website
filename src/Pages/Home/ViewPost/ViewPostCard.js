import React, { useState } from 'react';
import { Card, Typography, Grid } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { CardContent } from '@mui/material';
import useStyles from "../../../Styles/Styles";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';


const ViewPostCard = ({post}) => {
    const classes = useStyles();
    const [remainPost, setRemainPost] = useState([]);

    const {_id ,postName, companyName, numberOfVacancy, currentDate, lastApplyDate, jobDescription, jobRequirements, howToApply } = post;


    const handleDelete = (post) => {
        const deletePost = window.confirm(`Are you sure you want to delete this post? ${post.postName}`);
        if(deletePost){
            fetch(`https://job-portal-weld.vercel.app/deletePost/${post._id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(result => {
                if(result.deletedCount > 0){
                    toast('Post deleted successfully');
                    const remainingPost = remainPost.filter(remain => remain._id !== post._id);
                    setRemainPost(remainingPost);
                }
            })
        }
    }

    
    return (
        <Grid item xs={12} md={6}>
            <CardActionArea>
                <Card sx={{ display: 'flex' }} className={classes.singlePost}>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" align='center' variant="h5">
                        <b>{postName}</b>
                        </Typography>
                        <br />
                        <Typography variant="subtitle1" align='center' color="text.secondary">
                            Company Name: {companyName} <br /> Number of Vacancy: {numberOfVacancy}
                        </Typography>
                        <Typography variant="subtitle1" align='center' color="text.secondary">
                            Job Posted Date: {currentDate} <br /> Last Apply Date: {lastApplyDate}
                        </Typography>
                        <br />
                        <div className={classes.desc}>
                            <Typography variant="subtitle1" paragraph>
                            <b>Job Description:</b> {jobDescription?.split('-').map((item, index) => (<p key={index}>{item}</p>))}
                            <b>Job Requirements:</b> {jobRequirements?.split('-').map((item, index) => (<p key={index}>{item}</p>))}
                            <b>How to Apply:</b> {howToApply?.split('-').map((item, index) => (<p key={index}>{item}</p>))}
                            </Typography>
                        </div>
                        <Stack spacing={2} direction="row" className={classes.viewBtn}>
                            <Link to={`/update-post/${_id}`}>
                                <Button variant="contained" startIcon={<EditIcon/>}>Edit</Button>
                            </Link>
                            <Button onClick={() => handleDelete(post)} variant="outlined" startIcon={<DeleteIcon />}>Delete</Button>
                        </Stack>
                    </CardContent>
                </Card>
            </CardActionArea>
        </Grid>
    );
};

export default ViewPostCard;