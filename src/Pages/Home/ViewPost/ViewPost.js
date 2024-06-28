import React, { useContext, useState, useEffect } from 'react';
import './vp.css';
import ViewPostCard from './ViewPostCard';
import { AuthContext } from '../../../AuthProvider';

const ViewPost = () => {
    const [posts, setPosts] = useState([]);
    const { user, logOutUser } = useContext(AuthContext);

    useEffect(() => {
        fetch('https://job-portal-weld.vercel.app/posts', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('job-token')}`
            }
        })
        .then(res => {
            if (res.status === 401 || res.status === 403) {
                logOutUser();
                return;
            }
            return res.json();
        })
        .then(data => setPosts(data))
        .catch(err => console.error("Failed to load posts:", err));
    }, [user?.email, logOutUser]);

    return (
        <div className="view-posts-container">
            <h2 className="view-posts-title">View Posts</h2>
            <div className="posts-grid">
                {posts.length > 0 ? posts.map(post => (
                    <ViewPostCard post={post} key={post._id} />
                )) : <p>No posts available.</p>}
            </div>
        </div>
    );
};

export default ViewPost;
