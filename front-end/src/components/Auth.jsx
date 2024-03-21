import React, { useContext, useState } from "react";
import { loginUser, registerUser } from "../services/auth.service";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await loginUser(username, password);
    if (response.message) {
      alert(response.message);
    } else {
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await registerUser(username, password);
    if (response.message) {
      alert(response.message);
    } else {
      setUser(response.newUser);
      localStorage.setItem("user", JSON.stringify(response.newUser));
      navigate("/");
    }
  };

  if (isLogin)
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
          <button type="submit" className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </form>
        <div className="d-flex">
          <h2 className="mt-4 mx-4">Or sign up here:</h2>
          <button className="btn btn-outline-dark mt-4" onClick={() => setIsLogin(false)}>
            Sign Up
          </button>
        </div>
      </div>
    );

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
            autoComplete="on"
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
            autoComplete="on"
          />
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirm-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="on"
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSignUp}>
          Signup
        </button>
      </form>
      <div className="d-flex">
        <h2 className="mt-4 mx-4">Logging in? Click here:</h2>
        <button className="btn btn-outline-dark mt-4" onClick={() => setIsLogin(true)}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Auth;
