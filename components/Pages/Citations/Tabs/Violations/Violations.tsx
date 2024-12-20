"use client";

import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { Form, FormikProvider, useFormik, FieldArray } from "formik";
import Button from "antd/lib/button";
import Image from "next/image";
import images from "@/assets";
import EnhancedRadio from "../../../../CommonComponents/Fields/EnhancedInput/EnhancedRadio";
import EnhancedTextInput from "../../../../CommonComponents/Fields/EnhancedInput/EnhancedInput";
import EnhancedRadioGroup from "../../../../CommonComponents/Fields/EnhancedInput/EnhancedRadioGroup";

import { ViolationGroup } from "./Components/Violationl";
import { FormData } from "../../AddCitationsI";
import { Flex } from "antd";
import { ButtonComponents } from "@/components/CommonComponents/Fields/Button/ButtonComponents";

type ViolationProps = {
  isGlanceView?: boolean;
  customWidth?: string;
  customPadding?: string;
  setformData: (data: FormData) => void;
  formData: FormData;
};

const StyledFormContainer = styled.div<{ $customPadding?: string }>`
  ${({ $customPadding }) => `padding: ${$customPadding ?? "16px"};`}
`;

const Violations: FC<ViolationProps> = ({
  customPadding,
  isGlanceView,
  setformData,
  formData,
}) => {
  const initialValues = {
    endangerLifeOrProperty: formData.Violation?.endangerLifeOrProperty ?? true,
    violations: formData.Violation?.violations ?? [],
    speed: formData.Violation?.speed ?? "",
    zone: formData.Violation?.zone ?? "",
    disobey: formData.Violation?.disobey ?? "",
    acTaken: formData.Violation?.acTaken ?? "",
    acTestType: formData.Violation?.acTestType ?? "",
    acReading: formData.Violation?.acReading ?? "",
    status: formData.Violation?.status ?? "",
    speciesNumber: formData.Violation?.speciesNumber ?? "",
    speciesNumberValue: formData.Violation?.speciesNumberValue ?? "",
    wildlifeRestitution: formData.Violation?.wildlifeRestitution ?? "",
    wildlifeRestitutionValue:
      formData.Violation?.wildlifeRestitutionValue ?? "",
  };

  const onSubmit = (values: typeof initialValues) => {
    console.log("Submitted Values:", values);
  };

  const violationsForm = useFormik({
    initialValues,
    onSubmit,
  });


  useEffect(() => {
    setformData({
      ...formData,
      Violation: violationsForm.values,
    });
  }, [violationsForm.values]);

  return (
    <StyledFormContainer $customPadding={customPadding}>
      <FormikProvider value={violationsForm}>
        <Form>
          {!isGlanceView && (
            <div style={{ padding: "12px" }}>
              <EnhancedRadio name="endangerLifeOrProperty">
                Endanger Life or Property
              </EnhancedRadio>
            </div>
          )}

          <FieldArray
            name="violations"
            render={({ remove, push }) => (
              <Flex gap="12px" vertical>
                {violationsForm.values.violations.map((violation, index) => (
                  <Flex
                    key={index}
                    style={{
                      display: "flex",
                      gap: "12px",
                      padding: "12px",
                      alignItems: "center",
                    }}
                  >
                    <EnhancedTextInput
                      name={`violations.${index}.statueOrOrdinance`}
                      label="Statute/Ordinance"
                      width="20%"
                      value={violation.statueOrOrdinance} // Bind value for pre-filling
                    />
                    <EnhancedTextInput
                      name={`violations.${index}.description`}
                      label="Description"
                      width="20%"
                      value={violation.description} // Bind value for pre-filling
                    />
                    <EnhancedRadio
                      name={`violations.${index}.thirdViolation`}
                      style={{ justifyContent: "flex-end" }}
                      checked={violation.thirdViolation} // Bind value for pre-filling
                    >
                      3rd Violation
                    </EnhancedRadio>
                    {index !== 0 && (
                      <Button type="text" danger onClick={() => remove(index)}>
                        <Image
                          src={images?.Delete}
                          height={20}
                          width={20}
                          alt="Delete"
                        />
                      </Button>
                    )}
                    {index === violationsForm.values.violations.length - 1 && (
                      <ButtonComponents
                        name="Add"
                        showBackgroundColor={false}
                        color="#3672b3"
                        icon={images?.Add}
                        borderColor="#3672b3"
                        handleClick={() =>
                          push({
                            thirdViolation: false,
                            statueOrOrdinance: "",
                            description: "",
                          })
                        }
                      />
                    )}
                  </Flex>
                ))}
              </Flex>
            )}
          />

          <Flex style={{ padding: "12px" }} gap="12px">
            <EnhancedTextInput name="speed" label="Speed (MPH)" width="15%" />
            <EnhancedTextInput name="zone" label="Zone (MPH)" width="15%" />
            <EnhancedTextInput name="disobey" label="Disobey" width="15%" />
          </Flex>

          <Flex style={{ padding: "12px" }} gap="12px">
            <EnhancedTextInput name="acTaken" label="AC Taken" width="15%" />
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

          <Flex style={{ padding: "12px" }}>
            <EnhancedRadioGroup
              name="status"
              items={[
                { label: "Other Substance", value: "otherSubstance" },
                { label: "Refused", value: "refused" },
                { label: "Fingerprinted", value: "fingerPrinted" },
                { label: "In Custody", value: "inCustody" },
              ]}
            />
          </Flex>

          {!isGlanceView && (
            <Flex style={{ padding: "12px", textAlign: "right" }}>
              <Button
                style={{ marginLeft: "12px" }}
                onClick={() => violationsForm.resetForm()}
              >
                Clear all Fields
              </Button>
            </Flex>
          )}
        </Form>
      </FormikProvider>
    </StyledFormContainer>
  );
};

export default Violations;
