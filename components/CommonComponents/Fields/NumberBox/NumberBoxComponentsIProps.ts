export interface NumberBoxComponentsIProps {
    fieldName: string,
    value?: number,
    onValueChange?: (data: number) => void,
    disabled?:boolean,
    validation?:boolean
}