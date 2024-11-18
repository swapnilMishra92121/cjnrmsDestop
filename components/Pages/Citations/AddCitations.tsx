"use client";

import { useEffect, useState } from "react";
import Subject from "./Tabs/Subject/Subject";
import Vehicles from "./Tabs/Vehicles/Vehicles";
import { Location } from "./Tabs/Location/Location";
import Violations from "./Tabs/Violations/Violations";
import CitationInformation from "./Tabs/CitationInformation/CitationInformation";
import Notes from "./Tabs/Notes/Notes";
import Flex from "antd/lib/flex";
import Button from "antd/lib/button";
import Tooltip from "antd/lib/tooltip";
import GlanceView from "./GlanceView";
import images from "../../../assets";
import Image from "next/image";
import { TabsComponents } from "../../CommonComponents/TabsComponents/TabsComponents";
import { LocationI } from "./Tabs/Location/components/LocationFormI";
import { FormData } from "./AddCitationsI";
import { ButtonComponents } from "@/components/CommonComponents/Fields/Button/ButtonComponents";
import { openNotificationWithIcon } from "@/components/CommonComponents/Toster/Toster";
import { successAddedMessage } from "@/utils/const";



const { SplitView, GridView, Setting, newLogo, theme } = images;

export const AddCitations: React.FC = () => {
  const [activeBtn, setActiveBtn] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<number>(1);
  const [glanceView, setGlanceView] = useState<boolean>(false);
  const [formData, setformData] = useState<FormData>({
    Vehicles: {
      plate: "",
      state: "",
      expiration: "",
      noPlate: false,
      twentyOneDayPlate: false,
      make: "",
      model: "",
      year: "",
      color: "",
      style: "",
      type: "",
      vin: "",
      isCommercialVehicle: true,
      hasHazardousMaterial: false,
      dotNumber: "",
      poundsOverWeight: "",
      occupants: "",
      hasMotorcycle: false,
      hasTrailer: false,
      is16PlusPass: false,
    },
    Subject: {
      plate: "",
      identificationType: "1",
      subjectType: "1",
      dlState: "",
      cdl: true,
      parked: false,
      lastName: "",
      firstName: "",
      middleName: "",
      suffix: "1",
      address: "",
      apt: "",
      city: "",
      state: "",
      zip: "",
      race: "",
      gender: "",
      dob: "",
      age: "",
      isJuvenileCourtOffense: true,
      juvenileOffenseType: "",
      height: "",
      weight: "",
      hair: "",
      eyes: "",
      driver: true,
      owner: true,
      citee: false,
      passenger: false,
      LicenseNumber: ""
    },
    Location: {
      address: "",
      apt: "",
      city: "",
      state: "",
      zip: "",
      weather: "",
      direction: "",
      parkingMeterNumber: "",
      meterType: "",
      zoneType: "",
      hasStopLocation: "",
      stopLocationAddress: "",
      stopLocationApt: "",
      stopLocationCity: "",
      stopLocationState: "",
      stopLocationZip: "",
    },
    Violation: {
      endangerLifeOrProperty: true,
      category: "",
      statusType: "",
      searchStatueOrOrdinance: "",
      searchDescription: "",
      nibrsCode: "",
      level: "",
      addThirdViolation: true,
      statueOrOrdinance: "",
      description: "",
      thirdViolation: true,
      speed: "",
      zone: "",
      disobey: "",
      acTaken: "",
      acTesType: "",
      acReading: "",
      status: "refused",
      speciesNumber: true,
      speciesNumberValue: "",
      wildlifeRestitution: true,
    },
    Notes: {
      comments: "",
      incidentSummary: "",
      mode: "none",
      otherMethod: "none",
      lock: "none",
      pbtNumber: "",
      squadNumber: "",
      isInDashVideoAvailable: true,
      observations: "audioClear",
    },
    CitationInfo: {
      citationType: "",
      deliveryMethod: "",
      offenseDate: "",
      offenseTime: "",
      officer: "",
      badge: "",
      caseOrICRNumber: "",
      county: "",
      prosecutingCourt: "",
      prosecutingEntity: "",
      mandatoryCourt: true,
    }
  })

  return (
    <>
      <div
        className="citation"
        style={{
          backgroundColor: glanceView ? "rgb(240, 242, 245)" : "white",
          overflow: "hidden",
        }}
      >
        <Flex gap="small" vertical wrap>
          <Flex gap="middle" justify="space-between" align="center">
            {/* <h4 style={{ display: "flex" }}>Add Citation</h4> */}
            <Image
              alt="Logo"
              src={newLogo}
              height={100}
              width={150}
            />
            <Flex gap="small">
              <ButtonComponents
                name="Impound"
                showBackgroundColor={activeBtn === 1 ? true : false}
                color={activeBtn === 1 ? "#00FFFF" : "gray"}
                textColor={activeBtn === 1 ? "#fff" : "gray"}
                borderColor={activeBtn===1 ? "gray" : "gray"}
                handleClick={() => { setActiveBtn(1) }}
              />

              <ButtonComponents
                name="New Ticket"
                showBackgroundColor={activeBtn === 2 ? true : false}
                color={activeBtn === 2 ? "#00FFFF" : "gray"}
                textColor={activeBtn === 2 ? "#fff" : "gray"}
                borderColor={activeBtn===2 ? "gray" : "gray"}
                handleClick={() => { setActiveBtn(2) }}
              />

              <ButtonComponents
                name="Print Ticket"
                showBackgroundColor={activeBtn === 3 ? true : false}
                color={activeBtn === 3 ? "#00FFFF" : "gray"}
                textColor={activeBtn === 3 ? "#fff" : "gray"}
                borderColor={activeBtn===3 ? "gray" : "gray"}
                handleClick={() => { setActiveBtn(3) }}
              />
            </Flex>
            <Flex gap="small" align="center">
              <Tooltip title="Split View" placement="bottom">
                <Button
                  onClick={() => setGlanceView(false)}
                  icon={
                    <Image
                      src={SplitView}
                      alt="split view"
                      height={16}
                      width={16}
                    />
                  }
                  style={{ border: !glanceView ? "1px solid #4096ff" : "none" }}
                />
              </Tooltip>

              <Tooltip title="Grid View" placement="bottom">
                <Button
                  onClick={() => setGlanceView(true)}
                  icon={
                    <Image
                      src={GridView}
                      alt="grid view"
                      height={16}
                      width={16}
                    />
                  }
                  style={{ border: glanceView ? "1px solid #4096ff" : "none" }}
                  title="Grid View"
                />
              </Tooltip>

              <Tooltip title="theme" placement="bottom">
                <Button
                  onClick={() => { }}
                  icon={
                    <Image
                      src={theme}
                      alt="grid view"
                      height={20}
                      width={20}
                    />
                  }
                  style={{ border: glanceView ? "1px solid #4096ff" : "none" }}
                  title="Grid View"
                />
              </Tooltip>
            </Flex>
          </Flex>

          {!glanceView && (
            <Flex gap="middle" vertical wrap >
              <TabsComponents
                activeTab={activeTab}
                tabList={[
                  { name: "Subject", id: 1 },
                  { name: "Vehicles", id: 2 },
                  { name: "Location", id: 3 },
                  { name: "Violations", id: 4 },
                  { name: "Citation Information", id: 5 },
                  { name: "Notes", id: 5 },
                ]}
                handleTabChange={setActiveTab}
              />

              {activeTab === 0 && <Subject setformData={setformData} formData={formData} />}
              {activeTab === 1 && <Vehicles setformData={setformData} formData={formData} />}
              {activeTab === 2 && (
                <Location
                  formData={formData}
                  setformData={setformData}
                />
              )}
              {activeTab === 3 && <Violations setformData={setformData} formData={formData} />}
              {activeTab === 4 && <CitationInformation setformData={setformData} formData={formData} />}
              {activeTab === 5 && <Notes setformData={setformData} formData={formData} />}
            </Flex>
          )}

          {glanceView && <GlanceView setformData={setformData} formData={formData} />}
        </Flex>
      </div>
    </>
  );
};
