export interface DevicedetailIParams{
    setShowDeviceDetail:(data:boolean)=>void
}

export interface setDesktopPropertiesIState{
    GeoLocation: string,
    DeviceName: string,
    DeviceType: string,
    OperatingSystem: string,
    SystemArchitecture: string,
    DisplayResolution: string,
    ApplicationVersion: string,
    PublicIpaddress: string,
    Macaddress: string,
    ProxyVpndetails: string,
    Ipaddress:string
}