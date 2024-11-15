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
const { SplitView, GridView, Setting } = images;










export const AddCitations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [glanceView, setGlanceView] = useState<boolean>(false);
  const [locationFormFields, setLocationFormFields] = useState<LocationI>({
    type: "Location",
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
  });





  const [formData,setformData]=useState<FormData>({
    Vehicles:{
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
    Subject:{
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
      LicenseNumber:""
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
          <Flex gap="middle" justify="space-between">
            <h4 style={{ display: "flex" }}>Add Citation</h4>

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

              <Tooltip title="Setting" placement="bottom">
                <Button
                  onClick={() => {}}
                  icon={
                    <Image
                      src={Setting}
                      alt="grid view"
                      height={16}
                      width={16}
                    />
                  }
                  style={{ border: glanceView ? "1px solid #4096ff" : "none" }}
                  title="Grid View"
                />
              </Tooltip>
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

              {activeTab === 0 && <Subject setformData={setformData} formData={formData} />}
              {activeTab === 1 && <Vehicles setformData={setformData} formData={formData} />}
              {activeTab === 2 && (
                <Location
                  locationFormFields={locationFormFields}
                  setLocationFormFields={setLocationFormFields}
                />
              )}
              {activeTab === 3 && <Violations />}
              {activeTab === 4 && <CitationInformation />}
              {activeTab === 5 && <Notes />}
            </Flex>
          )}

          {glanceView && <GlanceView setformData={setformData} formData={formData} />}
        </Flex>
      </div>
    </>
  );
};
