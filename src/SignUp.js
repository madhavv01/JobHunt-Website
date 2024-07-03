import React, { useContext, useState } from "react";
import "./signup.css";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    createUser(email, password, isAdmin)
      .then((result) => {
        console.log(result);
        if (result.user) {
          alert("User Created Successfully");
          if (isAdmin) {
            navigate("/login", { replace: true });
          } else {
            navigate("/view-post", { replace: true });
          }
        }
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  };
  
  return (
    <div className="signup-container">
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Enter your name"
          />
          
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone"
            required
            placeholder="Enter your phone number"
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            required
            placeholder="Enter your address"
          />
        </div>
        <div className="form-group">
          <label>Email Address:</label>
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            autoFocus
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            required
            placeholder="Enter your password"
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
            />
            Admin
          </label>
        </div>
        <button type="submit" className="submit-button">
          Create Account
        </button>
        <div className="login-link">
          <Link to="/login">Already have an account? <br></br>Sign In</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
