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
        GeoLocation: desktopProperties.GeoLocation,
        UnitId: UnitId,
        SquadId: SquadId,
        DeviceName: desktopProperties.DeviceName,
        DeviceType: desktopProperties.DeviceType,
        OperatingSystem: desktopProperties.OperatingSystem,
        SystemArchitecture: desktopProperties.SystemArchitecture,
        DisplayResolution: desktopProperties.DisplayResolution,
        ApplicationVersion: desktopProperties.ApplicationVersion,
        PublicIpaddress: desktopProperties.PublicIpaddress,
        Macaddress: desktopProperties.Macaddress,
        ProxyVpndetails: desktopProperties.ProxyVpndetails,
        IsActive: true,
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
