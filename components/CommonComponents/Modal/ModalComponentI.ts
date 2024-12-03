import { CSSProperties, ReactNode } from "react";

export interface ModalComponentIProps {
  open: boolean;
  innerContant?: ReactNode;
  title?: string | ReactNode;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  closeIconStyle?: CSSProperties;
  onClose?: () => void;
}
