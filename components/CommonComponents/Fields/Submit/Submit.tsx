"use client";
import React from "react";
import "./Submit.css";
import { SubmitIProps } from "./SubmitIProps";

export const Submit: React.FC<SubmitIProps> = ({
  onSave,
  onCancel,
  saveColor,
  cancelColor,
  saveLabel = "Save",
  cancelLabel = "Cancel",
  disabled = false,
}) => {
  return (
    <div className="Submit">
      {onCancel && (
        <button
          onClick={onCancel}
          className="cancel"
          style={{ backgroundColor: cancelColor }}
        >
          {cancelLabel}
        </button>
      )}
      {onSave && (
        <button
          className="save"
          onClick={onSave}
          style={{
            backgroundColor: !disabled ? saveColor : undefined,
            padding: "11px",
          }}
          disabled={disabled}
        >
          {saveLabel}
        </button>
      )}
    </div>
  );
};
