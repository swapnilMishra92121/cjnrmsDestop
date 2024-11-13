export interface TextBoxComponentIProps {
  onChangeValue?: (data: string) => void;
  value: string;
  placeholder?: string;
  fieldName?: string;
  disabled?: boolean;
  validation?: boolean;
  onlyUppercase?: boolean;
  width?: string;
}
