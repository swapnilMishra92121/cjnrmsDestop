import { Radio } from "antd";
import { RadioComponentIProps } from "./RadioComponentI";
import { RadioChangeEvent } from "antd";

export const RadioComponent: React.FC<RadioComponentIProps> = ({
  value,
  RadioTextList,
  onChangeValue,
  direction = "row",
  disabled = false,
}) => {
  const onChange = (e: RadioChangeEvent) => {
    if (onChangeValue) {
      onChangeValue(e.target.value);
    }
  };

  return (
    <>
      <Radio.Group disabled={disabled} onChange={onChange} value={value}>
        <div style={{ display: "flex", flexDirection: direction }}>
          {RadioTextList?.map((RadioTextListval, index) => {
            return (
              <>
                <Radio value={index + 1}>{RadioTextListval}</Radio>
              </>
            );
          })}
        </div>
      </Radio.Group>
    </>
  );
};
