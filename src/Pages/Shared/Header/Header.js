import React, { useContext } from 'react';
import './h.css';
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
      <Link to="/" className="header-logo">
        <img src={logo} alt="JobHunt Logo" />
      </Link>
      <nav className="header-nav">
        <Link to="login" className="header-title">JobHunt</Link>
        {user ? (
          <>
            <Link to="/create-post" className="header-link">Create Job Post</Link>
            <Link to="/view-post" className="header-link">View Job Posts</Link>
            <button onClick={handleLogout} className="header-button">Logout</button>
          </>
        ) : (
          <Link to="/login" className="header-link">Login</Link>
        )}
      </nav>
    </div>
  );
};

export default Header;
