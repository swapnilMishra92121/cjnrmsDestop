import { openNotificationWithIcon } from "@/components/CommonComponents/Toster/Toster";
import { REACT_APP_API_URL } from "@/utils/const";
import axios, { AxiosError } from "axios";

interface Toster {
  show: boolean;
  message: string;
}

export class Fetcher {
  getAccessToken() {
    const token = localStorage.getItem("AccessToken");

    if (token) {
      return token;
    }
  }
  private logErrorMessage(error: AxiosError) {
    if (error.code === "ERR_NETWORK") {
      openNotificationWithIcon(
        "error",
        "Network Error: Please check your internet connection."
      );
    } else if (error.response) {
      let data: any = error.response?.data;
      if (data?.HasMultipleErrors) {
        if (data?.Errors) {
          openNotificationWithIcon("error", data?.Errors?.join(""));
        }
      } else {
        if (data?.message) {
          openNotificationWithIcon("error", data?.message);
        } else {
          openNotificationWithIcon("error", data?.Message);
        }
      }
    } else {
      openNotificationWithIcon(
        "error",
        error?.message ? error?.message : "error"
      );
    }
  }

  async post<t>(url: string, body?: t, Toster?: Toster) {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}${url}`, body, {
        headers: {
          Authorization: `Bearer ${await window.electronAPI.getToken()}`,
        },
      });
      if (response.data?.Success) {
        if (Toster?.show) {
          openNotificationWithIcon("success", Toster?.message);
        }
        return response.data;
      }
    } catch (error) {
      this.logErrorMessage(error as AxiosError);
      return null;
    }
  }

  async get(url: string) {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${this.getAccessToken()}`,
        },
      });
      if (response?.data?.Success) {
        return response.data;
      }
    } catch (error) {
      this.logErrorMessage(error as AxiosError);
      return null;
    }
  }

  async put<t>(url: string, body: t, Toster?: Toster) {
    try {
      const response = await axios.put(`${REACT_APP_API_URL}${url}`, body, {
        headers: {
          Authorization: `Bearer ${this.getAccessToken()}`,
        },
      });
      if (response.data?.Success) {
        if (Toster?.show) {
          openNotificationWithIcon("success", Toster?.message);
        }
        return response.data;
      }
    } catch (error) {
      this.logErrorMessage(error as AxiosError);
      return null;
    }
  }
  async delete<t>(
    url: string,
    body?: t,
    Toster?: { show: boolean; message: string }
  ) {
    try {
      const response = await axios.delete(`${REACT_APP_API_URL}${url}`, {
        data: body,
        headers: {
          Authorization: `Bearer ${this.getAccessToken()}`,
        },
      });

      if (Toster?.show) {
        openNotificationWithIcon("success", Toster.message);
      }
      return response?.data ? response.data : true;
    } catch (error) {
      this.logErrorMessage(error as AxiosError);
      return null;
    }
  }
}
