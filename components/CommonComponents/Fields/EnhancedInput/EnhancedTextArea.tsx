import React, { ChangeEvent, FC } from "react";
import { useFormikContext } from "formik";
import styled from "styled-components";
import { Input } from "antd";
import Flex from "antd/lib/flex";

export type EnhancedTextAreaProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  onChangeHandler?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

const StylizedContainer = styled.div`
  width: 100%;
`;

const StylizedLabel = styled.p`
  whitespace: nowrap;
  word-wrap: break-word;
  font-size: 14px;
  font-weight: 600;
  color: #778891;
`;

const EnhancedTextArea: FC<EnhancedTextAreaProps> = ({
  label,
  name,
  disabled = false,
  placeholder,
  onChangeHandler,
}) => {
  const { values, handleChange, handleBlur, ...formikProps } =
    useFormikContext();

  const props = {
    name,
    rows: 4,
    value: (values as Record<string, any>)[name],
    disabled,
    placeholder,
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => {
      handleChange(e);
      onChangeHandler?.(e);
    },
    ...formikProps,
  };

  return (
    <StylizedContainer>
      <Flex gap="small" vertical>
        {!!label && <StylizedLabel>{label}</StylizedLabel>}
        <Input.TextArea variant="outlined" {...props} />
      </Flex>
    </StylizedContainer>
  );
};

export default EnhancedTextArea;
