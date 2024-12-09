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
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCIsImtpZCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCJ9.eyJhdWQiOiJhcGk6Ly84ZDhkYjViZi01NzI2LTQ3MWQtOTNkZi0zZmRkZWNhNGE5NWEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9hMDQ3NjIzMS1kMmY2LTQ4ODEtOWI1Yy04OWY2ZDc3ZGYyMTMvIiwiaWF0IjoxNzMzNDc2MTQ4LCJuYmYiOjE3MzM0NzYxNDgsImV4cCI6MTczMzQ4MTc1NywiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhZQUFBQWppQThYREhRUUlidHdwWHFyUUVHcWRHMzVack1PQTY2NlNnRVRQSmVDTnFCQmQrRnpKVzgxL0JzWVR1ai9tRFY4TG81b3ZNVXVPVWI5MEM3STJJTkp3dnNqYUxzazg5dHpESkhFWi9hZHRBPSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwaWQiOiI5ZDdjZDlkNy05YTcwLTQzZDAtOTY3Ni04MDFhMzFlNzQ4YTQiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6IkJyaWp3YW5pIiwiZ2l2ZW5fbmFtZSI6IkNoaXJheXUiLCJpcGFkZHIiOiIyNDAxOjQ5MDA6MWNhMzphZGM6MjA2Mjo4NGUzOjYyYmY6NDgwMyIsIm5hbWUiOiJDaGlyYXl1ICBCcmlqd2FuaSIsIm9pZCI6IjAzNzEzZTVmLTJhMTktNGJmYS1hNDNmLWMxZGU5NDdmMjJlOCIsInJoIjoiMS5BU29BTVdKSG9QYlNnVWliWEluMjEzM3lFNy0xalkwbVZ4MUhrOThfM2V5a3FWb3BBZndxQUEuIiwic2NwIjoiUmVhZFdyaXRlIiwic3ViIjoib2p4VG9sdlFfSVJsNWtyQThJZXVCUTVFcnAyYzZObVZSTkFFV3B3X2VfbyIsInRpZCI6ImEwNDc2MjMxLWQyZjYtNDg4MS05YjVjLTg5ZjZkNzdkZjIxMyIsInVuaXF1ZV9uYW1lIjoiY2hpcmF5dS5icmlqd2FuaUBxc3N0ZWNobm9zb2Z0LmNvbSIsInVwbiI6ImNoaXJheXUuYnJpandhbmlAcXNzdGVjaG5vc29mdC5jb20iLCJ1dGkiOiJqN3FseUpscHprLUhqT1BjYnJjTkFBIiwidmVyIjoiMS4wIn0.jWd-NkCnc36iGMwNnG6zAieGYOfEYPqx4FPqnoKdjKK8hJWqnYJ7ywCKvrWqGiRJeM1yv6cIUqW6jGpDknqWyHuNQ4BtNdihxNvbuWbO4ivOKMwf2YM7mgjX2KaahdU_7acIAvS3FRduQ3Ua2Wl_QR7CHr8qg7xHwh1gcoWuh3RIIUgG1iFs9RedPayrJ5y2psedIv7ex6Zwi__9H1FqStncuQjZGD0O4oTBE77aJUfNTxuBi-onUlKjBt1uyJDKI-ExwWOAFVD-ZtxyMr6iO6C3wMTfZ7bU1JKyR1UzqZNZaZDVxMgfPve_eqjY3chVW8kxMKxgiuJf_aaTV6qjLQ`,
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
