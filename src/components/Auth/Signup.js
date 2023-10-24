import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context";

import "../../styles/Signup.css";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth(); // Use the signup function from AuthProvider

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Call the signup function from AuthProvider
      const user = await signup({
        firstName,
        lastName,
        email,
        password,
      });

      // If signup is successful, redirect to a success page or login page
      if (user) {
        navigate("/"); // Redirect to the login page
      }
    } catch (err) {
      setError("Error creating an account. Please try again.");
    }
  };
  return (
    <div className="signup-container">
      <div className="signup">
        <h2 className="signup-heading">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="signup-button-container">
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </div>

          <span className="login-link">
            Already have an account{" "}
            <Link to="/login" className="login-anchor">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
