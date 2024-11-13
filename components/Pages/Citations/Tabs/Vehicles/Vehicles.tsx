"use client";

import React, { FC } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import styled from "styled-components";
import Flex from "antd/lib/flex";
import Button from "antd/lib/button";

import {
  EnhancedCheckbox,
  EnhancedInput,
  EnhancedPicker,
  EnhancedSelect,
} from "../../../../CommonComponents/Fields/EnhancedInput";

type VehicleProps = {
  customWidth?: string;
  customPadding?: string;
  isGlanceView?: boolean;
};

const StyledFormContainer = styled.div<{ $customPadding?: string }>`
  ${({ $customPadding }) => `padding: ${$customPadding ?? "16px"};`}
`;

const Vehicles: FC<VehicleProps> = ({
  customWidth,
  customPadding,
  isGlanceView,
}) => {
  const vehicleForm = useFormik({
    initialValues: {
      plate: "",
      state: "",
      expiration: "",
      noPlate: false,
      twentyOneDayPlate: false,
      make: "",
      model: "",
      year: "",
      color: "",
      style: "1",
      type: "1",
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
    onSubmit: (values: any) => {
      console.log(values);
    },
  });

  return (
    <StyledFormContainer $customPadding={customPadding}>
      <FormikProvider value={vehicleForm}>
        <Form>
          <Flex gap="large" vertical wrap>
            <Flex gap="middle" align="flex-end" wrap>
              <Flex gap="middle" align="flex-end" wrap>
                <EnhancedInput name="plate" label="Plate" width="30%" />
                <EnhancedSelect
                  name="state"
                  label="State"
                  containerStyles={{ width: customWidth ?? "20%" }}
                  options={[
                    { label: "CA", value: "ca" },
                    { label: "TX", value: "tx" },
                    { label: "NY", value: "ny" },
                  ]}
                />

                <EnhancedPicker
                  type="date"
                  name="expiration"
                  label="Expiration"
                  width="20%"
                />
              </Flex>

              <Flex gap="small" vertical wrap>
                <EnhancedCheckbox name="noPlate">No Plate</EnhancedCheckbox>
                <EnhancedCheckbox name="twentyOneDayPlate">
                  21 Day Plate
                </EnhancedCheckbox>
              </Flex>
            </Flex>

            <Flex gap="middle" align="flex-end" wrap>
              <EnhancedInput name="make" label="Make" width="20%" />
              <EnhancedInput name="model" label="Model" width="20%" />
              <EnhancedInput name="year" label="Year" width="20%" />
              <EnhancedInput name="color" label="Color" width="20%" />
            </Flex>

            <Flex gap="middle" align="flex-end" wrap>
              <EnhancedSelect
                name="style"
                label="Style"
                containerStyles={{ width: customWidth ?? "20%" }}
                options={[
                  { label: "4 Door", value: "1" },
                  { label: "3 Door", value: "2" },
                  { label: "2 Door", value: "3" },
                  { label: "5 Door", value: "4" },
                ]}
              />
              <EnhancedSelect
                name="type"
                label="Type"
                containerStyles={{ width: customWidth ?? "20%" }}
                options={[
                  { label: "Hatchback", value: "1" },
                  { label: "Sedan", value: "2" },
                  { label: "Utility", value: "3" },
                ]}
              />
              <EnhancedInput name="vin" label="VIN" width="30%" />
            </Flex>

            <Flex gap="middle" align="flex-end" wrap>
              <EnhancedCheckbox name="isCommercialVehicle">
                Commercial Vehicle
              </EnhancedCheckbox>
              <EnhancedCheckbox name="hasHazardousMaterial">
                Hazardous Material (DOT)
              </EnhancedCheckbox>
            </Flex>

            <Flex gap="middle" align="flex-end" wrap>
              <EnhancedInput name="dotNumber" label="DOT#" width="20%" />
              <EnhancedInput
                name="poundsOverWeight"
                label="Pounds Overweight"
                width="20%"
              />
              <EnhancedSelect
                name="occupants"
                label="Occupants"
                containerStyles={{ width: customWidth ?? "20%" }}
                options={[
                  { label: "2", value: "1" },
                  { label: "3", value: "2" },
                  { label: "4", value: "3" },
                  { label: "6", value: "4" },
                ]}
              />
            </Flex>

            <Flex gap="middle" align="flex-end" wrap>
              <EnhancedCheckbox name="hasMotorcycle">
                Motorcycle
              </EnhancedCheckbox>
              <EnhancedCheckbox name="hasTrailer">Trailer</EnhancedCheckbox>
              <EnhancedCheckbox name="is16PlusPass">16+ Pass</EnhancedCheckbox>
            </Flex>

            {!isGlanceView && (
              <Flex
                align="center"
                justify="flex-end"
                style={{ padding: "12px" }}
              >
                <Button
                  onClick={(): void => {
                    vehicleForm.resetForm();
                  }}
                >
                  Clear all Fields
                </Button>
              </Flex>
            )}
          </Flex>
        </Form>
      </FormikProvider>
    </StyledFormContainer>
  );
};

export default Vehicles;
