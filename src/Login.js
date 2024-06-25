import React, { useContext } from "react";
import './l.css';
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    console.log({ email, password });

    signInUser(email, password)
      .then((result) => {
        console.log(result);
        const user = result.user;
        if (user) {
          alert('User Logged In Successfully');
        }

        const currentUser = { email: user.email };
        
        fetch('https://job-portal-weld.vercel.app/jwt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            localStorage.setItem('job-token', data.token);
            navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  };

  return (
    <div className="login-container">
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email Address:</label>
          <input type="email" name="email" required placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" required placeholder="Enter your password" />
        </div>
        <button type="submit" className="login-button">Sign In</button>
        <div className="signup-link">
          <Link to="/signup">
            <p>Don't have an account? Register</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
