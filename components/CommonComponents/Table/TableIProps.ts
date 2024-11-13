export interface TableIProps {
  columnsValue: any[];
  columns: any[];
  showPagination?: boolean;
  setpageCount?: (pageCount: number) => void;
  setpageNumber?: (pageNumber: number) => void;
  tableTotalRecord?: number;
  onRowClicked?: (data: any) => void;
  setOrderByDescending?: (desc: boolean) => void;
  setOrderBy?: (orderBy: string) => void;
  OrderByDescending?: boolean;
  OrderBy?: string;
  clientSideSorting?: boolean;
  allowMultipleRowSelection?: boolean;
  selectRowCheckBox?: (
    data: {
      [key: string]: string | number | boolean | null;
    }[]
  ) => void;
  onCellValueChanged?: (data: {
    [key: string]: string | number | boolean | null;
  }) => void;
  defaultCheck?: boolean[];
  height?:string;
  cursorPointer?: boolean;
  headerBackgroundColor?: string;
  hideScrollbar?: boolean;
  pageNumber?: number;
  pageCount?: number;
}

export interface PaginationIProps {
  tableTotalRecord?: number;
  setpageCount?: (data: number) => void;
  setpageNumber?: (data: number) => void;
  pageNumber?: number;
  pageCount?: number;
}

export interface CustomHeaderComponentIProps {
  setOrderByDescending?: (data: boolean) => void;
  setOrderBy?: (data: string) => void;
  displayName: string;
  OrderByDescending?: boolean;
  OrderBy?: string;
}
export interface CellRendererParams {
  value: string;
}
