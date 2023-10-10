import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useHistory for navigation
import { authService } from "../../services"; // Import your authentication service

import "../../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Call your authentication service to perform the login
      const user = await authService.login(email, password);

      // If login is successful, redirect to a protected route (e.g., user dashboard)
      if (user) {
        navigate("/"); // Replace with your desired protected route
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="login-button">
            Login
          </button>
          <span className="signup-link">
            Don't have an account{" "}
            <Link to="/signup" className="signup-anchor">
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
