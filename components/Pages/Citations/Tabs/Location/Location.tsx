"use client";

import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { Form, FormikProvider, useFormik } from "formik";

import { Flex } from "antd";
import {
  EnhancedCheckbox,
  EnhancedCheckboxGroup,
  EnhancedInput,
  EnhancedRadioGroup,
  EnhancedSelect,
} from "../../../../CommonComponents/Fields/EnhancedInput";
import { Button } from "antd/lib";
import { LocationI } from "./components/LocationFormI";
import { FormData } from "../../AddCitationsI";

type LocationProps = {
  customWidth?: string;
  customPadding?: string;
  isGlanceView?: boolean;
  formData: FormData
  setformData: (data: FormData) => void
};

const addressTypeOptions = [
  { label: "Street", value: "street" },
  { label: "Intersection", value: "intersection" },
  { label: "Block", value: "block" },
  { label: "Coordinates", value: "coordinates" },
];

const StyledFormContainer = styled.div<{ $customPadding?: string }>`
  ${({ $customPadding }) => `padding: ${$customPadding ?? "16px"};`}
`;

export const Location: FC<LocationProps> = ({
  customWidth,
  customPadding,
  isGlanceView = false,
  formData,
  setformData,
}) => {
  const locationsForm = useFormik({
    initialValues: {
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
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    setformData({
      ...formData,
      Location: locationsForm?.values
    })
  },[locationsForm?.values]);

  return (
    <StyledFormContainer $customPadding={customPadding}>
      <FormikProvider value={locationsForm}>
        <Form>
          <Flex gap="middle" vertical wrap>
            <Flex gap="middle" align="flex-end" wrap>
              <EnhancedRadioGroup
                dir="row"
                name="type"
                items={addressTypeOptions}
              />
            </Flex>

            <Flex gap="middle" align="flex-end" wrap>
              <EnhancedInput name="address" label="Address" width="20%" />
              <EnhancedInput name="apt" label="Apt" width="10%" />
              <EnhancedInput name="city" label="City" width="20%" />
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

              <EnhancedInput
                name="state"
                label="State"
                width="20%"

              />
              <EnhancedInput name="zip" label="ZIP" width="20%" />
            </Flex>

            <Flex gap="middle" align="flex-end" wrap>
              {/* <EnhancedSelect
                name="weather"
                label="Weather"
                containerStyles={{ width: customWidth ?? "10%" }}
                options={[
                  { label: "Clear", value: "clear" },
                  { label: "Cloudy", value: "cloudy" },
                  { label: "Misty", value: "misty" },
                  { label: "Rainy", value: "rainy" },
                ]}
              /> */}

              <EnhancedInput
                name="weather"
                label="Weather"
                width="20%"

              />
              {/* <EnhancedSelect
                name="direction"
                label="Direction of Travel"
                containerStyles={{ width: customWidth ?? "10%" }}
                options={[
                  { label: "North", value: "north" },
                  { label: "South", value: "south" },
                  { label: "West", value: "west" },
                  { label: "East", value: "east" },
                ]}
              /> */}

              <EnhancedInput
                name="direction"
                label="Direction of Travel"
                width="20%"

              />
              <EnhancedInput
                name="parkingMeterNumber"
                label="Parking Meter#"
                width="20%"
              />

              <EnhancedInput
                name="meterType"
                label="Meter Type"
                width="20%"

              />
              {/* <EnhancedSelect
                name="meterType"
                label="Meter Type"
                containerStyles={{ width: customWidth ?? "10%" }}
                options={[
                  { label: "Meter Type 1", value: "type 1" },
                  { label: "Meter Type 2", value: "type 2" },
                  { label: "Meter Type 3", value: "type 3" },
                  { label: "Meter Type 4", value: "type 4" },
                ]}
              /> */}
            </Flex>

            <Flex gap="middle" align="flex-end" justify="space-between" wrap>
              <EnhancedCheckboxGroup
                name="zoneType"
                items={[
                  { label: "School Zone", value: "school" },
                  { label: "Work Zone", value: "work" },
                  { label: "Crime at School", value: "crimeAtSchool" },
                ]}
              />

              {!isGlanceView && (
                <EnhancedCheckbox name="hasStopLocation">
                  Add Stop Location
                </EnhancedCheckbox>
              )}
            </Flex>
          </Flex>

          {!isGlanceView && (
            <Flex gap="middle" wrap vertical>
              <h5 style={{ display: "flex" }}>Stop Location</h5>

              <Flex gap="middle" align="flex-end" wrap>
                <EnhancedInput
                  name="stopLocationAddress"
                  label="Address"
                  width="20%"
                />
                <EnhancedInput
                  name="stopLocationApt"
                  label="Apt"
                  width="10%"
                />
                <EnhancedInput
                  name="stopLocationCity"
                  label="City"
                  width="20%"

                />

                <EnhancedInput
                  name="stopLocationState"
                  label="State"
                  width="20%"

                />
                {/* <EnhancedSelect
                  name="stopLocationState"
                  label="State"
                  containerStyles={{ width: customWidth ?? "10%" }}
                  options={[
                    { label: "CA", value: "ca" },
                    { label: "TX", value: "tx" },
                    { label: "NY", value: "ny" },
                  ]}

                /> */}
                <EnhancedInput
                  name="stopLocationZip"
                  label="ZIP"
                  width="10%"

                />
              </Flex>
            </Flex>
          )}

          {!isGlanceView && (
            <Flex gap="middle" align="flex-end" wrap>

              <Flex gap="middle">
                <Button
                >
                  Add Location
                </Button>
              </Flex>

              <Flex align="center" justify="flex-end" style={{ padding: "12px" }}>
                <Button
                  onClick={(): void => {
                    locationsForm.resetForm();
                  }}
                >
                  Clear all Fields
                </Button>
              </Flex>
            </Flex>
          )}
        </Form>
      </FormikProvider>
    </StyledFormContainer>
  );
};
