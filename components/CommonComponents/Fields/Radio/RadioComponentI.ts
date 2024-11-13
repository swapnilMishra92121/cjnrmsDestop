export interface RadioComponentIProps {
  value: number;
  disabled?:boolean
  onChangeValue?: (data: number) => void;
  RadioTextList?: string[];
  direction?: "row" | "column";
}
