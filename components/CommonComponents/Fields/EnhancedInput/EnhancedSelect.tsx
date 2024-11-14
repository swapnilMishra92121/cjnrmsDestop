import React, { FC } from "react";
import { useFormikContext } from "formik";
import Select, { SelectProps } from "antd/lib/select";
import Flex from "antd/lib/flex";
import styled from "styled-components";

type ItemOption = { value: string; label: string };

export type EnhancedSelectProps = SelectProps & {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  showTooltip?: boolean;
  containerStyles?: React.CSSProperties;
};

const StylizedLabel = styled.label`
  whitespace: nowrap;
  font-size: 14px;
  font-weight: 600;
  color: #778891;
`;

const EnhancedSelect: FC<EnhancedSelectProps> = ({
  label,
  name,
  options,
  showSearch,
  allowClear,
  containerStyles,
  style,
  showTooltip = true,
  ...rest
}) => {
  const { values, setFieldValue } = useFormikContext();

  const ref = React.useRef(null);

  return (
    <Flex gap="small" vertical style={containerStyles}>
      <StylizedLabel htmlFor={name}>{label}</StylizedLabel>

      <Select
        ref={ref}
        options={options}
        value={(values as Record<string, any>)[name]}
        onChange={(value) => {
          setFieldValue(name, value);
        }}
        showSearch
        allowClear
        style={{ width: "100%", ...style }}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            const enterEvent = new KeyboardEvent("keydown", {
              key: "Enter",
              code: "Enter",
              keyCode: 13,
              bubbles: true,
            });

            e.target.dispatchEvent(enterEvent);

            if (ref.current) {
              (ref.current as any).blur();
            }
          }
        }}
        {...rest}
      />
    </Flex>
  );
};

export default EnhancedSelect;
