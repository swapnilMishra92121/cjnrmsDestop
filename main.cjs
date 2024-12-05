const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const sudo = require("sudo-prompt");
const { exec } = require("child_process");
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');


let appWindow;


function runAdminScript() {
  // Path to the PowerShell script
  const scriptPath = path.join(app.getAppPath(), 'run_as_admin.ps1');
  // Dynamic path to the .exe file
  const exePath = path.join(app.getAppPath(), 'CJNCitationService', 'CJNParser.Worker.exe');
  // Run the PowerShell script with the dynamic .exe path
  const command = `powershell -ExecutionPolicy Bypass -File "${scriptPath}" -exePath "${exePath}"`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return;
    }
    console.log(`Script output: ${stdout}`);
  });
}

function setupAutoUpdate() {
  log.info('Setting up auto-update...');

  // Set the feed URL
  autoUpdater.setFeedURL({
    provider: 'github',
    owner: 'swapnilMishra92121',
    repo: 'cjnrmsDestop',
    channel: 'latest',
  });

  log.info('1', `https://github.com/swapnilMishra92121/cjnrmsDestop/releases/download/${app.getVersion()}/CjnCitation.Setup.${app.getVersion()}.exe`);

  // Check for updates when the app is ready
  autoUpdater.checkForUpdatesAndNotify().then((val) => {
    log.info('Check for updates successful:', val);
  }).catch((err) => {
    log.error('Error checking for updates:', err);
  });

  log.info('2');

  // Listen for the update events
  autoUpdater.on('update-available', (info) => {
    log.info('Update available: ', info);

    // Prompt user to download the update
    dialog.showMessageBox(appWindow, {
      type: 'info',
      title: 'Update Available',
      message: 'A new version is available. Do you want to download it now?',
      buttons: ['Yes', 'Later']
    }).then((response) => {
      if (response.response === 0) { // 'Yes' clicked
        autoUpdater.downloadUpdate();
      }
    });
  });

  autoUpdater.on('update-downloaded', () => {
    log.info('Update downloaded.');

    // Notify the user when the update is ready to be installed
    dialog.showMessageBox(appWindow, {
      type: 'info',
      title: 'Update Available',
      message: 'A new version has been downloaded. The application will restart to apply the update.',
      buttons: ['OK']
    }).then(() => {
      // Restart the app to apply the update
      autoUpdater.quitAndInstall();
    });
  });

  // Listen for the download progress
  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '% (' + progressObj.transferred + "/" + progressObj.total + ')';
    log.info(log_message);

    // Optionally, you can show the progress to the user using a dialog or custom window
    // dialog.showMessageBox(appWindow, { message: `Downloading: ${progressObj.percent}%` });
  });

  autoUpdater.on('error', (err) => {
    log.error('Auto-update error: ', err);
  });
}

// Create Window
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

  // Load your app's main content
  appWindow.loadURL(`file:///${path.join(__dirname, 'out', 'index.html')}`);

  // appWindow.webContents.openDevTools();
  log.info('App is starting...');

  appWindow.on('closed', () => {
    appWindow = null;
  });
}

app.on('ready', async () => {
  runAdminScript();
  createWindow();
  setupAutoUpdate();
  registerIPCHandlers();
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
      const printers = await appWindow.webContents.getPrinters();
      log.info(printers)
      return printers;
    }
    return [];
  });

  ipcMain.handle('print-pdf', async (event, printerName, content) => {
    try {
      // const pdfPath = path.join(app.getPath('temp'), 'temp.pdf');
      // const printWindow = new BrowserWindow({
      //   show: false,
      //   webPreferences: {
      //     nodeIntegration: false,
      //     contextIsolation: true,
      //   },
      // });
      // const htmlContent = `
      //   <!DOCTYPE html>
      //   <html>
      //   <head>
      //     <title>Print Content</title>
      //     <meta charset="UTF-8">
      //   </head>
      //   <body>
      //     <h1>${content.title}</h1>
      //     <p>${content.body}</p>
      //   </body>
      //   </html>
      // `;
      // await printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`);
      // const pdfBuffer = await printWindow.webContents.printToPDF({});
      // fs.writeFileSync(pdfPath, pdfBuffer);
      // const printResult = await new Promise((resolve) => {
      //   printWindow.webContents.print(
      //     {
      //       silent: true,
      //       deviceName: printerName,
      //     },
      //     (success, errorType) => {
      //       if (!success) {
      //         console.error('Print failed:', errorType);
      //         resolve({ success: false, error: errorType });
      //       } else {
      //         resolve({ success: true });
      //       }
      //     }
      //   );
      // });
      // printWindow.close();
      // if (!printResult.success) {
      //   throw new Error(printResult.error || 'Unknown print error');
      // }
      // return { success: true };




















      const pdfPath = path.join(app.getPath('temp'), 'temp.pdf');

      // Create a hidden window for rendering the content
      const renderWindow = new BrowserWindow({
        show: false,
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true,
        },
      });

      // Load the HTML template
      const templatePath = path.join(__dirname, 'PDFTemplate', 'page3.html');
      let htmlContent = fs.readFileSync(templatePath, 'utf-8');


      const filePath = path.join(__dirname, 'SavedData', `citation-${content.Vehicles.plate}.json`);

      const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));


      // Replace placeholders in the template with the provided data
      htmlContent = bindDataToTemplate(htmlContent, jsonData);

      // Load the HTML content into the hidden window
      await renderWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`);

      // Generate the PDF
      const pdfBuffer = await renderWindow.webContents.printToPDF({});

      // Save the PDF to a temporary file
      fs.writeFileSync(pdfPath, pdfBuffer);

      // Close the rendering window
      renderWindow.close();

      // Create a new window for PDF preview
      const previewWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: true,
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true,
        },
      });

      // Load the generated PDF in the preview window
      previewWindow.loadURL(`file://${pdfPath}`);

      // Print the PDF silently to the selected printer when confirmed
      const printResult = await new Promise((resolve) => {
        previewWindow.webContents.once('did-finish-load', () => {
          // Add a confirmation button in the preview window
          previewWindow.webContents.executeJavaScript(`
              const button = document.createElement('button');
              button.textContent = 'Print';
              button.style.position = 'fixed';
              button.style.bottom = '20px';
              button.style.right = '20px';
              button.style.padding = '10px 20px';
              button.style.fontSize = '16px';
              button.style.zIndex = '1000';
              button.addEventListener('click', () => window.postMessage('print', '*'));
              document.body.appendChild(button);
            `);

          // Wait for the user to click the "Print" button
          const { ipcMain } = require('electron');
          ipcMain.once('print-pdf', () => {
            previewWindow.webContents.print(
              {
                silent: true,
                deviceName: printerName,
              },
              (success, errorType) => {
                if (!success) {
                  console.error('Print failed:', errorType);
                  resolve({ success: false, error: errorType });
                } else {
                  resolve({ success: true });
                }
              }
            );
          });
        });
      });

      if (!printResult.success) {
        throw new Error(printResult.error || 'Unknown print error');
      }

      // Close the preview window after printing
      previewWindow.close();

      return { success: true };





    } catch (error) {
      console.error('Error in print-pdf handler:', error);
      return { success: false, error: error.message };
    }
  });




  /**
* Function to replace placeholders in the HTML template with dynamic data.
* @param {string} template - The HTML template string.
* @param {object} data - The data object to bind.
* @returns {string} - The HTML content with data bound.
*/
  function bindDataToTemplate(template, dataa) {

    log.info(dataa[0])


    let data = dataa[0]


    const violationRows = data.Violation.violations
      .map((violation) => {
        return `
        <tr>
          <td colspan="4">
            <table style="width: 100%">
              <tr>
                <td style="border: 0px; width: 65%">${violation.description || ''}</td>
                <td style="border: 0px">${violation.statueOrOrdinance || ''}</td>
              </tr>
            </table>
          </td>
          <td>
            <span class="checkbox" ${violation.thirdViolation ? 'checked' : ''}></span> 3rd violation
          </td>
          <td>PM, M, GM</td>
        </tr>
      `;
      })
      .join('');


    return template
      .replace(/{{ViolationRows}}/g, violationRows)
      .replace(/{{Identification}}/g, data.Subject.identificationType || '')
      .replace(/{{County Name}}/g, data.CitationInfo.county || '')
      .replace(/{{DL Checked}}/g, data.Subject.cdl ? 'checked' : '')
      .replace(/{{DVSWeb Checked}}/g, data.Subject.dvsWeb ? 'checked' : '')
      .replace(/{{PhotoID Checked}}/g, data.Subject.photoID ? 'checked' : '')
      .replace(/{{FP Checked}}/g, data.Subject.fp ? 'checked' : '')
      .replace(/{{Other Checked}}/g, data.Subject.other ? 'checked' : '')
      .replace(/{{DL Number}}/g, data.Vehicles.plate || '')
      .replace(/{{State}}/g, data.Subject.state || '')
      .replace(
        /{{Name}}/g,
        `${data.Subject.firstName || ''} ${data.Subject.middleName || ''} ${data.Subject.lastName || ''} ${data.Subject.suffix || ''}`.trim()
      )
      .replace(/{{Address}}/g, data.Subject.address || '')
      .replace(/{{Street}}/g, data.Location.address || '')
      .replace(/{{Apt}}/g, data.Location.apt || '')
      .replace(/{{City}}/g, data.Subject.city || '')
      .replace(/{{Zip}}/g, data.Subject.zip || '')
      .replace(/{{DOB}}/g, data.Subject.dob || '')
      .replace(/{{Height}}/g, data.Subject.height || '')
      .replace(/{{Weight}}/g, data.Subject.weight || '')
      .replace(/{{Eyes}}/g, data.Subject.eyes || '')
      .replace(/{{Gender}}/g, data.Subject.gender || '')
      .replace(/{{Color}}/g, data.Vehicles.color || '')
      .replace(/{{Make}}/g, data.Vehicles.make || '')
      .replace(/{{DateofOffense}}/g, data.CitationInfo.offenseDate?.$d?.toString().split('T')[0] || '')
      .replace(/{{TimeofOffense}}/g, data.CitationInfo.offenseTime?.$d?.toString().split('T')[1]?.split('.')[0] || '')
      .replace(/{{Citation #}}/g, `#${data.CitationInfo.caseOrICRNumber}` || '')
      .replace(/{{SequentialNumber}}/g, data.CitationInfo.sequentialNumber || '___')
      .replace(/{{TotalCitations}}/g, data.CitationInfo.totalCitations || '___');



  }



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

  ipcMain.handle('create-subject-json-file', async (event, someParameter = {}) => {

    const filePath = path.join(__dirname, 'SavedData', `citation-${someParameter.Vehicles.plate}.json`);
    try {
      // Check if file exists. If not, initialize with an empty array.
      const fileContent = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '[]';
      let jsonData = {};

      // Parse the existing file content or initialize as an empty array if parsing fails.
      try {
        jsonData = JSON.parse(fileContent);
      } catch {
        console.warn('Invalid JSON format. Initializing empty array.');
      }

      // Add new data with a unique id based on current array length.
      jsonData.push({ ...someParameter, id: jsonData.length });
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');

      log.info(`Data added successfully to ${someParameter.plate}.json!`);
      return `Data added successfully to ${someParameter.plate}.json`;
    } catch (error) {
      console.error('Error writing to JSON file:', error);
      throw error;
    }
  });



  ipcMain.handle('create-output-json-file', async (event, someParameter = {}) => {
    if (!someParameter.plate) {
      throw new Error("Plate number is required in someParameter to create the file.");
    }

    const filePath = path.join(__dirname, 'Vehicle', `${someParameter.plate}.json`);

    try {
      // Check if file exists. If not, initialize with an empty array.
      const fileContent = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '[]';
      let jsonData = [];

      // Parse the existing file content or initialize as an empty array if parsing fails.
      try {
        jsonData = JSON.parse(fileContent);
      } catch {
        console.warn('Invalid JSON format. Initializing empty array.');
      }

      // Add new data with a unique id based on current array length.
      jsonData.push({ ...someParameter, id: jsonData.length });
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');

      log.info(`Data added successfully to ${someParameter.plate}.json!`);
      return `Data added successfully to ${someParameter.plate}.json`;
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
      log.info('Data updated successfully in JSON file!');

      return 'Data updated successfully';
    } catch (error) {
      console.error('Error updating JSON file:', error);
      throw error;
    }
  });
}


