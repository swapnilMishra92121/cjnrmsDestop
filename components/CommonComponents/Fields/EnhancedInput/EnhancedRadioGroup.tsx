import React, { FC } from "react";
import Radio, { RadioGroupProps } from "antd/lib/radio";
import { useFormikContext } from "formik";
import Row from "antd/lib/row";
import Space from "antd/lib/space";
import Flex from "antd/lib/flex";
import styled from "styled-components";

export type RadioItem = {
  label: string;
  value: string;
};

export type EnhancedRadioGroupProps = {
  items: RadioItem[];
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

const EnhancedRadioGroup: FC<EnhancedRadioGroupProps> = ({
  items,
  name,
  dir = "row",
  containerStyles,
  label,
}) => {
  const { values, handleChange } = useFormikContext();

  const itemList = items.map((item) => (
    <Radio key={item.value} value={item.value}>
      {item.label}
    </Radio>
  ));

  return (
    <Flex gap="small" vertical style={containerStyles}>
      {!!label && <StylizedLabel htmlFor={name}>{label}</StylizedLabel>}

      <Radio.Group
        onChange={(e) =>
          handleChange({ target: { name, value: e.target.value } })
        }
        value={(values as Record<string, any>)[name]}
      >
        {dir === "row" && <Row justify="space-between">{itemList}</Row>}
        {dir === "col" && <Space direction="vertical">{itemList}</Space>}
      </Radio.Group>
    </Flex>
  );
};

export default EnhancedRadioGroup;
