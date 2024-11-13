'use client'
import React  from "react";
import { DatePicker } from "antd";
import { DateBoxComponentsIProps } from "../DateBox/DateBoxComponentsIProps";
import dayjs from "dayjs";

export const DateMonthBoxComponents: React.FC<DateBoxComponentsIProps> = ({
  fieldName,
  value,
  onValueChange,
  disabled,
  validation,
}) => {
  return (
    <>
      <div style={{ width: "100%" }}>
        <p>{fieldName}</p>
        <div>
          <DatePicker
            picker="month" // This sets the picker to month and year only
            format="MM/YY" // Date format as MM/YY
            value={value ? dayjs(value, "MM/YY") : null}
            disabled={disabled}
            style={{ width: "100%", border: validation ? "1px solid red" : "" }}
            onChange={(date, dateString) => {
              if (onValueChange) {
                if (dateString && typeof dateString === "string") {
                  onValueChange(dateString);
                } else {
                  onValueChange(null);
                }
              }
            }}
          />
        </div>
      </div>
    </>
  );
};
