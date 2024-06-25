import React, { useState } from "react";
import "./style1.css";
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

    alert("Post Updated Successfully!");
    navigate("/view-post", { replace: true });
  };

  return (
    <div className="update-post-container">
      <h3 className="heading">Update Job Post</h3>
      <form onSubmit={handleSubmit} className="update-form">
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
          <textarea name="jobDescription" defaultValue={loadPost.jobDescription} rows="4" required></textarea>
        </label>
        <label>
          Job Requirements:
          <textarea name="jobRequirements" defaultValue={loadPost.jobRequirements} rows="4" required></textarea>
        </label>
        <label>
          Job Benefits:
          <textarea name="jobBenefits" defaultValue={loadPost.jobBenefits} rows="4" required></textarea>
        </label>
        <label>
          How to Apply:
          <textarea name="howToApply" defaultValue={loadPost.howToApply} rows="4" required></textarea>
        </label>
        <button type="submit" className="submit-button">Update Post</button>
      </form>
    </div>
  );
};

export default UpdatePost;
