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
          Welcome to the CJNRMS <br />
          Access your projects, journals, and resources all in one place.
          Login to CJNRMS to Continue.
          </p>
          <div className="modal-actions">
            <button className="modal-button-confirm" onClick={onLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
