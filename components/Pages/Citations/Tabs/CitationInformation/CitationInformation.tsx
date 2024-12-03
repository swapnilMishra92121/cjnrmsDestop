"use client";

import React, { FC, useEffect, useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import styled from "styled-components";
import Flex from "antd/lib/flex";
import EnhancedSelect from "../../../../CommonComponents/Fields/EnhancedInput/EnhancedSelect";
import {
  EnhancedPicker,
  EnhancedRadio,
} from "../../../../CommonComponents/Fields/EnhancedInput";
import EnhancedTextInput from "../../../../CommonComponents/Fields/EnhancedInput/EnhancedInput";
import Button from "antd/lib/button";
import { FormData } from "../../AddCitationsI";

type CitationInformationProps = {
  isGlanceView?: boolean;
  customWidth?: string;
  customPadding?: string;
  setformData: (data: FormData) => void;
  formData: FormData
};

const StyledFormContainer = styled.div<{ $customPadding?: string }>`
  ${({ $customPadding }) => `padding: ${$customPadding ?? "16px"};`}
`;

const citationOptions = [
  { label: "Citation Type 1", value: "citationType1" },
  { label: "Citation Type 2", value: "citationType2" },
  { label: "Citation Type 3", value: "citationType3" },
  { label: "Citation Type 4", value: "citationType4" },
];

const deliveryOptions = [
  { label: "Delivery Method Type 1", value: "deliveryType1" },
  { label: "Delivery Method Type 2", value: "deliveryType2" },
  { label: "Delivery Method Type 3", value: "deliveryType3" },
  { label: "Delivery Method Type 4", value: "deliveryType4" },
];

const officerOptions = [
  { label: "Officer 1", value: "officer1" },
  { label: "Officer 2", value: "officer2" },
  { label: "Officer 3", value: "officer3" },
  { label: "Officer 4", value: "officer4" },
];

const countyOptions = [
  { label: "County 1", value: "county1" },
  { label: "County 2", value: "county2" },
  { label: "County 3", value: "county3" },
  { label: "County 4", value: "county4" },
];

const prosecutingCourtOptions = [
  { label: "Prosecuting Court 1", value: "prosecutingCourt1" },
  { label: "Prosecuting Court 2", value: "prosecutingCourt2" },
  { label: "Prosecuting Court 3", value: "prosecutingCourt3" },
  { label: "Prosecuting Court 4", value: "prosecutingCourt4" },
];

const prosecutingEntityOptions = [
  { label: "Prosecuting Entity 1", value: "prosecutingEntity1" },
  { label: "Prosecuting Entity 2", value: "prosecutingEntity2" },
  { label: "Prosecuting Entity 3", value: "prosecutingEntity3" },
  { label: "Prosecuting Entity 4", value: "prosecutingEntity4" },
];

const CitationInformation: FC<CitationInformationProps> = ({
  isGlanceView = false,
  customWidth,
  customPadding,
  setformData,
  formData
}) => {
  const initialValues = {
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
  } as const;

  const onSubmit = (values: any) => {
    console.log(values);
  };

  const citationInfoForm = useFormik<typeof initialValues>({
    initialValues,
    onSubmit,
  });

  useEffect(() => {
    setformData({
      ...formData,
      CitationInfo: citationInfoForm?.values
    })
  }, [citationInfoForm?.values]);

  return (
    <FormikProvider value={citationInfoForm}>
      <Form>
        <StyledFormContainer $customPadding={customPadding}>
          <Flex gap="middle" vertical wrap>
            <Flex gap="middle" align="flex-end" wrap>
              <EnhancedSelect
                label="Citation Type"
                name="citationType"
                options={citationOptions}
                containerStyles={{ width: customWidth ?? "10%" }}
              />
              <EnhancedSelect
                label="Delivery Method"
                name="deliveryMethod"
                options={deliveryOptions}
                containerStyles={{ width: customWidth ?? "10%" }}
              />
              <EnhancedPicker
                type="date"
                name="offenseDate"
                label="Offense Date"
              />
              <EnhancedPicker
                type="time"
                name="offenseTime"
                label="Offense Time"
              />
            </Flex>

            <Flex gap="middle" align="flex-end" wrap>
              <EnhancedSelect
                label="Officer"
                name="officer"
                options={officerOptions}
                containerStyles={{ width: customWidth ?? "10%" }}
              />
              <EnhancedTextInput label="Badge" name="badge" width="20%" />
              <EnhancedTextInput
                label="Case/ICR Number"
                name="caseOrICRNumber"
                width="20%"
              />
            </Flex>

            <Flex gap="middle" align="flex-end" wrap>
              <EnhancedSelect
                label="County"
                name="county"
                options={countyOptions}
                containerStyles={{ width: "19%" }}
              />
              <EnhancedSelect
                label="Prosecuting Court"
                name="prosecutingCourt"
                options={prosecutingCourtOptions}
                containerStyles={{ width: "19%" }}
              />
              
                <EnhancedSelect
                  label="Prosecuting Entity"
                  name="prosecutingEntity"
                  options={prosecutingEntityOptions}
                  containerStyles={{ width: "19%" }}
                />

                <EnhancedRadio name="mandatoryCourt">
                  Mandatory Court
                </EnhancedRadio>
              
            </Flex>



            {!isGlanceView && (
              <Flex
                align="center"
                justify="flex-end"
                style={{ padding: "12px" }}
              >
                <Button
                  onClick={(): void => {
                    citationInfoForm.resetForm();
                  }}
                  style={{ marginLeft: 12 }}
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

export default CitationInformation;
