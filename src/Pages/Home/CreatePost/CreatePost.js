import React, { useState } from "react";
import './cp.css';
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [createdPost, setCreatedPost] = useState({});
  const navigate = useNavigate();

  const current = new Date();
  const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPost = Object.fromEntries(formData.entries());
    newPost.currentDate = date;

    setCreatedPost(newPost);
    console.log(newPost);

    fetch("https://job-portal-weld.vercel.app/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          alert("Post Created Successfully!");
        }
        navigate("/view-post", { replace: true });
      });

    e.target.reset();
  };

  return (
    <div className="create-post-container">
      <h2>Create Job Post</h2>
      <form onSubmit={handleSubmit} className="create-post-form">
        <label>
          Post Name :
          <input type="text" name="postName" required placeholder="Enter Post"/>
        </label>
        <label>
          Company Name  :
          <input type="text" name="companyName" required placeholder="Enter Company" />
        </label>
        <label>
          Number of Vacancy :
          <input type="text" name="numberOfVacancy" required placeholder="Enter Number of Vacancy"/>
        </label>
        <label>
          Current Date  :
          <input type="date" name="currentDate" required />
        </label>
        <label>
          Last Apply Date :
          <input type="date" name="lastApplyDate" required />
        </label>
        <label>
          Job Description :
          <textarea name="jobDescription" required rows="4" placeholder="Enter Job Description"></textarea>
        </label>
        <label>
          Job Requirements :
          <textarea name="jobRequirements" required rows="4" placeholder="Enter Job Requirements"></textarea>
        </label>
        <label>
          How to Apply  :
          <textarea name="howToApply" required rows="4" placeholder="Enter How to Apply"></textarea>
        </label>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
