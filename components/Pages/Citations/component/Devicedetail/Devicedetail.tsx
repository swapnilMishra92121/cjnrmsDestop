"use client";
import React, { useEffect, useState } from "react";
import {
  DevicedetailIParams,
  setDesktopPropertiesIState,
} from "./DevicedetailIParams";
import { DropdownComponent } from "@/components/CommonComponents/Fields/Dropdown/DropdownComponent";
import "./LoginConfirmation.css";
import { ButtonComponents } from "@/components/CommonComponents/Fields/Button/ButtonComponents";
import { DevicedetailFunction } from "./DevicedetailFunction";

const Unit = [{ id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", value: "Unit 1" }];

const Squad = [
  { id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", value: "Squad 1" },
];

export const Devicedetail: React.FC<DevicedetailIParams> = ({setShowDeviceDetail,setLoading}) => {
  const devicedetailFunction = new DevicedetailFunction();
  const [UnitId, setUnitId] = useState<string>("");
  const [SquadId, setSquadId] = useState<string>("");
  const [desktopProperties, setDesktopProperties] =
    useState<setDesktopPropertiesIState>({
      GeoLocation: "",
      DeviceName: "",
      DeviceType: "",
      OperatingSystem: "",
      SystemArchitecture: "",
      DisplayResolution: "",
      ApplicationVersion: "",
      PublicIpaddress: "",
      Macaddress: "",
      ProxyVpndetails: "",
      Ipaddress: "",
    });

  useEffect(() => {
    window.electronAPI
      .getDesktopProperties()
      .then((detail: setDesktopPropertiesIState) => {
        setDesktopProperties(detail);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, []);

  const onSubmit = () => {
    localStorage.setItem("isFirstRegister","true");
    setShowDeviceDetail(false);
    devicedetailFunction.deviceRegister(desktopProperties, UnitId, SquadId, setLoading);
    // setShowDeviceDetail(false);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <DropdownComponent
          dataSource={Unit.map((state) => ({
            id: state.id,
            value: state.value,
          }))}
          width="100px"
          fieldName="Unit"
          value={UnitId}
          handleRowClick={(e) => {
            setUnitId(e);
          }}
        />

        <DropdownComponent
          dataSource={Squad.map((state) => ({
            id: state.id,
            value: state.value,
          }))}
          fieldName="Squad"
          width="100px"
          value={SquadId
            
          }
          handleRowClick={(e) => {
            setSquadId(e);
          }}
        />
      </div>

      <div style={{ marginTop: "3%" }} className="loginConfirmation_container">
        <div className="property">
          <label style={{ fontWeight: "bold" }}>IP Address : </label>
          <span>{"103.181.160.20"}</span>
        </div>
        <div className="property">
          <label style={{ fontWeight: "bold" }}>Geo Location : </label>
          <span>{desktopProperties.GeoLocation}</span>
        </div>
        <div className="property">
          <label style={{ fontWeight: "bold" }}>Device Name : </label>
          <span>{desktopProperties.DeviceName}</span>
        </div>
        <div className="property">
          <label style={{ fontWeight: "bold" }}>Device Type : </label>
          <span>{desktopProperties.DeviceType}</span>
        </div>
        <div className="property">
          <label style={{ fontWeight: "bold" }}>Operating System : </label>
          <span>{desktopProperties.OperatingSystem}</span>
        </div>
        <div className="property">
          <label style={{ fontWeight: "bold" }}>System Architecture : </label>
          <span>{desktopProperties.SystemArchitecture}</span>
        </div>
        <div className="property">
          <label style={{ fontWeight: "bold" }}>Display Resolution : </label>
          <span>{desktopProperties.DisplayResolution}</span>
        </div>
        <div className="property">
          <label style={{ fontWeight: "bold" }}>Application Version : </label>
          <span>{desktopProperties.ApplicationVersion}</span>
        </div>
        <div className="property">
          <label style={{ fontWeight: "bold" }}>Public IP Address : </label>
          <span>{desktopProperties.PublicIpaddress}</span>
        </div>
        <div className="property">
          <label style={{ fontWeight: "bold" }}>MAC Address : </label>
          <span>{desktopProperties.Macaddress}</span>
        </div>
        <div className="property">
          <label style={{ fontWeight: "bold" }}>Proxy/VPN Details : </label>
          <span>{desktopProperties.ProxyVpndetails}</span>
        </div>
      </div>

      <div style={{ marginTop: "3%" }}>
        <ButtonComponents name="Submit" handleClick={onSubmit} />
      </div>
    </div>
  );
};
