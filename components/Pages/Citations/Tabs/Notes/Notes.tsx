import React, { FC } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import styled from "styled-components";
import Flex from "antd/lib/flex";
import {
  EnhancedInput,
  EnhancedRadio,
  EnhancedRadioGroup,
  EnhancedTextArea,
} from "../../../../CommonComponents/Fields/EnhancedInput";
import EnhancedSelect from "../../../../CommonComponents/Fields/EnhancedInput/EnhancedSelect";
import Button from "antd/lib/button";
import { FormData } from "../../AddCitationsI";

type NotesProps = {
  isGlanceView?: boolean;
  customWidth?: string;
  customPadding?: string;
  setformData: (data: FormData) => void;
  formData: FormData;
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
  formData,
  setformData,
  customWidth,
  customPadding,
  isGlanceView,
}) => {
  const initialValues = {
    comments: "",
    incidentSummary: "",
    mode: "none",
    otherMethod: "none",
    lock: "none",
    pbtNumber: "",
    squadNumber: "",
    isInDashVideoAvailable: true,
    observations: "audioClear",
  };

  const notesForm = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <FormikProvider value={notesForm}>
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
              <EnhancedSelect
                name="mode"
                label="Mode"
                options={modeOptions}
                containerStyles={{ width: customWidth ?? "10%" }}
              />
              <EnhancedSelect
                name="lock"
                label="Lock"
                options={lockOptions}
                containerStyles={{ width: customWidth ?? "10%" }}
              />
              <EnhancedSelect
                name="otherMethod"
                label="Other Method"
                options={otherMethodOptions}
                containerStyles={{ width: customWidth ?? "10%" }}
              />
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

            {!isGlanceView && (
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
            )}
          </Flex>
        </StyledFormContainer>
      </Form>
    </FormikProvider>
  );
};

export default Notes;
