interface DisplayData {
  value: string;
  id: string;
}

export interface FieldDefinition {
  name: string;
  type: string;
  dataSource?: DisplayData[];
}
export interface DropdownComponentIProps {
  fieldName: string;
  dataSource: DisplayData[];
  disabled?: boolean;
  value?: string;
  handleRowClick?: (id: string, value?: string) => void;
  allowclear?: boolean;
  validation?: boolean;
  width?: string;
  showTooltip?: boolean;
}

export interface SetoptionsIState {
  value?: string;
  label?: string;
}

export interface DropdownAuditComponentIProps {
  fieldName: string;
  dataSource: DisplayData[];
  disabled?: boolean;
  value?: string;
  handleRowClick?: (id: string, label: string) => void;
  allowclear?: boolean;
  validation?: boolean;
  width?: string;
  showTooltip?: boolean;
  handleDetailRowClick?: (id: string, label: string) => void;
}
