import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import { DateBoxComponentsIProps } from './DateBoxComponentsIProps';
import dayjs from 'dayjs';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const DateMonthComponents: React.FC<DateBoxComponentsIProps> = ({
    fieldName,
  value,
  onValueChange,
  disabled,
}) => (
  <Space direction="vertical">
      <p>{fieldName}</p>
    <DatePicker  format={{
              format: "MM-YYYY",
              type: "mask",
            }}  picker="month" value={value ? dayjs(value, "MM-YYYY") : null}
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
  </Space>
);

export default DateMonthComponents;