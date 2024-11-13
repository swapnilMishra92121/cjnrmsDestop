"use client";
import React, { useState } from "react";
import { Input } from "antd";
import styled from "styled-components";
import { TextBoxComponentIProps } from "./TextBoxComponentIProps";

const StyledInputContainer = styled.div<{ $width?: string }>`
  ${({ $width }) => `width: ${$width ?? "100%"};`}
`;

export const TextBoxComponent: React.FC<TextBoxComponentIProps> = ({
  fieldName,
  value,
  onChangeValue,
  placeholder,
  disabled,
  validation,
  onlyUppercase,
  width,
}) => (
  <StyledInputContainer $width={width}>
    {fieldName && <p style={{ whiteSpace: "nowrap" }}>{fieldName}</p>}
    <div>
      <Input
        disabled={disabled}
        style={{
          border: validation ? "1px solid red" : "1px solid #CCCCCC",
        }}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          if (onChangeValue) {
            if (onlyUppercase) {
              onChangeValue(e.target.value.toUpperCase());
            } else {
              onChangeValue(e.target.value);
            }
          }
        }}
      />
    </div>
  </StyledInputContainer>
);
