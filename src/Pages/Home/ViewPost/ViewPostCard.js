import React, { useState, useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import { ref, remove, update, push } from "firebase/database";
import { database, storage } from "../../../firebase.config";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
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
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState(post);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeURL, setResumeURL] = useState(null);

  const handleDelete = (post) => {
    const deletePost = window.confirm("Are you sure?");
    if (deletePost) {
      remove(ref(database, "/jobs/" + post._id));
      window.location.reload();
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleEditSubmit = () => {
    update(ref(database, "/jobs/" + editedPost._id), editedPost);
    setIsEditing(false);
    window.location.reload();
  };

  const handleApply = () => {
    const applicationData = {
      jobId: _id,
      userId: user.uid,
      appliedAt: new Date().toISOString(),
      resumeURL: resumeURL,
    };
    push(ref(database, "/applications"), applicationData)
      .then(() => {
        alert("Applied successfully");
      })
      .catch((error) => {
        console.error("Error applying for job: ", error);
      });
  };

  const handleResumeUpload = () => {
    if (resumeFile) {
      const storage = getStorage();
      const storageReference = storageRef(storage, `resumes/${uuidv4()}_${resumeFile.name}`);
      uploadBytes(storageReference, resumeFile)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((url) => {
          setResumeURL(url);
          alert("Resume uploaded successfully");
        })
        .catch((error) => {
          console.error("Error uploading resume: ", error);
          alert("Failed to upload resume. Please try again.");
        });
    } else {
      alert("Please select a resume file to upload.");
    }
  };
  
  return (
    <div className="post-card">
      <h2 className="post-title">{postName}</h2>
      <p className="post-details">
        Company Name: {companyName}
        <br />
        Number of Vacancy: {numberOfVacancy}
      </p>
      <p className="post-dates">
        Job Posted Date: {currentDate}
        <br />
        Last Apply Date: {lastApplyDate}
      </p>
      <p className="post-description">Job Description: {jobDescription}</p>
      <p className="post-requirements">Job Requirements: {jobRequirements}</p>
      <p className="post-apply">How to Apply: {howToApply}</p>

      {isEditing ? (
        <div className="edit-modal">
          <h2>Edit Post</h2>
          <form>
            <label>
              Post Name:
              <input
                type="text"
                name="postName"
                value={editedPost.postName}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Company Name:
              <input
                type="text"
                name="companyName"
                value={editedPost.companyName}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Number of Vacancy:
              <input
                type="text"
                name="numberOfVacancy"
                value={editedPost.numberOfVacancy}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Job Description:
              <textarea
                name="jobDescription"
                value={editedPost.jobDescription}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Job Requirements:
              <textarea
                name="jobRequirements"
                value={editedPost.jobRequirements}
                onChange={handleEditChange}
              />
            </label>
            <label>
              How to Apply:
              <textarea
                name="howToApply"
                value={editedPost.howToApply}
                onChange={handleEditChange}
              />
            </label>
            <button type="button" className="save-btn" onClick={handleEditSubmit}>
              Save
            </button>
            <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        </div>
      ) : user?.admin ? (
        <div>
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className="delete-btn" onClick={() => handleDelete(post)}>
            Delete
          </button>
          {resumeURL && (
            <p className="resume-link">
              <a href={resumeURL} target="_blank" rel="noopener noreferrer">
                View Resume
              </a>
            </p>
          )}
        </div>
      ) : (
        <div>
          <label>Upload Resume:</label>
          <input
            type="file"
            onChange={(e) => setResumeFile(e.target.files[0])}
            className="resume-upload-btn"
          />
          
          <button className="apply-btn" onClick={handleApply}>
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewPostCard;
