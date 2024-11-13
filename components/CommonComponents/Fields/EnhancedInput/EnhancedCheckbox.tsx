"use client";

import React, { FC } from "react";
import { useField } from "formik";
import Checkbox, { CheckboxProps } from "antd/lib/checkbox/Checkbox";

export type EnhancedCheckboxProps = CheckboxProps & {
  name: string;
};

const EnhancedCheckbox: FC<EnhancedCheckboxProps> = ({ name, ...rest }) => {
  const { value, ...fieldProps } = useField(name)[0];

  return <Checkbox checked={value} {...fieldProps} {...rest} />;
};

export default EnhancedCheckbox;
