const { PublicClientApplication } = require("@azure/msal-node");
const { shell, safeStorage } = require("electron");
const { promises } = require("fs");

let Store; // Declare the Store variable

class AuthProvider {
  clientApplication;
  msalConfig;
  cache;
  account;

  constructor() {
    this.msalConfig = {
      auth: {
        clientId: "62f3f32e-6b5e-4b82-a324-3dcbb6bdcc0a",
        authority: `https://login.microsoftonline.com/common`,
        redirectUri: "myapp://login-success",
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

  async initializeStore() {
    if (!Store) {
      // Dynamically import electron-store
      const { default: ElectronStore } = await import("electron-store");
      Store = new ElectronStore();
    }
  }

  async login() {
    await this.initializeStore(); // Ensure store is initialized

    try {
      const openBrowser = async (url) => {
        console.log("Authentication URL:", url);
        await shell.openExternal(url); // No need to append redirect_uri here
      };

      const successTemplate = await promises.readFile("./index.html", "utf-8");

      const authResponse = await this.clientApplication.acquireTokenInteractive(
        {
          openBrowser,
          successTemplate: successTemplate,
          failureTemplate: "<h1> Opps! Something went wrong </h1>",
          redirectUri: "myapp://login-success", // Specify redirect_uri here
        }
      );
      Store.set("access_token", authResponse.accessToken);
      this.account = authResponse.account;
      return authResponse.accessToken;
    } catch (error) {
      console.error("Error while login:", error);
    }
  }

  async logout() {
    await this.initializeStore();
    try {
      Store.delete("access_token");
      console.log("Logged out and token cleared");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  async getToken() {
    await this.initializeStore();
    try {
      const token = Store.get("access_token");
      // console.log("token", token);
      if (!token) {
        console.error("No token found. User might not be logged in.");
        return null;
      }
      return token;
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  }
}

module.exports = AuthProvider;
