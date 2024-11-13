import { Select } from "antd"
import React  from "react";
import { MultiDropdownComponentIProps } from "./MultiDropdownComponentIProps";

export const MultiDropdownComponent: React.FC<MultiDropdownComponentIProps> = ({
  fieldName,
  dataSource,
  disabled,
  value,
  handleRowClick,
  validation,
  allowclear = true,
  width,
}) => {
  const handleChange = (selectedValue: string[]) => {
    if (handleRowClick) {
      handleRowClick(selectedValue);
    }
  };

  return (
    <>
      <div style={{ width: width ? width : "100%" }}>
        <p style={{ whiteSpace: "nowrap" }}>{fieldName}</p>
        <div>
          <Select
            mode="multiple"
            size={"middle"}
            placeholder="Please select"
            value={dataSource.length ? value : null}
            onChange={handleChange}
            showSearch
            allowClear={allowclear}
            optionFilterProp="label"
            style={{
              width: "100%",
              border: validation ? "1px solid red" : "",
            }}
            disabled={disabled}
            options={dataSource.map((item) => {
              return {
                value: item.id,
                label: item.value,
              };
            })}
          />
        </div>
      </div>
    </>
  );
};
