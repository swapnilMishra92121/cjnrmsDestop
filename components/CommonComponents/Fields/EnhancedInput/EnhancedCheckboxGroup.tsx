import React, { FC } from "react";
import Checkbox from "antd/lib/checkbox/";
import styled from "styled-components";
import { useFormikContext } from "formik";
import Row from "antd/lib/row";
import Space from "antd/lib/space";
import Flex from "antd/lib/flex";

export type CheckboxItem = {
  label: string;
  value: string;
};

export type EnhancedCheckboxGroupProps = {
  items: CheckboxItem[];
  name: string;
  label?: string;
  dir?: "row" | "col";
  containerStyles?: React.CSSProperties;
};

const StylizedLabel = styled.label`
  whitespace: nowrap;
  font-size: 14px;
  font-weight: 600;
  color: #778891;
`;

const EnhancedCheckboxGroup: FC<EnhancedCheckboxGroupProps> = ({
  items,
  name,
  dir = "row",
  containerStyles,
  label,
}) => {
  const { values, handleChange } = useFormikContext();

  const itemList = items.map((item) => (
    <Checkbox key={item.value} value={item.value}>
      {item.label}
    </Checkbox>
  ));

  return (
    <Flex gap="small" vertical style={containerStyles}>
      {!!label && <StylizedLabel htmlFor={name}>{label}</StylizedLabel>}

      <Checkbox.Group
        onChange={(e: any[]) => {
          console.log("e = ", e);
          // const targetvalue = e.target;
          // handleChange({ target: { name, value: (e.target as any).checked } })
        }}
        value={(values as Record<string, any>)[name]}
      >
        {dir === "row" && <Row justify="space-between">{itemList}</Row>}
        {dir === "col" && <Space direction="vertical">{itemList}</Space>}
      </Checkbox.Group>
    </Flex>
  );
};

export default EnhancedCheckboxGroup;
