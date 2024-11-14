// preload.js
const  { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getPrinters: () => ipcRenderer.invoke('get-printers'),
  printPDF: (printerName, pdfPath) => ipcRenderer.invoke('print-pdf', printerName, pdfPath),
  readXMLFiles: (parameter) => ipcRenderer.invoke('read-xml-files', parameter),
  createOutputJSONFile: (data) => ipcRenderer.invoke('create-output-json-file', data),
  getJSONData: () => ipcRenderer.invoke('get-json-data'),
  updateJSONData: (updatedData) => ipcRenderer.invoke('update-json-data', updatedData),


  createSubjectOutputJsonFile :(data)=> ipcRenderer.invoke('create-subject-json-file',data),
});