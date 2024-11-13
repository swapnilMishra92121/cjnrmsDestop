import { NumberBoxComponentsIProps } from "./NumberBoxComponentsIProps";
import { InputNumber } from "antd";
export const NumberBoxComponents: React.FC<NumberBoxComponentsIProps> = ({
  fieldName,
  value,
  onValueChange,
  disabled,
  validation,
}) => {
  return (
    <>
      <div style={{ width: "100%" }}>
        <p>{fieldName}</p>
        <div>
          <InputNumber
            style={{ width: "100%", border: validation ? "1px solid red" : "" }}
            min={0}
            
            value={value || null}
            disabled={disabled}
            onChange={(e) => {
              if (onValueChange) {
                onValueChange(Number(e));
              }
            }}
          />
        </div>
      </div>
    </>
  );
};
