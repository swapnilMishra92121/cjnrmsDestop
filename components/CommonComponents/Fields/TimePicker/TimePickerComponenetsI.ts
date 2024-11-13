export interface TimePickerComponenetsIProps {
  fieldName: string;
  value?: string | null;
  onValueChange?: (data: string | null) => void;
  disabled?: boolean;
  validation?: boolean;
}
