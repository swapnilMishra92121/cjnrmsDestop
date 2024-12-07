const { app, BrowserWindow, ipcMain, dialog, screen } = require('electron');
const path = require('path');
const fs = require('fs');
const sudo = require("sudo-prompt");
const { exec } = require("child_process");
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');
const AuthProvider = require('./AuthProvider');
const os = require('os');
const axios = require('axios');
const networkInterfaces = os.networkInterfaces();


let appWindow;
const auth = new AuthProvider()


async function runAdminScript() {
  const exePath = path.join(app.getAppPath(), 'CJNCitationService', 'CJNParser.Worker.exe');
  const command = `sc.exe create ".NET Service 0.1" binpath= "${exePath}" start=auto && sc.exe start ".NET Service 0.2"`;
  log.info(command)
  sudo.exec(command, { name: "NetService" }, (error, stdout, stderr) => {
    if (error) {
      log.error(`Error: ${error.message}`);
    }
    if (stderr) {
      log.error(`Stderr: ${stderr}`);
    }
    log.info(stdout);
  });

  // Handling default protocol client setup (this part seems unrelated to the script execution but included as it was in your original function)
  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      app.setAsDefaultProtocolClient("electron-fiddle", process.execPath, [
        path.resolve(process.argv[1]),
      ]);
    } else {
      app.setAsDefaultProtocolClient("electron-fiddle");
    }
  }
}


function setupAutoUpdate() {
  autoUpdater.setFeedURL({
    provider: 'github',
    owner: 'swapnilMishra92121',
    repo: 'cjnrmsDestop',
    channel: 'latest',
  });
  autoUpdater.checkForUpdatesAndNotify().then((val) => {
    log.info('Check for updates successful:', val);
  }).catch((err) => {
    log.error('Error checking for updates:', err);
  });

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

function createWindow() {
  appWindow = new BrowserWindow({
    width: 2000,
    height: 1200,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Load your app's main content
  appWindow.loadURL(`file:///${path.join(__dirname, 'out', 'index.html')}`);

  // appWindow.webContents.openDevTools();
  log.info('App is starting...');

  appWindow.on("closed", () => {
    appWindow = null;
  });
}

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (appWindow) {
      if (appWindow.isMinimized()) appWindow.restore();
      appWindow.focus();
    }

    // the commandLine is array of strings in which last element is deep link url
    // dialog.showErrorBox(
    //   "Welcome Back",
    //   `You arrived from: ${commandLine.pop()}`
    // );
  });

}
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})


app.on("ready", async () => {
  await runAdminScript();
  createWindow();
  // setupAutoUpdate();
  registerIPCHandlers();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});


function getLocalIpAddress() {
  const interfaces = networkInterfaces;
  let ipAddress = '';
  for (let interfaceName in interfaces) {
    for (let iface of interfaces[interfaceName]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        ipAddress = iface.address;
        break;
      }
    }
  }
  return ipAddress;
}

async function getGeoLocation(ip) {
  const response = await axios.get(`https://ipinfo.io/${ip}/json`);
  return response.data.city + ', ' + response.data.region + ', ' + response.data.country;
}

function getDisplayResolution() {
  const primaryDisplay = screen.getPrimaryDisplay();
  return `${primaryDisplay.size.width}x${primaryDisplay.size.height}`;
}

function getMacAddress() {
  for (let iface of Object.values(networkInterfaces)) {
    for (let i of iface) {
      if (i.mac && !i.internal) {
        return i.mac;
      }
    }
  }
  return null;
}

function getProxyDetails() {
  return 'Proxy details here';
}

function registerIPCHandlers() {

  ipcMain.handle("get-printers", async () => {
    if (appWindow && appWindow.webContents) {
      const printers = await appWindow.webContents.getPrintersAsync();
      console.log(printers)
      return printers;
    }
    return [];
  });

  ipcMain.handle("print-pdf", async (event, printerName, content) => {
    try {
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

      // Load the JSON data
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

      // Print the PDF
      const printResult = await new Promise((resolve) => {
        renderWindow.webContents.print(
          {
            silent: true,
            deviceName: printerName,
          },
          (success, errorType) => {
            if (!success) {
              log.error("Print failed:", errorType);
              resolve({ success: false, error: errorType });
            } else {
              resolve({ success: true });
            }
          }
        );
      });

      // Close the rendering window
      renderWindow.close();

      if (!printResult.success) {
        throw new Error(printResult.error || "Unknown print error");
      }

      return { success: true };
    } catch (error) {
      log.error("Error in print-pdf handler:", error);
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

      log.info(args)
      log.info(`${path.join(__dirname, "litedb_demo3.exe")} ${args}`)

      sudo.exec(
        `${path.join(__dirname, "litedb_demo3.exe")} ${args}`,
        { name: "LiteDB App" },
        (error, stdout, stderr) => {
          if (error) {
            log.error(`Error: ${error.message}`);
            reject(error);
          }
          if (stderr) {
            log.error(`Stderr: ${stderr}`);
          }
          resolve(stdout);
        }
      );
    });
  }
  );

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
        console.warn("Invalid JSON format. Initializing empty array.");
      }

      // Add new data with a unique id based on current array length.
      jsonData.push({ ...someParameter, id: jsonData.length });
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");

      console.log(`Data added successfully to ${someParameter.plate}.json!`);
      return `Data added successfully to ${someParameter.plate}.json`;
    } catch (error) {
      log.error("Error writing to JSON file:", error);
      throw error;
    }
  }
  );

  ipcMain.handle("get-json-data", async () => {
    const filePath = path.join(__dirname, "Vehicle", "data.json");
    try {
      if (!fs.existsSync(filePath)) {
        console.warn("File does not exist, returning empty array.");
        return [];
      }
      const fileContent = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(fileContent);
    } catch (error) {
      log.error("Error reading JSON file:", error);
      throw error;
    }
  });

  ipcMain.handle("update-json-data", async (event, updatedData) => {
    const filePath = path.join(__dirname, "Vehicle", "data.json");
    try {
      const fileContent = fs.existsSync(filePath)
        ? fs.readFileSync(filePath, "utf-8")
        : "[]";
      let jsonData = [];

      try {
        jsonData = JSON.parse(fileContent);
      } catch {
        console.warn("Invalid JSON format. Initializing empty array.");
      }

      const itemIndex = jsonData.findIndex(
        (item) => item?.id === updatedData.id
      );
      if (itemIndex === -1) {
        throw new Error("Item not found");
      }

      jsonData[itemIndex] = { ...jsonData[itemIndex], ...updatedData };
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
      log.info('Data updated successfully in JSON file!');

      return "Data updated successfully";
    } catch (error) {
      log.error("Error updating JSON file:", error);
      throw error;
    }
  });

  ipcMain.handle("get-desktop-properties", async () => {
    const publicIp = await axios.get('https://api.ipify.org?format=json');


    const properties = {
      Ipaddress: getLocalIpAddress(),
      GeoLocation: await getGeoLocation(publicIp.data.ip),
      DeviceName: os.hostname(),
      DeviceType: os.type(),
      OperatingSystem: os.platform(),
      SystemArchitecture: os.arch(),
      DisplayResolution: getDisplayResolution(),
      ApplicationVersion: app.getVersion(),
      PublicIpaddress: publicIp.data.ip,
      Macaddress: getMacAddress(),
      ProxyVpndetails: getProxyDetails(),
    };

    console.log(properties)

    return properties;
  });

}

ipcMain.on("LOGIN", async () => {
  console.log("login started");
  await auth.login();
});

app.on("second-instance", (event, commandLine) => {
  // Focus the app window if already running
  if (appWindow) {
    if (appWindow.isMinimized()) appWindow.restore();
    appWindow.focus();
  }

  // Get the deep link URL (last argument in commandLine)
  const deepLink = commandLine.find((arg) => arg.startsWith("electron-fiddle://"));
  if (deepLink) {
    const parsedUrl = url.parse(deepLink, true); // Parse URL and query params
    const token = parsedUrl.query.token; // Extract token from query params

    console.log(`Token from deep link: ${token}`);

    // Optionally send token to the renderer process
    if (appWindow) {
      appWindow.webContents.send("deep-link-token", token);
    }
  }
});

app.on("open-url", (event, deepLink) => {
  event.preventDefault();
  if (appWindow) {
    const parsedUrl = url.parse(deepLink, true);
    const token = parsedUrl.query.token;
    console.log(`Token from open-url: ${token}`);
    appWindow.webContents.send("deep-link-token", token);
  }
});

