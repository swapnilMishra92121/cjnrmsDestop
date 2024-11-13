'use client'
import React  from "react";
import { DatePicker } from "antd";
import { DateBoxComponentsIProps } from "./DateBoxComponentsIProps";
import dayjs from "dayjs";

export const DateDisableComponents: React.FC<DateBoxComponentsIProps> = ({
  fieldName,
  value,
  onValueChange,
  disabled,
  validation,
  disabledDates, // Function that returns a boolean
}) => {
  return (
    <>
      <div style={{ width: "100%" }}>
        <p>{fieldName}</p>
        <div>
          <DatePicker
            format="MM-DD-YYYY"
            disabledDate={disabledDates} // Correctly pass the function here
            value={value ? dayjs(value, "MM-DD-YYYY") : null}
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
