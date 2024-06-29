import React, { useState } from "react";
import './up.css';
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdatePost = () => {
  const [updatedPost, setUpdatedPost] = useState({});
  const loadPost = useLoaderData();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPost = Object.fromEntries(formData.entries());
    
    setUpdatedPost(newPost);
    console.log(newPost);

    fetch(`https://job-portal-weld.vercel.app/updatePost/${loadPost._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        if (data.acknowledged) {
            alert("Post Updated Successfully!");
            navigate("/view-post", { replace: true });
        }
    });
  };

  return (
    <div className="update-post-container">
      <h2>Update Job Post</h2>
      <form onSubmit={handleSubmit} className="update-post-form">
        <label>
          Post Name:
          <input type="text" name="postName" defaultValue={loadPost.postName} required />
        </label>
        <label>
          Company Name:
          <input type="text" name="companyName" defaultValue={loadPost.companyName} required />
        </label>
        <label>
          Number of Vacancy:
          <input type="text" name="numberOfVacancy" defaultValue={loadPost.numberOfVacancy} required />
        </label>
        <label>
          Post Created Date:
          <input type="date" name="currentDate" defaultValue={loadPost.currentDate} required />
        </label>
        <label>
          Last Apply Date:
          <input type="date" name="lastApplyDate" defaultValue={loadPost.lastApplyDate} required />
        </label>
        <label>
          Job Description:
          <textarea name="jobDescription" defaultValue={loadPost.jobDescription} required rows="4"></textarea>
        </label>
        <label>
          Job Requirements:
          <textarea name="jobRequirements" defaultValue={loadPost.jobRequirements} required rows="4"></textarea>
        </label>
        <label>
          How to Apply:
          <textarea name="howToApply" defaultValue={loadPost.howToApply} required rows="4"></textarea>
        </label>
        <button type="submit" className="update-button">Update Post</button>
      </form>
    </div>
  );
};

export default UpdatePost;
