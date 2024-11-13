"use client";

import React, { FC, useState } from "react";
import styled from "styled-components";
import { Form, FormikProvider, useFormik } from "formik";
import Flex from "antd/lib/flex";
import EnhancedRadio from "../../../../CommonComponents/Fields/EnhancedInput/EnhancedRadio";
import EnhancedTextInput from "../../../../CommonComponents/Fields/EnhancedInput/EnhancedInput";
import EnhancedRadioGroup from "../../../../CommonComponents/Fields/EnhancedInput/EnhancedRadioGroup";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";

type ViolationProps = {
  isGlanceView?: boolean;
  customWidth?: string;
  customPadding?: string;
};

const StyledFormContainer = styled.div<{ $customPadding?: string }>`
  ${({ $customPadding }) => `padding: ${$customPadding ?? "16px"};`}
`;

const Violations: FC<ViolationProps> = ({
  customWidth,
  customPadding,
  isGlanceView,
}) => {
  const [showViolationModal, setShowViolationModal] = useState<boolean>(false);

  const initialValues = {
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
  };

  const onSubmit = (values: any) => {
    console.log(values);
  };

  const violationsForm = useFormik({
    initialValues,
    onSubmit,
  });

  const toggleViolationModal = (state: boolean): void => {
    setShowViolationModal(state);
  };

  const onOk = (): void => toggleViolationModal(false);

  const onCancel = (): void => toggleViolationModal(false);

  return (
    <StyledFormContainer $customPadding={customPadding}>
      <FormikProvider value={violationsForm}>
        <Form>
          <Modal open={showViolationModal} onOk={onOk} onCancel={onCancel}>
            <Flex
              gap="middle"
              align="flex-start"
              style={{ paddingBottom: "24px" }}
              vertical
            >
              <h3>Add Violation</h3>

              <Flex gap="middle" justify="center" vertical>
                <Flex gap="middle" align="center" justify="space-between">
                  <EnhancedTextInput
                    name="category"
                    label="Category"
                    width="40%"
                  />

                  <EnhancedRadioGroup
                    name="statusType"
                    dir="row"
                    items={[
                      { label: "State", value: "state" },
                      { label: "County", value: "county" },
                      { label: "City", value: "city" },
                    ]}
                  />
                </Flex>

                <Flex gap="middle" justify="center">
                  <EnhancedTextInput
                    name="searchStatueOrOrdinance"
                    label="Search Statue/Ordinance"
                  />
                  <EnhancedTextInput
                    name="searchDescription"
                    label="Search Description"
                  />
                </Flex>

                <Flex gap="middle" align="center" justify="space-between">
                  <EnhancedTextInput name="nibrsCode" label="NIBRS Code" />
                  <EnhancedTextInput name="level" label="Level" />
                  <EnhancedRadio name="addThirdViolation">
                    3rd Violation
                  </EnhancedRadio>
                </Flex>
              </Flex>
            </Flex>
          </Modal>

          <Flex gap="middle" vertical wrap>
            {!isGlanceView && (
              <Flex
                gap="middle"
                align="center"
                justify="space-between"
                style={{ padding: "12px" }}
                wrap
              >
                <EnhancedRadio name="endangerLifeOrProperty">
                  Endanger Life or Property
                </EnhancedRadio>

                <Button
                  onClick={(): void => {
                    toggleViolationModal(true);
                  }}
                >
                  Add Violation
                </Button>
              </Flex>
            )}

            <Flex gap="middle" align="center" style={{ padding: "12px" }} wrap>
              <EnhancedTextInput
                name="statueOrOrdinance"
                label="Statue/Ordinance"
                width="20%"
              />
              <EnhancedTextInput
                name="description"
                label="Description"
                width="20%"
              />
              <EnhancedRadio
                name="thirdViolation"
                style={{ justifyContent: "flex-end" }}
              >
                3rd Violation
              </EnhancedRadio>
            </Flex>

            <Flex gap="middle" align="center" wrap vertical={false}>
              <Flex gap="middle" align="center" wrap vertical>
                <Flex
                  gap="middle"
                  align="center"
                  style={{ padding: "12px" }}
                  wrap
                >
                  <EnhancedTextInput
                    name="speed"
                    label="Speed (MPH)"
                    width="15%"
                  />
                  <EnhancedTextInput
                    name="zone"
                    label="Zone (MPH)"
                    width="15%"
                  />
                  <EnhancedTextInput
                    name="disobey"
                    label="Disobey"
                    width="15%"
                  />
                </Flex>

                <Flex
                  gap="middle"
                  align="center"
                  style={{ padding: "12px" }}
                  wrap
                >
                  <EnhancedTextInput
                    name="acTaken"
                    label="AC Taken"
                    width="15%"
                  />
                  <EnhancedTextInput
                    name="acTestType"
                    label="AC Test Type"
                    width="15%"
                  />
                  <EnhancedTextInput
                    name="acReading"
                    label="AC Reading"
                    width="15%"
                  />
                </Flex>
              </Flex>

              <Flex
                gap="middle"
                align="center"
                style={{ padding: "12px" }}
                wrap
                vertical
              >
                <EnhancedRadioGroup
                  dir={isGlanceView ? "row" : "col"}
                  name="status"
                  items={[
                    {
                      label: "Other Substance",
                      value: "otherSubstance",
                    },
                    {
                      label: "Refused",
                      value: "refused",
                    },
                    {
                      label: "Fingerprinted",
                      value: "fingerPrinted",
                    },
                    {
                      label: "In Custody",
                      value: "inCustody",
                    },
                  ]}
                />
              </Flex>
            </Flex>

            {!isGlanceView && (
              <>
                <Flex
                  gap="middle"
                  align="center"
                  wrap
                  vertical={false}
                  style={{ padding: "12px" }}
                >
                  <Flex
                    gap="small"
                    align="flex-start"
                    justify="flex-end"
                    vertical
                  >
                    <EnhancedRadio name="speciesNumber">
                      Species/No.
                    </EnhancedRadio>
                    <EnhancedTextInput name="speciesNumberValue" />
                  </Flex>
                  <Flex
                    gap="small"
                    align="flex-start"
                    justify="flex-end"
                    vertical
                  >
                    <EnhancedRadio name="wildlifeRestitution">
                      Wildlife Restitution
                    </EnhancedRadio>
                    <EnhancedTextInput name="wildlifeRestitutionValue" />
                  </Flex>
                </Flex>

                <Flex
                  align="center"
                  justify="flex-end"
                  style={{ padding: "12px" }}
                >
                  <Button onClick={(): void => {}} style={{ marginLeft: 12 }}>
                    Clear all Fields
                  </Button>
                </Flex>
              </>
            )}
          </Flex>
        </Form>
      </FormikProvider>
    </StyledFormContainer>
  );
};

export default Violations;
