'use client'
import React  from "react";
import { DatePicker } from "antd";
import { DateBoxComponentsIProps } from "./DateBoxComponentsIProps";
import dayjs from "dayjs";

export const DateBoxComponents: React.FC<DateBoxComponentsIProps> = ({
  fieldName,
  value,
  onValueChange,
  disabled,
  validation,
  disabledDate
}) => {
  return (
    <>
      <div style={{ width: "100%" }}>
        <p>{fieldName}</p>
        <div>
          <DatePicker

            format={{
              format: "MM-DD-YYYY",
              type: "mask",
            }}
            disabledDate={(current) => {
              if(disabledDate){

                return current && current > dayjs().endOf('day');
              }else{
                return false
              }
            }} 
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
