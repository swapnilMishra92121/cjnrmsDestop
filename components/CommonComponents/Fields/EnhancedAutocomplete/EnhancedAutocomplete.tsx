import React, { FC } from "react";
import { AutoComplete, AutoCompleteProps } from "antd/lib";
import styled from "styled-components";
import { useFormikContext } from "formik";
import { DefaultOptionType } from "antd/es/select";

export type EnhancedAutocompleteProps = AutoCompleteProps & {
  options: DefaultOptionType[];
  name: string;
  label?: string;
  width?: string;
};

const StylizedContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const EnhancedAutocomplete: FC<EnhancedAutocompleteProps> = ({
  options,
  width,
  label,
  name,
  style,
  ...rest
}) => {
  const { values, handleChange, ...formikProps } = useFormikContext();

  const targetval = options.filter((item) => {
    return (
      (item.value as string).toLowerCase() ===
      ((values as Record<string, any>)[name] as string).toLowerCase()
    );
  });

  return (
    <div style={{ width: width ? width : "100%" }}>
      {!!label && <p style={{ whiteSpace: "nowrap" }}>{label}</p>}

      <StylizedContainer>
        <AutoComplete
          options={options}
          value={
            targetval.length > 0
              ? targetval[0].label
              : (values as Record<string, any>)[name]
          }
          onChange={(value) => handleChange({ target: { name, value } })}
          style={{ width: "100%", ...style }}
          {...formikProps}
          {...rest}
        />
      </StylizedContainer>
    </div>
  );
};

export default EnhancedAutocomplete;
