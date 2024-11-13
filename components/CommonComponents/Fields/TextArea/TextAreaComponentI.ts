export interface TextAreaComponentIProps {
    onChangeValue?: (data: string) => void;
    value: string;
    placeholder?: string;
    fieldName?: string;
    disabled?: boolean;
    validation?:boolean
    maxLength?:number
}