"use client";

import React, { FC } from "react";
import { useField } from "formik";
import Radio, { RadioProps } from "antd/lib/radio";

export type EnhancedRadioProps = RadioProps & {
  name: string;
};

const EnhancedRadio: FC<EnhancedRadioProps> = ({ name, ...rest }) => {
  const { value, ...fieldProps } = useField(name)[0];

  return <Radio checked={value} {...fieldProps} {...rest} />;
};

export default EnhancedRadio;
