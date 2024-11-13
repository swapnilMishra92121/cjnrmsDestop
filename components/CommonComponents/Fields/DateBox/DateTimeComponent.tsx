'use client';
import React from "react";
import { DatePicker } from "antd";
import { DateBoxComponentsIProps } from "./DateBoxComponentsIProps";
import dayjs from "dayjs";

export const DateTimeComponent: React.FC<DateBoxComponentsIProps> = ({
  fieldName,
  value,
  onValueChange,
  disabled,
  validation,
  disabledDate
}) => {
  return (
    <div style={{ width: "100%" }}>
      <p>{fieldName}</p>
      <div>
        <DatePicker
          format="YYYY-MM-DD HH:mm" 
          showTime 
          disabledDate={(current) => {
            if (disabledDate) {
              return current && current > dayjs().endOf('day');
            }
            return false;
          }}
        
          value={value ? dayjs(value) : null} 
          disabled={disabled}
          style={{ width: "100%", border: validation ? "1px solid red" : "" }}
        onChange={(date) => {
            if (onValueChange) {
              const formattedDate = date ? date.format("YYYY-MM-DDTHH:mm:ss") : null;
              onValueChange(formattedDate); 
            }
          }}
          
        />
      </div>
    </div>
  );
};
