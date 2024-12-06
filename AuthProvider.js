const { PublicClientApplication } = require("@azure/msal-node");
const { shell,safeStorage } = require("electron");
const { promises } = require("fs");
const Registry = require('winreg');
const keytar = require('keytar');

const regKey = new Registry({
  hive: Registry.HKLM, // or HKLM for machine-wide access
  key: '\\Software\\CJNRMS'
});

class AuthProvider {
  clientApplication;
  msalConfig;
  cache;
  account;

  constructor() {
    this.msalConfig = {
      auth: {
        clientId: "62f3f32e-6b5e-4b82-a324-3dcbb6bdcc0a",
        authority: `https://login.microsoftonline.com/organisations`,
      },
      system: {
        loggerOptions: {
          loggerCallback(logLevel, message, containsPii) {
            console.log(message);
          },
        },
      },
    };
    this.clientApplication = new PublicClientApplication(this.msalConfig);
    this.cache = this.clientApplication.getTokenCache();
  }

  async login() {

    
    if(safeStorage.isEncryptionAvailable()){
      const originalText = "SensitiveData123";
      const encryptedData = safeStorage.encryptString(originalText);

      regKey.set('Token', Registry.REG_SZ, encryptedData, (err) => {
        if (err) console.error('Error writing token:', err);
        else console.log('Token saved to registry.');
      });

      // console.log("Encrypted Data:", encryptedData.toString('base64')); // Logs encrypted data in base64 format
      
    }
    try {
      const openBrowser = async (url) => {
        await shell.openExternal(url);
      };
       
      const successTemplate = await promises.readFile("./index.html","utf-8");
      const authResponse = await this.clientApplication.acquireTokenInteractive(
        {
          openBrowser,
          successTemplate: successTemplate,
          failureTemplate: "<h1> Opps! Something went wrong </h1>",
        }
      );
      console.log("authresponse", authResponse);
      this.account = authResponse.account;
    } catch (error) {
      console.log("Error while login", error);
    }
  }

  async logout() {
    // Your logout logic
  }

  async getToken() {
    // Your getToken logic
  }
}

module.exports= AuthProvider;
