import React, { useContext } from "react";
import "./h.css";
import logo from "../../../logo/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider";

const Header = () => {
  const { user, logOutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logOutUser().then(() => {
      alert("User Logged Out");
    });
  };

  return (
    <div className="header">
      <Link to="/" className="logo-container">
        <img src={logo} alt="JobHunt Logo" className="logo" />
      </Link>
      <Link to="/view-post" className="job-hunt">JobHunt</Link>
      <div className="nav-links">
        
        {user ? (
          <div>
            {user.admin && (
              <Link to="/create-post" className="header-link">Create Post</Link>
            )}
            <Link to="/view-post" className="header-link">View Posts</Link>
            <button onClick={handleLogout} className="header-button">Sign Out</button>
          </div>
          
        ) : (
          <Link to="/login" className="header-link">Sign In</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
