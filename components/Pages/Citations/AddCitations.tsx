"use client";
import "./addCitation.css";
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
import { AuditFormData, FormData } from "./AddCitationsI";
import { ButtonComponents } from "@/components/CommonComponents/Fields/Button/ButtonComponents";
import { ModalComponent } from "@/components/CommonComponents/Modal/ModalComponent";
import { LoginConfirmation } from "@/components/CommonComponents/Modal/LoginConfirmation/LoginConfirmation";
import PrintersAndScanners from "./setting/PrintersAndScanners";
import { Devicedetail } from "./component/Devicedetail/Devicedetail";
import { Loader } from "@/components/CommonComponents/Loader/Loader";



const { SplitView, GridView, Setting, newLogo, theme, account } = images;

export const AddCitations: React.FC = () => {
  const [loading,setLoading] = useState(false);
  const [unitId, setUnitId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [activeBtn, setActiveBtn] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [glanceView, setGlanceView] = useState<boolean>(false);
  const [showUpdatePopUp, setShowUpdatePopUp] = useState<boolean>(false);
  const [selectedPrinter, setSelectedPrinter] = useState<string>("");
  const [AuditData, setAuditData] = useState<AuditFormData | undefined>();
  const [showDeviceDetail, setShowDeviceDetail] = useState<boolean>(false);
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
      identificationType: "",
      subjectType: "",
      dlState: "",
      cdl: false,
      parked: false,
      lastName: "",
      firstName: "",
      middleName: "",
      suffix: "",
      address: "",
      apt: "",
      city: "",
      state: "",
      zip: "",
      race: "",
      gender: "",
      dob: "",
      age: "",
      isJuvenileCourtOffense: false,
      juvenileOffenseType: "",
      height: "",
      weight: "",
      hair: "",
      eyes: "",
      driver: false,
      owner: false,
      citee: false,
      passenger: false,
      LicenseNumber: "",
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
      violations: [
        {
          thirdViolation: false,
          statueOrOrdinance: "",
          description: "",
        },
      ],
      speed: "",
      zone: "",
      disobey: "",
      acTaken: "",
      acTestType: "",
      acReading: "",
      status: "",
      speciesNumber: "",
      speciesNumberValue: "",
      wildlifeRestitution: "",
      wildlifeRestitutionValue: "",
    },
    Notes: {
      comments: "",
      incidentSummary: "",
      mode: "",
      otherMethod: "",
      lock: "",
      pbtNumber: "",
      squadNumber: "",
      isInDashVideoAvailable: true,
      observations: "",
      Residential: false,
      Rural: false,
      Divided: false,
      Other: false,
      ImpairedVisibility: false,
      TrafficPresent: false,
      Freeway: false,
      Slippery: false,
      CauseToDodge: false,
      Rain: false,
      Snow: false,
      Fog: false,
      ConditionOther: false,
      ViolatorDirection: "",
      Lane: "",
      Method: "",
      SquadDirection: "",
      SquadNumber: "",
      audio: false,
      Video: false,
      ObservationVehicleOverPosted: false,
      AudoClear: false,
      AlwaysInSight: false,
      OtherTraffic: "",
      SingleTarget: false,
      otherTarget: "",
      Terrain: "",
      SeatBelt: false,
      WarningOther: "",
      Insurance: "",
      meeting: false,
      Following: false,
      AtStop: false,
      Admitted: false,
      otherWarning: "",
      NoOtherTraffic: false,
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
      mandatoryCourt: false,
    },
  });


  const loginHandler = () => {
    window.electronAPI.sendLogin();
  };

  const logOutHandler = async () => {
    await window.electronAPI.logout();  // Call logout function
    setToken(null);  // Clear token from state in UI
    console.log("Logged out successfully");
  }

  useEffect(() => {
    const fetchToken = async () => {
      const access_token = await window.electronAPI.getToken();  // Fetch the token
      console.log("access_Token", access_token);
      setToken(access_token);
      if (access_token) {
        setShowDeviceDetail(true);
      }
    };
    fetchToken();
  }, [token]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isFirstRegis = window.localStorage.getItem("isFirstRegister");
      setUnitId(isFirstRegis);
    }
  }, []);

  return (
    <>
    <Loader loading={loading}/>
      {!token && (
        <ModalComponent
          open={true}
          width={1000}
          height={500}
          innerContant={
            <LoginConfirmation onClose={() => { }} onLogin={loginHandler} />
          }
        />
      )}

      {!unitId &&
        <ModalComponent
          open={showDeviceDetail}
          innerContant={<Devicedetail setShowDeviceDetail={setShowDeviceDetail}  setLoading={setLoading}/>}
        />}

      <div
        className="citation"
        style={{
          backgroundColor: glanceView ? "rgb(240, 242, 245)" : "white",
          overflow: "hidden",
        }}
      >
        <Flex gap="small" vertical wrap style={{ marginTop: "-20px" }}>
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
              {glanceView && (
                <ButtonComponents
                  name="Officer Notes"
                  showBackgroundColor={activeBtn === 4 ? true : false}
                  color={activeBtn === 4 ? "#00FFFF" : "gray"}
                  textColor={activeBtn === 4 ? "#fff" : "gray"}
                  borderColor={activeBtn === 4 ? "gray" : "gray"}
                  handleClick={() => {
                    setActiveBtn(4);
                  }}
                />
              )}
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
                    <Image src={theme} alt="grid view" height={20} width={20} />
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

              <Tooltip title="Setting" placement="bottom">
                <Button
                  onClick={() => {
                    setActiveTab(6);
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

              <ButtonComponents
                name="Logout"
                showBackgroundColor={true}
                color={"red"}
                textColor={"#fff"}
                borderColor={"gray"}
                handleClick={() => {
                  logOutHandler()
                }}
              />

              {/* <Button
                  onClick={() => {
                    logOutHandler()
                  }}
                  title="Logout"
                /> */}

            </Flex>
          </Flex>

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
                <Notes
                  setformData={setformData}
                  formData={formData}
                  selectedPrinter={selectedPrinter}
                  auditData={AuditData}
                  setAuditData={setAuditData}
                />
              )}

              {activeTab === 6 && (
                <PrintersAndScanners
                  selectedPrinter={selectedPrinter}
                  setSelectedPrinter={setSelectedPrinter}
                />
              )}
            </Flex>
          )}

          {glanceView && (
            <GlanceView
              setformData={setformData}
              formData={formData}
              activeBtn={activeBtn}
              setActiveBtn={setActiveBtn}
              selectedPrinter={selectedPrinter}
              auditData={AuditData}
              setAuditData={setAuditData}
            />
          )}
        </Flex>


      </div>
    </>
  );
};
