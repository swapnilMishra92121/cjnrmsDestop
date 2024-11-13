export interface AutoCompleteComponentsIRes {
  fieldName: string;
  dataSource: {
    value: string;
  }[];
  disabled?: boolean;
  value?: string;
  onChangeValue?: (data: string) => void;
  validation?: boolean;
  width?: string;
}
