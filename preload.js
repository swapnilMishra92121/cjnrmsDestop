// preload.js
const  { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getPrinters: () => ipcRenderer.invoke('get-printers'),
  getDesktopProperties: () => ipcRenderer.invoke('get-desktop-properties'),
  printPDF: (printerName, content) => ipcRenderer.invoke('print-pdf', printerName, content),
  readXMLFiles: (parameter) => ipcRenderer.invoke('read-xml-files', parameter),
  getJSONData: () => ipcRenderer.invoke('get-json-data'),
  updateJSONData: (updatedData) => ipcRenderer.invoke('update-json-data', updatedData),
  createSubjectOutputJsonFile :(data)=> ipcRenderer.invoke('create-subject-json-file',data),
  sendLogin :()=> ipcRenderer.send('LOGIN'),
  openApp: ()=>ipcRenderer.send('shell:open')
});