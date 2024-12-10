import { Fetcher } from "@/services/Fetcher";
import { successCreatedMessage } from "@/utils/const";
import { setDesktopPropertiesIState } from "./DevicedetailIParams";
import { openNotificationWithIcon } from "@/components/CommonComponents/Toster/Toster";

const fetcher = new Fetcher();
export class DevicedetailFunction {
  async deviceRegister(
    desktopProperties: setDesktopPropertiesIState,
    UnitId: string,
    SquadId: string,
    setLoading: (data: boolean) => void
  ) {
    setLoading(true)
    const response = await fetcher.post(
      "/citation/device/register",
      {
        DesktopApplicationDetailId: null,
        UserId: "9866a16e-7e81-41c3-ae0e-239858884115",
        RegisterDateTime: "2024-12-06T08:51:27.677Z",
        Ipaddress: desktopProperties.Ipaddress,
        GeoLocation: desktopProperties.GeoLocation,
        UnitId: UnitId,
        SquadId: SquadId,
        DeviceName: desktopProperties.DeviceName,
        DeviceType: desktopProperties.DeviceType,
        OperatingSystem: desktopProperties.OperatingSystem,
        SystemArchitecture: desktopProperties.SystemArchitecture,
        DisplayResolution: desktopProperties.DisplayResolution,
        ApplicationVersion: desktopProperties.ApplicationVersion,
        LastUpdateDateTime: "2024-12-06T08:51:27.677Z",
        PublicIpaddress: desktopProperties.PublicIpaddress,
        Macaddress: desktopProperties.Macaddress,
        ProxyVpndetails: desktopProperties.ProxyVpndetails,
      },
      {
        message: successCreatedMessage,
        show: true,
      }
    );
    openNotificationWithIcon("success", "Device Register Successfully");
    setLoading(false);
    let res = response?.Data;
  }
}
