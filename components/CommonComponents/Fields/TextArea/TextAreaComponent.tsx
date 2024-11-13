'use client';
import React, { useState, useEffect } from "react";
import { Input } from 'antd';
import { TextAreaComponentIProps } from "./TextAreaComponentI";

export const TextAreaComponent: React.FC<TextAreaComponentIProps> = ({
  fieldName,
  value,
  onChangeValue,
  placeholder,
  disabled,
  validation,
  maxLength 
}) => {
  const { TextArea } = Input;
  const [textLength, setTextLength] = useState(value?.length || 0); 

  useEffect(() => {
    setTextLength(value?.length || 0);
  }, [value]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setTextLength(newValue.length); 
    if (onChangeValue) {
      onChangeValue(newValue); 
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <p>{fieldName}</p>
      <div>
        <TextArea
          disabled={disabled}
          placeholder={placeholder}
          style={{ border: validation ? "1px solid red" : "" }}
          value={value}
          rows={4}
          maxLength={maxLength} 
          onChange={handleTextChange}
        />
        {value && (
          <div style={{ marginTop: "10px" }}>
            {value?.length} / {maxLength} characters
          </div>
        )}
      </div>
    </div>
  );
};
