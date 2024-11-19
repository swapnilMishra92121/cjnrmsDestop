import React, { FC, useEffect, useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import styled from "styled-components";
import Flex from "antd/lib/flex";
import {
  EnhancedCheckbox,
  EnhancedInput,
  EnhancedRadio,
  EnhancedRadioGroup,
  EnhancedTextArea,
} from "../../../../CommonComponents/Fields/EnhancedInput";
import EnhancedSelect from "../../../../CommonComponents/Fields/EnhancedInput/EnhancedSelect";
import Button from "antd/lib/button";
import "./Components/notes.css"
import { ButtonComponents } from "@/components/CommonComponents/Fields/Button/ButtonComponents";
import { openNotificationWithIcon } from "@/components/CommonComponents/Toster/Toster";
import { successAddedMessage } from "@/utils/const";
import { FormData } from "../../AddCitationsI";

type NotesProps = {
  isGlanceView?: boolean;
  customWidth?: string;
  customPadding?: string;
  setformData: (data: FormData) => void;
  formData: FormData
};

const StyledFormContainer = styled.div<{ $customPadding?: string }>`
  ${({ $customPadding }) => `padding: ${$customPadding ?? "16px"};`}
`;

const modeOptions = [
  { label: "N/A", value: "none" },
  { label: "Mode 2", value: "mode2" },
  { label: "Mode 3", value: "mode3" },
  { label: "Mode 4", value: "mode4" },
];

const lockOptions = [
  { label: "N/A", value: "none" },
  { label: "Lock 2", value: "lock2" },
  { label: "Lock 3", value: "lock3" },
  { label: "Lock 4", value: "lock4" },
];

const otherMethodOptions = [
  { label: "N/A", value: "none" },
  { label: "Other Method 2", value: "otherMethod2" },
  { label: "Other Method 3", value: "otherMethod3" },
  { label: "Other Method 4", value: "otherMethod4" },
];

const observationsOptions = [
  { label: "Observed Vehicle Over Posted", value: "observedVehicleOverPosted" },
  { label: "Audio Clear/Strong/Steady", value: "audioClear" },
  { label: "Always in Sight", value: "alwaysInSight" },
];

const Notes: FC<NotesProps> = ({
  customWidth,
  customPadding,
  isGlanceView,
  setformData,
  formData
}) => {
  const initialValues = {
    comments: formData?.Notes?.comments,
    incidentSummary: formData?.Notes?.incidentSummary,
    mode: formData?.Notes?.mode,
    otherMethod: formData?.Notes?.otherMethod,
    lock: formData?.Notes?.lock,
    pbtNumber: formData?.Notes?.pbtNumber,
    squadNumber: formData?.Notes?.squadNumber,
    isInDashVideoAvailable: formData?.Notes?.isInDashVideoAvailable,
    observations: formData?.Notes?.observations,
  };
  const [showPreview, setShowPreview] = useState<boolean>(false)
  const notesForm = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });




  const handleSubmit = () => {
    window.electronAPI.createSubjectOutputJsonFile(formData);
    openNotificationWithIcon("success", successAddedMessage);
  }

  useEffect(() => {
    setformData({
      ...formData,
      Notes: notesForm?.values
    })
  }, [notesForm?.values]);

  return (
    <FormikProvider value={notesForm} >
      <Flex style={{ display: "flex", gap: "20px" }}>
        <Flex>
          <Form>
            <StyledFormContainer $customPadding={customPadding}>
              <Flex gap="middle" vertical wrap>
                <Flex gap="middle" vertical wrap>
                  <EnhancedTextArea
                    name="comments"
                    label="Officer Comments/Suspect Admissions"
                  />
                </Flex>

                <Flex gap="middle" vertical wrap>
                  <EnhancedTextArea
                    name="incidentSummary"
                    label="Incident Summary"
                  />
                </Flex>

                <Flex gap="middle" align="flex-end" wrap>
                  {/* <EnhancedSelect
                    name="mode"
                    label="Mode"
                    options={modeOptions}
                    containerStyles={{ width: customWidth ?? "10%" }}
                  /> */}
                  <EnhancedInput name="mode" label="Mode" width="20%" />
                  <EnhancedInput name="lock" label="Lock" width="20%" />
                  <EnhancedInput name="otherMethod" label="Other Method" width="20%" />
                  {/* <EnhancedSelect
                    name="lock"
                    label="Lock"
                    options={lockOptions}
                    containerStyles={{ width: customWidth ?? "10%" }}
                  /> */}
                  {/* <EnhancedSelect
                    name="otherMethod"
                    label="Other Method"
                    options={otherMethodOptions}
                    containerStyles={{ width: customWidth ?? "10%" }}
                  /> */}
                </Flex>

                <Flex gap="middle" align="flex-end" wrap>
                  <EnhancedInput name="pbtNumber" label="PBT Number" width="20%" />
                  <EnhancedInput
                    name="squadNumber"
                    label="Squad Number"
                    width="20%"
                  />
                  <EnhancedRadio name="isInDashVideoAvailable">
                    In-Dash Video Available
                  </EnhancedRadio>
                </Flex>

                <Flex gap="middle" align="flex-end" wrap>
                  <EnhancedRadioGroup
                    label="Observations"
                    dir="row"
                    name="observations"
                    items={observationsOptions}
                  />
                </Flex>
                <h3 className="meta_title_notes">Road Type</h3>
                <Flex gap="middle" align="flex-end" wrap>
                  <EnhancedCheckbox
                    name="Residential"
                    checked={false}
                  // onChange={vehicleForm.handleChange}
                  >
                    Residential
                  </EnhancedCheckbox>
                  <EnhancedCheckbox
                    name="Rural"
                    checked={false}
                  // onChange={vehicl}
                  >
                    Rural
                  </EnhancedCheckbox>
                  <EnhancedCheckbox
                    name="Rural"
                    checked={false}
                  // onChange={vehicleForm.handleChange}
                  >
                    Rural
                  </EnhancedCheckbox>

                  <EnhancedCheckbox
                    name="Divided"
                    checked={false}
                  // onChange={vehicleForm.handleChange}
                  >
                    Divided
                  </EnhancedCheckbox>

                  <EnhancedCheckbox
                    name="Other"
                    checked={false}
                  // onChange={vehicleForm.handleChange}
                  >
                    Other
                  </EnhancedCheckbox>
                </Flex>


                <h3 className="meta_title_notes">Unsafe Conditions</h3>
                <Flex gap="middle" align="flex-end" wrap>
                  <EnhancedCheckbox
                    name="ImpairedVisibility"
                    checked={false}
                  // onChange={vehicleForm.handleChange}
                  >
                    Impaired Visibility
                  </EnhancedCheckbox>
                  <EnhancedCheckbox
                    name="TrafficPresent"
                    checked={false}
                  // onChange={vehicl}
                  >
                    Traffic Present
                  </EnhancedCheckbox>
                  <EnhancedCheckbox
                    name="Freeway"
                    checked={false}
                  // onChange={vehicleForm.handleChange}
                  >
                    Freeway
                  </EnhancedCheckbox>

                  <EnhancedCheckbox
                    name="Slippery"
                    checked={false}
                  // onChange={vehicleForm.handleChange}
                  >
                    Slippery
                  </EnhancedCheckbox>

                  <EnhancedCheckbox
                    name="CauseToDodge"
                    checked={false}
                  // onChange={vehicleForm.handleChange}
                  >
                    Cause to Dodge
                  </EnhancedCheckbox>
                </Flex>

                <Flex gap="middle" align="flex-end" wrap>
                  <EnhancedCheckbox
                    name="Rain"
                    checked={false}
                  // onChange={vehicleForm.handleChange}
                  >
                    Rain
                  </EnhancedCheckbox>
                  <EnhancedCheckbox
                    name="Snow"
                    checked={false}
                  // onChange={vehicl}
                  >
                    Snow
                  </EnhancedCheckbox>
                  <EnhancedCheckbox
                    name="Fog"
                    checked={false}
                  // onChange={vehicleForm.handleChange}
                  >
                    Fog
                  </EnhancedCheckbox>

                  <EnhancedCheckbox
                    name="ConditionOther"
                    checked={false}
                  // onChange={vehicleForm.handleChange}
                  >
                    Other
                  </EnhancedCheckbox>


                </Flex>


                <Flex gap="middle" align="flex-end" wrap>
                  <EnhancedInput name="ViolatorDirection" label="Violator Direction" width="20%" />
                  <EnhancedInput name="Lane" label="Lane" width="10%" />
                  <EnhancedInput name="Method" label="Method" width="20%" />
                  {/* <EnhancedSelect
                name="state"
                label="State"
                containerStyles={{ width: customWidth ?? "5%" }}
                options={[
                  { label: "CA", value: "ca" },
                  { label: "TX", value: "tx" },
                  { label: "NY", value: "ny" },
                ]}
              /> */}

                  <Flex gap="middle" align="flex-end" wrap>
                    <EnhancedInput
                      name="SquadDirection"
                      label="Squad Direction"
                      width="20%"

                    />
                    <EnhancedInput name="Squad Number" label="Squad Number" width="20%" />
                    <Flex gap="middle" align="flex-end" wrap vertical>

                      <EnhancedCheckbox
                        name="audio"
                        checked={false}
                      // onChange={vehicleForm.handleChange}
                      >
                        Audio Recorded
                      </EnhancedCheckbox>
                      <EnhancedCheckbox
                        name="Video"
                        checked={false}
                      // onChange={vehicl}
                      >
                        Video Recorded
                      </EnhancedCheckbox>
                    </Flex>
                  </Flex>


                </Flex>

                <h3 className="meta_title_notes">Observation</h3>
                <Flex gap="middle" align="flex-end" wrap>
                  <EnhancedCheckbox
                    name="ObservationVehicleOverPosted"
                    checked={false}
                  // onChange={vehicleForm.handleChange}
                  >
                    Observation Vehicle Over Posted
                  </EnhancedCheckbox>
                  <EnhancedCheckbox
                    name="AudoClear"
                    checked={false}
                  // onChange={vehicl}
                  >
                    Audo Clear/Strong/Steady
                  </EnhancedCheckbox>
                  <EnhancedCheckbox
                    name="AlwaysInSight"
                    checked={false}
                  // onChange={vehicleForm.handleChange}
                  >
                    Always In Sight
                  </EnhancedCheckbox>
                </Flex>


                <h3 className="meta_title_notes">Traffic Survey</h3>
                <Flex gap={"70px"} align="flex-end" wrap>
                  <EnhancedCheckbox
                    name="ObservationVehicleOverPosted"
                    checked={false}
                  // onChange={vehicleForm.handleChange}
                  >
                    No Other Traffic
                  </EnhancedCheckbox>
                  <EnhancedInput name="OtherTraffic" label="Other Traffic" width="40%" />
                </Flex>


                <h3 className="meta_title_notes">Doppler Audio</h3>
                <Flex gap={"88px"} align="flex-end" wrap>
                  <EnhancedCheckbox
                    name="SingleTarget"
                    checked={false}
                  // onChange={vehicleForm.handleChange}
                  >
                    Single Target
                  </EnhancedCheckbox>
                  <Flex gap={"10px"}>
                    <EnhancedInput name="otherTarget" label="Other Target" width="35%" />
                    <EnhancedInput name="Terrain" label="Terrain" width="35%" />

                  </Flex>
                </Flex>



                <h3 className="meta_title_notes">Warning Issued</h3>
                <Flex gap="large" align="flex-end" wrap>
                  <EnhancedCheckbox
                    name="SeatBelt"
                    checked={false}
                  // onChange={vehicleForm.handleChange}
                  >
                    Seat Belt
                  </EnhancedCheckbox>

                  <EnhancedCheckbox
                    name="WarningOther"
                    checked={false}
                  // onChange={vehicleForm.handleChange}
                  >
                    Other
                  </EnhancedCheckbox>
                  <Flex  gap="small">
                    <EnhancedInput name="otherTarget" label="Other Warning" width="35%" />
                    <EnhancedInput name="Insurance" label="Insuranve" width="35%" />
                  </Flex>
                </Flex>

                <h3 className="meta_title_notes">No Seat Belt Use Observed When.</h3>
                <Flex gap="middle" align="flex-end" wrap>
                  <EnhancedCheckbox
                    name="meeting"
                    checked={false}
                  // onChange={vehicleForm.handleChange}
                  >
                    Meeting
                  </EnhancedCheckbox>
                  <EnhancedCheckbox
                    name="Following"
                    checked={false}
                  // onChange={vehicl}
                  >
                    Following
                  </EnhancedCheckbox>
                  <EnhancedCheckbox
                    name="AtStop"
                    checked={false}
                  // onChange={vehicleForm.handleChange}
                  >
                    At Stop
                  </EnhancedCheckbox>

                  <EnhancedCheckbox
                    name="Admitted"
                    checked={false}
                  // onChange={vehicleForm.handleChange}
                  >
                    Admitted
                  </EnhancedCheckbox>


                </Flex>


                {!isGlanceView && (
                  <Flex style={{ display: "flex", justifyContent: "space-between" }}>
                    <div></div>
                    <Flex>
                      <Flex
                        align="center"
                        justify="flex-end"
                        style={{ padding: "12px" }}
                      >
                        <Button
                          onClick={(): void => {
                            notesForm.resetForm();
                          }}
                        >
                          Clear all Fields
                        </Button>
                      </Flex>
                      <Flex
                        align="center"
                        justify="flex-end"
                        style={{ padding: "12px" }}
                      >
                        <ButtonComponents
                          showBackgroundColor={true}
                          name="Submit Ticket"
                          textColor="#fff"
                          color="#3672b3"
                          handleClick={(): void => {
                            handleSubmit();
                          }}
                        />

                      </Flex>
                    </Flex>
                  </Flex>
                )}
              </Flex>
            </StyledFormContainer>
          </Form>
        </Flex>
        {/* {
          showPreview &&
          <div>
            <div className="preview_pdf_container"></div>
            <div className="button_container">
              <ButtonComponents
                showBackgroundColor={true}
                name="Cancel Ticket"
                textColor="#808080"
                color="#e8f2f8"
                handleClick={() => setShowPreview(!showPreview)}
              />

              <ButtonComponents
                showBackgroundColor={true}
                name="Submit Ticket"
                textColor="#fff"
                color="#3672b3"
                handleClick={() => handleSubmit()}
              />


            </div>
          </div>
        } */}
      </Flex>
    </FormikProvider>
  );
};

export default Notes;
