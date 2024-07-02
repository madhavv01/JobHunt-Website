import React, { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import { ref, remove } from "firebase/database";
import { database } from "../../../firebase.config";
import "./vp.css";

const ViewPostCard = ({ post }) => {
  const {
    _id,
    postName,
    companyName,
    numberOfVacancy,
    currentDate,
    lastApplyDate,
    jobDescription,
    jobRequirements,
    howToApply,
  } = post;
  const { user } = useContext(AuthContext);

  const handleDelete = (post) => {
    const deletePost = window.confirm(
      `Are you sure?`
    );
    if (deletePost) {
      remove(ref(database, "/jobs/" + post._id));
      window.location.reload();
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
        <button className="apply-btn" onClick={() => alert("Applied Scuessfully")}>
          Apply
        </button>
        {user?.admin && (
          <button className="delete-btn" onClick={() => handleDelete(post)}>
            Delete
          </button>
        )}
      </div>
    
  );
};

export default ViewPostCard;
