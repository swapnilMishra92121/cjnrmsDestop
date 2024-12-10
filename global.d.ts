// global.d.ts
interface ElectronAPI {
	getPrinters: () => Promise<any[]>;
	printPDF: (printerName: string, content: any) => Promise<void>; 
	readXMLFiles: (parameter: string) => Promise<any>;
	createOutputJSONFile: (data: {}) => Promise<string>;
	getJSONData: () => Promise<any>; // Adjust the type based on expected data
	updateJSONData: (updatedData: {}) => Promise<string>;
	createSubjectOutputJsonFile:(data: {}) => Promise<string>;
	sendLogin:()=>void;
	createAuditOutputJsonFile:(data:{})=> Promise<string>;
	getToken:()=>Promise<string>;
	logout:()=>void;
	closeApp:()=>void;
	getDesktopProperties:()=>any;
  }
  
  declare global {
	interface Window {
	  electronAPI: ElectronAPI;
	}
  }
  
  export {}; // Ensure this file is treated as a module
  