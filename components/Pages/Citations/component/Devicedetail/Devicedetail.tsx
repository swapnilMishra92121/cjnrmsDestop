"use client";
import React, { useEffect, useState } from "react";
import {
  DevicedetailIParams,
  setDesktopPropertiesIState,
} from "./DevicedetailIParams";
import { DropdownComponent } from "@/components/CommonComponents/Fields/Dropdown/DropdownComponent";
import "./LoginConfirmation.css";
import { ButtonComponents } from "@/components/CommonComponents/Fields/Button/ButtonComponents";
import { Button } from "antd";

const Unit = [
  { label: "Unit 1", value: "citationType1" },
  { label: "Unit 2", value: "citationType2" },
  { label: "Unit 3", value: "citationType3" },
  { label: "Unit 4", value: "citationType4" },
];

const Squad = [
  { label: "Squad 1", value: "citationType1" },
  { label: "Squad 2", value: "citationType2" },
  { label: "Squad 3", value: "citationType3" },
  { label: "Squad 4", value: "citationType4" },
];

export const Devicedetail: React.FC<DevicedetailIParams> = ({}) => {
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

  return (
    <div>
      <div style={{ display: "flex" }}>
        <DropdownComponent
          dataSource={Unit.map((state) => ({
            id: state.label,
            value: state.value,
          }))}
          fieldName="Unit"
          value={""}
          handleRowClick={(e) => {
            // onHandelValueChange("State", e);
          }}
        />

        <DropdownComponent
          dataSource={Squad.map((state) => ({
            id: state.label,
            value: state.value,
          }))}
          fieldName="Squad"
          value={""}
          handleRowClick={(e) => {
            // onHandelValueChange("State", e);
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
        <Button>Submit</Button>
      </div>
    </div>
  );
};
