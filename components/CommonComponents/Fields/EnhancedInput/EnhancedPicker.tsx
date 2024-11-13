import React, { FC, useState } from "react";
import Flex from "antd/lib/flex";
import DatePicker, { DatePickerProps } from "antd/lib/date-picker";
import TimePicker, { TimePickerProps } from "antd/lib/time-picker";
import { useFormikContext } from "formik";
import dayjs from "dayjs";
import styled from "styled-components";

type PickerType = "time" | "date";
const dateFormat = "MM-DD-YYYY";

const StylizedLabel = styled.label`
  whitespace: nowrap;
  font-size: 14px;
  font-weight: 600;
  color: #778891;
`;

export type EnhancedPickerProps = (TimePickerProps | DatePickerProps) & {
  type: PickerType;
  name: string;
  label?: string;
  customPickerStyle?: React.CSSProperties;
};

const EnhancedPicker: FC<EnhancedPickerProps> = ({
  type = "date",
  name,
  label,
  disabled,
  customPickerStyle,
}) => {
  const { values, handleChange, ...rest } = useFormikContext();

  const val = (values as Record<string, any>)[name];
  const props = {
    name,
    onChange: (e: any) => handleChange({ target: { name, value: e } }),
    style: customPickerStyle,
    ...rest,
  };

  return (
    <Flex gap="small" vertical>
      <StylizedLabel htmlFor={name}>{label}</StylizedLabel>

      {type === "time" && (
        <TimePicker value={val} disabled={disabled} {...props} />
      )}
      {type === "date" && (
        <DatePicker
          format={{
            format: dateFormat,
            type: "mask",
          }}
          value={val ? dayjs(val, dateFormat) : null}
          disabled={disabled}
          {...props}
        />
      )}
    </Flex>
  );
};

export default EnhancedPicker;
