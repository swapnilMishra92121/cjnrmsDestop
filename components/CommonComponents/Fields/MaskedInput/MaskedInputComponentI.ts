export interface MaskedInputComponentIIProps {
  onChangeValue?: (data: string) => void;
  value: string;
  mask: string;
  placeholder?: string;
  fieldName?: string;
  disabled?: boolean;
  validation?: boolean;
  onlyUppercase?: boolean;
}
