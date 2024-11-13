interface DisplayData {
  value: string;
  id: string;
}

export interface FieldDefinition {
  name: string;
  type: string;
  dataSource?: DisplayData[];
}
export interface MultiDropdownComponentIProps {
  fieldName: string;
  dataSource: DisplayData[];
  disabled?: boolean;
  value?: string[];
  handleRowClick?: (value: string[]) => void;
  allowclear?: boolean;
  validation?: boolean;
  width?: string;
}

export interface SetoptionsIState {
  value?: string;
  label?: string;
}
