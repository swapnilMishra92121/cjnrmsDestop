const { PublicClientApplication } = require("@azure/msal-node");
const { shell } = require("electron");
class AuthProvider {
  clientApplication;
  msalConfig;
  cache;
  account;

  constructor() {
    this.msalConfig = {
      auth: {
        clientId: "9d7cd9d7-9a70-43d0-9676-801a31e748a4",
        authority: `https://login.microsoftonline.com/1af9d803-aadd-4145-8bd7-d8f5ce087401`,
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
    try {
        console.log("hello world....");
      const openBrowser = async (url) => {
        await shell.openExternal(url);
      };
      const authResponse = await this.clientApplication.acquireTokenInteractive(
        {
          openBrowser,
        //   successTemplate: "You are signed in.",
        //   failureTemplate: "<h1> Opps! Something went wrong </h1>",
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
