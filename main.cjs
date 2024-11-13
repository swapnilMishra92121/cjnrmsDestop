const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const sudo = require('sudo-prompt');
const { exec } = require('child_process');



// const isDev = process.env.NODE_ENV !== 'production' && !app.isPackaged;
const isDev = false;

let appWindow; // Corrected to ensure a single global appWindow instance


function runAdminScript() {
  const scriptPath = path.join(app.getAppPath(), 'run_as_admin.ps1');
  exec(`powershell -ExecutionPolicy Bypass -File "${scriptPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return;
    }
    console.log(`Script output: ${stdout}`);
  });
}

function createWindow() {
  appWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });




  appWindow.loadURL(
    isDev
      ? 'http://localhost:3000' // Next.js dev server URL
      : `file:///${path.join(__dirname, "out", "index.html")}` // Adjusted production path
  );

  if (isDev) {
    appWindow.webContents.openDevTools();
  }

  appWindow.on('closed', () => {
    appWindow = null;
  });
}

app.on('ready', () => {
  runAdminScript();
  createWindow();
  registerIPCHandlers(); // Register IPC handlers once the app is ready
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});





function registerIPCHandlers() {
  ipcMain.handle('get-printers', async () => {
    if (appWindow && appWindow.webContents) {
      const printers = await appWindow.webContents.getPrintersAsync();
      return printers;
    }
    return [];
  });

  ipcMain.handle('print-pdf', (event, printerName, pdfPath) => {
    if (!appWindow || !appWindow.webContents) {
      console.error('Window or webContents not available for printing.');
      return;
    }

    const options = {
      silent: true,
      deviceName: printerName,
    };

    appWindow.webContents.print(options, (success, failureReason) => {
      if (!success) console.error(`Failed to print: ${failureReason}`);
    });
  });

  ipcMain.handle('read-xml-files', async (event, someParameter = 'parser_vehicle_details') => {
    return new Promise((resolve, reject) => {
      const args = [
        path.join(__dirname, "CJNCitationService", "parser.db"),
        someParameter,
        'read',
      ].join(' ');

      sudo.exec(
        `${path.join(__dirname, "litedb_demo3.exe")} ${args}`,
        { name: 'LiteDB App' },
        (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`);
            reject(error);
          }
          if (stderr) {
            console.error(`Stderr: ${stderr}`);
          }
          resolve(stdout);
        }
      );
    });
  });

  ipcMain.handle('create-output-json-file', async (event, someParameter = {}) => {
    const filePath = path.join(__dirname, 'Vehicle', 'data.json');
    try {
      const fileContent = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '[]';
      let jsonData = [];

      try {
        jsonData = JSON.parse(fileContent);
      } catch {
        console.warn('Invalid JSON format. Initializing empty array.');
      }

      jsonData.push({ ...someParameter, id: jsonData.length });
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
      console.log('Data added successfully to JSON file!');

      return 'Data added successfully';
    } catch (error) {
      console.error('Error writing to JSON file:', error);
      throw error;
    }
  });

  ipcMain.handle('get-json-data', async () => {
    const filePath = path.join(__dirname, 'Vehicle', 'data.json');
    try {
      if (!fs.existsSync(filePath)) {
        console.warn('File does not exist, returning empty array.');
        return [];
      }
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      console.error('Error reading JSON file:', error);
      throw error;
    }
  });

  ipcMain.handle('update-json-data', async (event, updatedData) => {
    const filePath = path.join(__dirname, 'Vehicle', 'data.json');

    console.log(updatedData, 'kjshfd')
    try {
      const fileContent = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '[]';
      let jsonData = [];

      try {
        jsonData = JSON.parse(fileContent);
      } catch {
        console.warn('Invalid JSON format. Initializing empty array.');
      }

      const itemIndex = jsonData.findIndex((item) => item?.id === updatedData.id);
      if (itemIndex === -1) {
        throw new Error('Item not found');
      }

      jsonData[itemIndex] = { ...jsonData[itemIndex], ...updatedData };
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
      console.log('Data updated successfully in JSON file!');

      return 'Data updated successfully';
    } catch (error) {
      console.error('Error updating JSON file:', error);
      throw error;
    }
  });
}


