'use client'
import React  from "react";
import { Checkbox } from "antd";
import { CheckBoxComponentIProps } from "./CheckboxI";
import "./Checkbox.css";

export const CheckBoxComponent: React.FC<CheckBoxComponentIProps> = ({
  fieldName,
  value,
  onChangeValue,
  disabled,
  colorCoding,
}) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          width: "auto",
          marginBottom:"-0.2rem"
        }}
      >
        <div>
          <Checkbox
            className={
              colorCoding == "green"
                ? "green"
                : colorCoding == "red"
                ? "custom-checkbox unchecked"
                : ""
            }
            style={{ color: "red" }}
            disabled={disabled}
            checked={value}
            onChange={(e) => {
              if (onChangeValue) {
                onChangeValue(e.target.checked);
              }
            }}
          ></Checkbox>
        </div>{" "}
        {fieldName && <p style={{ whiteSpace: "nowrap" }}>{fieldName}</p>}
      </div>
    </>
  );
};
