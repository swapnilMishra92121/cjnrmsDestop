import { MaskedInputComponentIIProps } from "./MaskedInputComponentI";
import "./MaskedInputComponent.css";
import { MaskedInput, createDefaultMaskGenerator } from "react-hook-mask"
import {  useState } from "react";

export const MaskedInputComponent: React.FC<MaskedInputComponentIIProps> = ({
  fieldName,
  value,
  onChangeValue,
  placeholder,
  disabled,
  validation,
  mask,
}) => {
  const maskGenerator = createDefaultMaskGenerator(mask);
  const [stopInitialRender, setstopInitialRender] = useState<boolean>(false);

  return (
    <>
      <div style={{ width: "100%" }}>
        <p>{fieldName}</p>
        <div>
          <MaskedInput
            className="MaskedInput"
            maskGenerator={maskGenerator}
            disabled={disabled}
            style={{ border: validation ? "1px solid red" : "" }}
            placeholder={mask}
            value={value}
            onChange={(e) => {
              if (onChangeValue && stopInitialRender) {
                onChangeValue(e);
              }
              setstopInitialRender(true);
            }}
          />
        </div>
      </div>
    </>
  );
};
