import { ButtonComponentsIProps } from "./ButtonComponentsIProps";
import "./ButtonComponents.css";
import Image from "next/image";

export const ButtonComponents: React.FC<ButtonComponentsIProps> = ({
  handleClick,
  icon,
  name,
  showBackgroundColor,
  disabled = false,
  color,
  textColor = "black",
  borderColor = "#cccccc",
  iconStyle,
}) => {
  return (
    <>
      <button
        style={{
          backgroundColor: showBackgroundColor ? color || "#3b72b1" : "",
          color: textColor,
          border: `1px solid ${borderColor}`,
          padding: "15px",
          
        }}
        className="button"
        onClick={() => handleClick && handleClick("1")}
        disabled={disabled}
      >
        <p>{name}</p>
        {icon && <Image  style={iconStyle} src={icon} alt="icon" height={17} width={17}/>}
      </button>
    </>
  );
};
