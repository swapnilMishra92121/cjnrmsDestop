import dayjs from "dayjs";

export interface DateBoxComponentsIProps {
  fieldName: string;
  value?: string | null;
  onValueChange?: (data: string | null) => void;
  disabled?: boolean;
  validation?: boolean;
  disabledDate?:boolean
  disabledDates?: (currentDate: dayjs.Dayjs) => boolean

}
