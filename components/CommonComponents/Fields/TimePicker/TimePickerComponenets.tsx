'use client'
import React  from "react";
import { TimePicker } from "antd";
import { TimePickerComponenetsIProps } from "./TimePickerComponenetsI";
import dayjs from "dayjs";

export const TimePickerComponenets: React.FC<TimePickerComponenetsIProps> = ({
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
          <TimePicker
            value={value ? dayjs(value, "HH:mm:ss") : null}
            format={{
              format: "HH:mm:ss",
              type: "mask",
            }}
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
