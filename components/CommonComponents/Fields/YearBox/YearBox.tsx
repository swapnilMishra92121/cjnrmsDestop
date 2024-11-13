import React from "react";
import { DatePicker } from "antd";
import { DateBoxComponentsIProps } from "../DateBox/DateBoxComponentsIProps";
import dayjs from "dayjs";

export const YearBoxComponents: React.FC<DateBoxComponentsIProps> = ({
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
            picker="year" // Set the picker to year selection mode
            format="YYYY"  // Ensure the format is just the year
            value={value ? dayjs(`${value}`, "YYYY") : null}  // Correctly parse the year
            disabled={disabled}
            style={{ width: "100%", border: validation ? "1px solid red" : "" }}
            onChange={(date, dateString) => {
              // Ensure onValueChange is defined and date is valid
              if (onValueChange) {
                if (date && date.isValid()) {
                  // Pass only the selected year (as string) to onValueChange
                  onValueChange(date.year().toString());
                } else {
                  onValueChange(null);  // Handle case where no valid year is selected
                }
              }
            }}
          />
        </div>
      </div>
    </>
  );
};
