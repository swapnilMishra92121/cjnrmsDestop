"use client";
import { Select } from "antd";
import React from "react";
import { DropdownComponentIProps } from "./DropdownComponentIProps";

export const DropdownComponent: React.FC<DropdownComponentIProps> = ({
  fieldName,
  dataSource,
  disabled,
  value,
  handleRowClick,
  validation,
  allowclear = true,
  width,
  showTooltip = true,
}) => {
  const handleChange = (selectedValue = "") => {
    const selectedOption = dataSource.find((item) => item.id === selectedValue);

    if (handleRowClick) {
      handleRowClick(selectedValue, selectedOption?.value);
    }
  };

  return (
    <>
      <div style={{ width: width ? width : "100%" }}>
        <p style={{ whiteSpace: "nowrap" }}>{fieldName}</p>
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <Select
            onChange={handleChange}
            options={dataSource?.map((item) => ({
              value: item?.id,
              label: item?.value,
              title: showTooltip ? item.value : "",
            }))}
            showSearch
            allowClear={allowclear}
            optionFilterProp="label"
            disabled={disabled}
            style={{
              width: "100%",
              border: validation ? "1px solid red" : "",
            }}
            value={dataSource?.length ? value : null}
            className="custom-select-clear"
          />
        </div>
      </div>
    </>
  );
};

// Usage example
