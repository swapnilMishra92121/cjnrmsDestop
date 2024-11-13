import React, { FC } from "react";
import { useFormikContext } from "formik";
import styled from "styled-components";
import { Input, InputProps } from "antd";

export type InputPropsEnhanced = InputProps & {
  name: string;
  label?: string;
  width?: string;
};

const StylizedContainer = styled.div<{ $width?: string }>`
  ${({ $width }) => `width: ${$width ?? "100%"};`}
`;

const StylizedLabel = styled.label`
  word-wrap: break-word;
  font-size: 14px;
  font-weight: 600;
  color: #778891;
`;

const EnhancedTextInput: FC<InputPropsEnhanced> = ({
  label,
  name,
  width,
  ...rest
}) => {
  const { values, handleChange, handleBlur, ...formikProps } =
    useFormikContext();

  const props = {
    name,
    value: (values as Record<string, any>)[name],
    onChange: handleChange,
    ...formikProps,
    ...rest,
  };

  return (
    <StylizedContainer $width={width}>
      {!!label && <StylizedLabel>{label}</StylizedLabel>}

      <Input {...props} />
    </StylizedContainer>
  );
};

export default EnhancedTextInput;
