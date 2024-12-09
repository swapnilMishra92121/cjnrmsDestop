import { Fetcher } from "@/services/Fetcher";
import { successCreatedMessage } from "@/utils/const";

const fetcher = new Fetcher();
export class AddCitationsFunction{



    async deviceRegister(
       
      ) {
        const response = await fetcher.post(
          "/citation/{desktopApplicationDetailId}/heartbeat",
          {
            "DesktopApplicationDetailId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "DeviceName": "string",
            "LastLoginDateTime": "2024-12-06T12:03:42.003Z",
            "IsActive": true
          },
          {
            message: successCreatedMessage,
            show: true,
          }
        );
        let res = response?.Data;
      }
}