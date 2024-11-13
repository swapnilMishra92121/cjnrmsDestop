export interface PreviewIProps {
  ViewPreview: (data: number) => void;
  DeletePreview: (data: number) => void;
  list?: {
    [key: string]: string | number | boolean;
  }[];
  showlist?: string[][];
  displaylist?: {
    list: string[];
    id: number;
    push: boolean
  }[];
}
