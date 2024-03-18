import React, { useState } from "react";
import { loginUser } from "../services/auth.service";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await loginUser(username, password);
    if (userData.message) {
      alert(userData.message);
    }
    console.log(userData);
  };

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Auth;
