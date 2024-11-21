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
import { FormData } from "./AddCitationsI";
import { ButtonComponents } from "@/components/CommonComponents/Fields/Button/ButtonComponents";
import PrintersAndScanners from "./setting/PrintersAndScanners";

const { SplitView, GridView, Setting, newLogo, theme ,account} = images;

export const AddCitations: React.FC = () => {
  const [activeBtn, setActiveBtn] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [glanceView, setGlanceView] = useState<boolean>(false);
  const [formData, setformData] = useState<FormData>({
    Vehicles: {
      plate: null,
      state: null,
      expiration: null,
      noPlate: false,
      twentyOneDayPlate: false,
      make: null,
      model: null,
      year: null,
      color: null,
      style: null,
      type: null,
      vin: null,
      isCommercialVehicle: true,
      hasHazardousMaterial: false,
      dotNumber: null,
      poundsOverWeight: null,
      occupants: null,
      hasMotorcycle: false,
      hasTrailer: false,
      is16PlusPass: false,
    },
    Subject: {
      plate: null,
      identificationType: null,
      subjectType: null,
      dlState: null,
      cdl: false,
      parked: false,
      lastName: null,
      firstName: null,
      middleName: null,
      suffix: null,
      address: null,
      apt: null,
      city: null,
      state: null,
      zip: null,
      race: null,
      gender: null,
      dob: null,
      age: null,
      isJuvenileCourtOffense: false,
      juvenileOffenseType: null,
      height: null,
      weight: null,
      hair: null,
      eyes: null,
      driver: false,
      owner: false,
      citee: false,
      passenger: false,
      LicenseNumber: null
    },
    Location: {
      address: null,
      apt: null,
      city: null,
      state: null,
      zip: null,
      weather: null,
      direction: null,
      parkingMeterNumber: null,
      meterType: null,
      zoneType: null,
      hasStopLocation: null,
      stopLocationAddress: null,
      stopLocationApt: null,
      stopLocationCity: null,
      stopLocationState: null,
      stopLocationZip: null,
    },
    Violation: {
      endangerLifeOrProperty: true,
      category: null,
      statusType: null,
      searchStatueOrOrdinance: null,
      searchDescription: null,
      nibrsCode: null,
      level: null,
      violations: [
        {
          thirdViolation: true,
          statueOrOrdinance: null,
          description: null,
        },
      ], // Initialize as an array of objects
      addThirdViolation: true,
      speed: null,
      zone: null,
      disobey: null,
      acTaken: null,
      acTesType: null,
      acReading: null,
      status: null,
      speciesNumber: false,
      speciesNumberValue: null,
      wildlifeRestitution: false,
    },
    Notes: {
      comments: null,
      incidentSummary: null,
      mode: null,
      otherMethod: null,
      lock: null,
      pbtNumber: null,
      squadNumber: null,
      isInDashVideoAvailable: true,
      observations:null,
      Residential :false,
      Rural:false,
      Divided: false,
      Other: false,
      ImpairedVisibility: false,
      TrafficPresent: false,
      Freeway: false,
      Slippery:false,
      CauseToDodge:false,
      Rain:false,
      Snow:false,
      Fog:false,
      ConditionOther:false,
      ViolatorDirection : null,
      Lane:null,
      Method:null,
      SquadDirection:null,
      SquadNumber:null,
      audio :false,     
      Video: false,
      ObservationVehicleOverPosted : false,
      AudoClear :false,
      AlwaysInSight : false,
      OtherTraffic:null,
      SingleTarget : false,
      otherTarget :null, 
      Terrain: null,
      SeatBelt : false,
      WarningOther: null,
      Insurance : null,    
      meeting:false,
      Following:false,
      AtStop:false,
      Admitted:false,
      otherWarning: null,
      NoOtherTraffic:false,
    },
    CitationInfo: {
      citationType: null,
      deliveryMethod: null,
      offenseDate: null,
      offenseTime: null,
      officer: null,
      badge: null,
      caseOrICRNumber: null,
      county: null,
      prosecutingCourt: null,
      prosecutingEntity: null,
      mandatoryCourt: false,
    }
  })

  const [settingTab, setsettingTab] = useState<boolean>(false);

  const [selectedPrinter, setSelectedPrinter] = useState<string>("");

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
            <Image alt="Logo" src={newLogo} height={100} width={150} />
            <Flex gap="small">
              <ButtonComponents
                name="Impound"
                showBackgroundColor={activeBtn === 1 ? true : false}
                color={activeBtn === 1 ? "#00FFFF" : "gray"}
                textColor={activeBtn === 1 ? "#fff" : "gray"}
                borderColor={activeBtn === 1 ? "gray" : "gray"}
                handleClick={() => {
                  setActiveBtn(1);
                }}
              />

              <ButtonComponents
                name="New Ticket"
                showBackgroundColor={activeBtn === 2 ? true : false}
                color={activeBtn === 2 ? "#00FFFF" : "gray"}
                textColor={activeBtn === 2 ? "#fff" : "gray"}
                borderColor={activeBtn === 2 ? "gray" : "gray"}
                handleClick={() => {
                  setActiveBtn(2);
                }}
              />

              <ButtonComponents
                name="Print Ticket"
                showBackgroundColor={activeBtn === 3 ? true : false}
                color={activeBtn === 3 ? "#00FFFF" : "gray"}
                textColor={activeBtn === 3 ? "#fff" : "gray"}
                borderColor={activeBtn === 3 ? "gray" : "gray"}
                handleClick={() => {
                  if (!selectedPrinter) {
                    console.error("No printer selected!");
                    alert("Please select a printer before downloading.");
                    return;
                  }

                  const content = {
                    title: "Example PDF",
                    body: "This PDF is generated from JSON content!",
                  };

                  // Trigger the printPDF method
                  window.electronAPI
                    .printPDF(selectedPrinter, content)
                    .then((response) => {
                      console.log("done");
                    })
                    .catch((error) => {
                      console.error("Error while printing PDF:", error);
                      alert(
                        "An unexpected error occurred while printing the PDF."
                      );
                    });
                  setActiveBtn(3);
                }}
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
                  onClick={() => {}}
                  icon={
                    <Image src={theme} alt="grid view" height={20} width={20} />
                  }
                  style={{ border: glanceView ? "1px solid #4096ff" : "none" }}
                  title="Grid View"
                />
              </Tooltip>

              <Tooltip title="Setting" placement="bottom">
                <Button
                  onClick={() => {
                    setsettingTab(true);
                  }}
                  icon={
                    <Image
                      src={Setting}
                      alt="grid view"
                      height={20}
                      width={20}
                    />
                  }
                  // style={{ border: glanceView ? "1px solid #4096ff" : "none" }}
                  title="Grid View"
                />
              </Tooltip>

              <Tooltip title="account" placement="bottom">
                <Button
                  onClick={() => { }}
                  icon={
                    <Image
                      src={account}
                      alt="grid view"
                      height={20}
                      width={20}
                    />
                  }
                  // style={{ border: glanceView ? "1px solid #4096ff" : "none" }}
                  title="Grid View"
                />
              </Tooltip>
            </Flex>
          </Flex>

          {settingTab ? (
            <PrintersAndScanners selectedPrinter={selectedPrinter} setSelectedPrinter={setSelectedPrinter} />
          ) : (
            <>
              {!glanceView && (
                <Flex gap="middle" vertical wrap>
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

                  {activeTab === 0 && (
                    <Subject setformData={setformData} formData={formData} />
                  )}
                  {activeTab === 1 && (
                    <Vehicles setformData={setformData} formData={formData} />
                  )}
                  {activeTab === 2 && (
                    <Location formData={formData} setformData={setformData} />
                  )}
                  {activeTab === 3 && (
                    <Violations setformData={setformData} formData={formData} />
                  )}
                  {activeTab === 4 && (
                    <CitationInformation
                      setformData={setformData}
                      formData={formData}
                    />
                  )}
                  {activeTab === 5 && (
                    <Notes setformData={setformData} formData={formData} />
                  )}
                </Flex>
              )}

              {glanceView && (
                <GlanceView setformData={setformData} formData={formData} />
              )}
            </>
          )}
        </Flex>
      </div>
    </>
  );
};
