import React, { useState } from 'react';
import './vp.css';
import { Link } from 'react-router-dom';

const ViewPostCard = ({ post }) => {
    const [remainPost, setRemainPost] = useState([]);

    const handleDelete = () => {
        const deletePost = window.confirm(`Are you sure?? ${post.postName}`);
        if (deletePost) {
            fetch(`https://job-portal-weld.vercel.app/deletePost/${post._id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(result => {
                if (result.deletedCount > 0) {
                    alert('Post deleted successfully');
                    const remainingPosts = remainPost.filter(remain => remain._id !== post._id);
                    setRemainPost(remainingPosts);
                }
            });
        }
    };

    return (
        <div className="post-card">
            <h2 className="post-title">{post.postName}</h2>
            <p className="post-details">
                Company Name: {post.companyName}
                <br></br>Number of Vacancy: {post.numberOfVacancy}
            </p>
            <p className="post-dates">
                Job Posted Date: {post.currentDate}<br></br>
                Last Apply Date: {post.lastApplyDate}
            </p>
            <p className="post-description">
                Job Description: {post.jobDescription}
            </p>
            <p className="post-requirements">
                Job Requirements: {post.jobRequirements}
            </p>
            <p className="post-apply">
                How to Apply: {post.howToApply}
            </p>
            <div className="post-actions">
                <Link to={`/update-post/${post._id}`} className="edit-link">
                    <button>Edit</button>
                </Link>
                <button onClick={handleDelete} className="delete-button">Delete</button>
            </div>
        </div>
    );
};

export default ViewPostCard;
