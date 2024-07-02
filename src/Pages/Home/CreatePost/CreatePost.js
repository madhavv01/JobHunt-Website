import React, { useState } from "react";
import "./cp.css";
import { useNavigate } from "react-router-dom";
import { ref, set, push } from "firebase/database";
import { database } from "../../../firebase.config";

const CreatePost = () => {
  const [createdPost, setCreatedPost] = useState({});
  const navigate = useNavigate();

  const current = new Date();
  const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newPost = Object.fromEntries(formData.entries());
    setCreatedPost(newPost);
    console.log(newPost);
    const postListRef = ref(database, 'jobs');
    const newPostRef = push(postListRef);
    set(newPostRef, {
        ...newPost
    });
    alert("Post Created Successfully!");
    navigate("/view-post", { replace: true });

    e.target.reset();
  };

  return (
    <div className="create-post-container">
      <h2>Create Job Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Post Name  :</label>
          <input type="text" name="postName" required placeholder="Enter your post" />
        </div>
        <div className="form-group">
          <label>Company Name :</label>
          <input type="text" name="companyName" required placeholder="Enter your company name" />
        </div>
        <div className="form-group">
          <label>Number of Vacancy  :</label>
          <input type="text" name="numberOfVacancy" required placeholder="Enter number of vacancies" />
        </div>
        <div className="form-group">
          <label>Current Date :</label>
          <input type="date" name="currentDate" required />
        </div>
        <div className="form-group">
          <label>Last Apply Date  :</label>
          <input type="date" name="lastApplyDate" required />
        </div>
        <div className="form-group">
          <label>Job Description  :</label>
          <textarea name="jobDescription" required rows="4" placeholder="Enter job description"></textarea>
        </div>
        <div className="form-group">
          <label>Job Requirements :</label>
          <textarea name="jobRequirements" required rows="4" placeholder="Enter job requirements"></textarea>
        </div>
        <div className="form-group">
          <label>How to Apply :</label>
          <textarea name="howToApply" required rows="4" placeholder="Enter how to apply"></textarea>
        </div>
        <div className="form-group">
          <button type="submit">Create Post</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
