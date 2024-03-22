import React, { useState } from "react";
import { changePassword } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const navigate = useNavigate();

  const changePass = async (e) => {
    e.preventDefault();
    if (newPassword !== newPasswordConfirm) {
      alert("New passwords do not match");
      return;
    }

    const response = await changePassword(currentPassword, newPassword);
    if (response.message) {
      alert(response.message);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Change Your Password</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="current-password" className="form-label">
            Current Password
          </label>
          <input
            type="password"
            className="form-control"
            id="username"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="new-password" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm-new-password" className="form-label">
            Confirm New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirm-password"
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={changePass}>
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
