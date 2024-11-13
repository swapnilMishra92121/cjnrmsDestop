export interface SubmitIProps {
  onSave?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  saveColor?: string;
  cancelColor?: string;
  saveLabel?: string;
  cancelLabel?: string;
  disabled?: boolean;
}
