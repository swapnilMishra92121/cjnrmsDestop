// global.d.ts
interface ElectronAPI {
  getPrinters: () => Promise<any[]>;
  printPDF: (printerName: string, content: any) => Promise<void>;
  readXMLFiles: (parameter: string) => Promise<any>;
  getJSONData: () => Promise<any>;
  updateJSONData: (updatedData: {}) => Promise<string>;
  createSubjectOutputJsonFile: (data: {}) => Promise<string>;
  sendLogin: () => void;
  getDesktopProperties: () => any;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {};
