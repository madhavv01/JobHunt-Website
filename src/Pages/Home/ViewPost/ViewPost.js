import React, { useContext, useState, useEffect } from 'react';
import './vp.css';
import { AuthContext } from '../../../AuthProvider';
import ViewPostCard from './ViewPostCard';

const ViewPost = () => {
    const [posts, setPosts] = useState([]);
    const { user, logOutUser } = useContext(AuthContext);

    useEffect(() => {
        const token = localStorage.getItem('job-token');
        fetch('https://job-portal-weld.vercel.app/posts', {
            headers: {
                authorization: `Bearer ${token}`
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
        .catch(err => console.error('Error fetching posts:', err));
    }, [user?.email, logOutUser]);

    return (
        <div className="view-post-container">
            <h1 className="view-post-header">View Posts</h1>
            <div className="posts-container">
                {posts.length > 0 ? (
                    posts.map(post => <ViewPostCard post={post} key={post._id} />)
                ) : (
                    <p>No posts available.</p>
                )}
            </div>
        </div>
    );
};

export default ViewPost;
