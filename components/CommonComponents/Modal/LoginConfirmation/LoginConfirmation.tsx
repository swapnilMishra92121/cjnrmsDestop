"use client";
import React from "react";
import { LoginConfirmationIProps } from "./LoginConfirmationIState";
import "./LoginConfirmation.css";

export const LoginConfirmation: React.FC<LoginConfirmationIProps> = ({
  onClose,
  onLogin,
}) => {
  return (
    <div className="loginConfirmation_container">
      <div>
        <div className="modal-content">
          <p className="modal-message">
            Welcome to Citation App!
          </p>
          <p className="modal-message-content">
            To get started, you'll need to log in to your account.
          </p>
          <p className="modal-message-content-description">
            Click the button below to open the login page in your browser.
          </p>

          <div className="modal-actions modal-actions-login-btn">
            <div></div>
            <button className="modal-button-confirm" onClick={onLogin} style={{ cursor: "pointer" }}>
              Login
            </button>
            <div></div>
          </div>
        </div>
      </div>
      <p className="notes_container">
        <strong>Note:</strong> After logging in, click the link on the browser page to return to the app.
      </p>
    </div>
  );
};
