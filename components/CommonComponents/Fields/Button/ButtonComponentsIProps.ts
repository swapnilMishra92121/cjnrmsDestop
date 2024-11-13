import { CSSProperties } from "react";

export interface ButtonComponentsIProps {
  handleClick?: (id?: string) => void;
  icon?: string;
  name: string;
  showBackgroundColor?: boolean;
  disabled?: boolean;
  color?:string;
  textColor?:string;
  borderColor?:string;
  iconStyle?:CSSProperties;
}
