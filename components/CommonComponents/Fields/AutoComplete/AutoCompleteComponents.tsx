import { AutoComplete } from "antd";
import { AutoCompleteComponentsIRes } from "./AutoCompleteComponentsIState";
export const AutoCompleteComponents: React.FC<AutoCompleteComponentsIRes> = ({
  dataSource,
  fieldName,
  onChangeValue,
  validation,
  value,
  width,
}) => {
  return (
    <>
      <div style={{ width: width ? width : "100%" }}>
        <p style={{ whiteSpace: "nowrap" }}>{fieldName}</p>
        <div>
          <AutoComplete
            popupClassName="certain-category-search-dropdown"
            value={value}
            style={{
              width: "100%",
              border: validation ? "1px solid red" : "",
            }}
            options={dataSource}
            className="custom-select-clear"
            onChange={(e) => {
              if (onChangeValue) {
                onChangeValue(e);
              }
            }}
          ></AutoComplete>
        </div>
      </div>
    </>
  );
};
