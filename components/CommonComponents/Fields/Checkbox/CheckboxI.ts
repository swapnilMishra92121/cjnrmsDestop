export interface CheckBoxComponentIProps {
  onChangeValue?: (data: boolean) => void;
  value: boolean;
  fieldName?: string;
  disabled?: boolean;
  colorCoding?: "red" | "blue" | "green";
}
