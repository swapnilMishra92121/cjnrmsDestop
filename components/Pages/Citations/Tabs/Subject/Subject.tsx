"use client";

import React, { FC, useEffect, useState } from "react";
import {
  EnhancedCheckbox,
  EnhancedInput,
  EnhancedPicker,
  EnhancedRadioGroup,
} from "../../../../CommonComponents/Fields/EnhancedInput";
import { Form, FormikProvider, useFormik } from "formik";
import styled from "styled-components";
import Flex from "antd/lib/flex";
import EnhancedSelect from "../../../../CommonComponents/Fields/EnhancedInput/EnhancedSelect";
import Button from "antd/lib/button";
import { parserVehicleDetailsResponce, PlateData } from "../Vehicles/VehiclesI";
import { perticulardataI } from "./Subjectsl";

type SubjectProps = {
  customWidth?: string;
  customPadding?: string;
  isGlanceView?: boolean;
};

const identificationTypeOptions = [
  { label: "DL", value: "1" },
  { label: "DVS web", value: "2" },
  { label: "Photo ID", value: "3" },
  { label: "FP", value: "4" },
  { label: "Other", value: "5" },
];

const subjectTypeOptions = [
  { label: "Individual", value: "1" },
  { label: "Business", value: "2" },
];

const StyledFormContainer = styled.div<{ $customPadding?: string }>`
  ${({ $customPadding }) => `padding: ${$customPadding ?? "16px"};`}
`;

const Subject: FC<SubjectProps> = ({
  customWidth,
  customPadding,
  isGlanceView = false,
}) => {
  const [allData, setAllData] = useState<parserVehicleDetailsResponce[]>([]);
  const [Plate, setPlate] = useState<PlateData[]>([]);

  const subjectForm = useFormik({
    initialValues: {
      plate:"",
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
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const juvenileSubjectForm = useFormik({
    initialValues: {
      juvenileInfoRequired: true,
      relationshipToChild: "",
      childGender: "",
      sameAddressAsJuvenile: false,
      childLastName: "",
      childFirstName: "",
      childMiddleName: "",
      childSuffix: "1",
      childAddress: "",
      childApt: "",
      childCity: "",
      childState: "",
      childZip: "",
      livesWith: false,
      childPhoneType: "",
      childSchool: "",
      childGrade: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const isJuvenileDetailsRequired =
    juvenileSubjectForm.values.juvenileInfoRequired;

    const initialRender = () => {
      window.electronAPI
        .readXMLFiles("driver_details")
        .then((e: string) => {
          const ParserSubjectDetailsResponce: any = e
            .trim()
            .split("\n")
            .map((line: string) => JSON.parse(line));
            console.log("Hello world",ParserSubjectDetailsResponce);

            const arr: PlateData[] = ParserSubjectDetailsResponce?.map((val:any) => ({
              lable: val?.DriverName ? val.DriverName : "",
              value: String(val._id),
            }));

            setAllData(ParserSubjectDetailsResponce);
            setPlate(arr);

        });
    };

useEffect(()=>{
  initialRender();
},[]);

  return (
    <StyledFormContainer $customPadding={customPadding}>
      <Flex gap="large" vertical wrap>
        <FormikProvider value={subjectForm}>
          <Form>
            <Flex gap="middle" vertical wrap>
              <Flex gap="middle" align="flex-end" justify="space-between" wrap>
                <EnhancedRadioGroup
                  label="Identification Type"
                  dir="row"
                  name="identificationType"
                  items={identificationTypeOptions}
                />
                <EnhancedRadioGroup
                  label="Subject Type"
                  dir="row"
                  name="subjectType"
                  items={subjectTypeOptions}
                />
              </Flex>

              <Flex gap="middle" align="flex-end" wrap>
             
                <EnhancedInput name="dl" label="DL" width="20%" />
                <EnhancedInput name="dlState" label="DL State" width="10%" />
                <EnhancedCheckbox name="cdl">CDL</EnhancedCheckbox>
                <EnhancedCheckbox name="parked">Parked</EnhancedCheckbox>
              </Flex>

              <Flex gap="middle" align="flex-end" wrap>
                <EnhancedInput name="lastName" label="Last Name" width="20%" />
                <EnhancedSelect
                  name="firstname"
                  label="First Name"
                  containerStyles={{ width: "20%" }}
                  options={Plate.map((val) => ({
                    value: val.value,
                    label: val.lable,
                  })).filter((val) => val.label)}
                  onChange={(e) => {
                    subjectForm.setFieldValue("plate", e);

                    const perticulardata: perticulardataI = JSON.parse(
                      allData.find((item) => item._id === Number(e))?.Fields ||
                        "{}"
                    );
                    console.log("perticular data",perticulardata);

                    subjectForm.setValues({
                      ...subjectForm.values,
                      plate: perticulardata?.plate ,
                      identificationType: perticulardata?.identificationType ,
                      subjectType: perticulardata?.subjectType,
                      dlState: perticulardata?.dlState,
                      cdl: perticulardata?.cdl,
                      parked: perticulardata?.parked,
                      lastName: perticulardata?.lastName,
                      firstName: perticulardata?.firstName,
                      middleName: perticulardata?.middleName,
                      suffix: perticulardata?.suffix,
                      address: perticulardata?.Address,
                      apt: perticulardata?.apt,
                      city: perticulardata?.City,
                      state: perticulardata?.State,
                      zip: perticulardata?.Zip,
                      race: perticulardata?.race,
                      gender: perticulardata?.gender,
                      dob: perticulardata?.DOB,
                      age: perticulardata?.age,
                      isJuvenileCourtOffense: perticulardata?.isJuvenileCourtOffense,
                      juvenileOffenseType: perticulardata?.juvenileOffenseType,
                      height: perticulardata?.Height,
                      weight: perticulardata?.Weight,
                      hair: perticulardata?.hair,
                      eyes: perticulardata?.Eye,
                      driver: perticulardata?.driver,
                      owner: perticulardata?.owner,
                      citee: perticulardata?.citee,
                      passenger: perticulardata?.passenger,
                    });
                  }}
                  value={subjectForm.values.firstName}
                />
                <EnhancedInput
                  name="middleName"
                  label="Middle Name"
                  width="20%"
                />
                <EnhancedInput name="suffix" label="Suffix" width="10%" />
              </Flex>

              <Flex gap="middle" align="flex-end" wrap>
                <EnhancedInput name="address" label="Address" width="20%" />
                <EnhancedInput name="apt" label="Apt" width="5%" />
                <EnhancedInput name="city" label="City" width="15%" />
                <EnhancedInput name="state" label="State" width="5%" />
                <EnhancedInput name="zip" label="ZIP" width="10%" />
              </Flex>

              <Flex gap="middle" align="flex-end" wrap>
                <EnhancedInput name="race" label="Race" width="15%" />
                <EnhancedInput name="gender" label="Gender" width="10%" />
                <EnhancedPicker
                  type="date"
                  name="dob"
                  label="DOB"
                  width="20%"
                />
                <EnhancedInput name="age" label="Age" width="5%" />
                <Flex gap="small" wrap vertical>
                  <EnhancedCheckbox name="isJuvenileCourtOffense">
                    Juvenile Court Offenses
                  </EnhancedCheckbox>
                  <EnhancedRadioGroup
                    name="juvenileOffenseType"
                    dir="row"
                    items={[
                      { label: "JTR", value: "1" },
                      { label: "JPO", value: "2" },
                      { label: "DEL", value: "3" },
                    ]}
                  />
                </Flex>
              </Flex>

              <Flex gap="middle" align="flex-end" wrap>
                <EnhancedInput name="height" label="Height" width="20%" />
                <EnhancedInput name="weight" label="Weight" width="10%" />
                <EnhancedInput name="hair" label="Hair" width="5%" />
                <EnhancedInput name="eyes" label="Eyes" width="5%" />
              </Flex>

              <Flex gap="middle" align="flex-end" justify="space-between" wrap>
                <Flex gap="middle" align="flex-end" wrap>
                  <EnhancedCheckbox name="driver">Driver</EnhancedCheckbox>
                  <EnhancedCheckbox name="owner">Owner</EnhancedCheckbox>
                  <EnhancedCheckbox name="citee">Citee</EnhancedCheckbox>
                  <EnhancedCheckbox name="passenger">
                    Passenger
                  </EnhancedCheckbox>
                </Flex>

                {!isGlanceView && (
                  <Flex gap="middle">
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ marginLeft: "8px" }}
                    >
                      Submit
                    </Button>
                    <Button
                      onClick={(): void => {
                        subjectForm.resetForm();
                      }}
                    >
                      Clear all Fields
                    </Button>
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Form>
        </FormikProvider>
        {!isGlanceView && (
          <FormikProvider value={juvenileSubjectForm}>
            <Form>
              <Flex gap="middle" wrap vertical>
                <h4 style={{ color: "#778891" }}>Parent/Guardian Contact</h4>
                <EnhancedCheckbox name="juvenileInfoRequired">
                  Payable citation - no Juvenile info required
                </EnhancedCheckbox>

                <Flex gap="middle" align="flex-end" wrap>
                  <EnhancedSelect
                    label="Relationship To Child"
                    name="relationshipToChild"
                    containerStyles={{ width: customWidth ?? "10%" }}
                    options={[
                      { label: "Father", value: "1" },
                      { label: "Mother", value: "2" },
                      { label: "Brother", value: "3" },
                      { label: "Sister", value: "4" },
                    ]}
                    disabled={isJuvenileDetailsRequired}
                  />

                  <EnhancedSelect
                    label="Gender"
                    name="childGender"
                    containerStyles={{ width: customWidth ?? "10%" }}
                    options={[
                      { label: "Male", value: "1" },
                      { label: "Female", value: "2" },
                    ]}
                    disabled={isJuvenileDetailsRequired}
                  />

                  <EnhancedCheckbox name="sameAddressAsJuvenile">
                    Same address is Juvenile
                  </EnhancedCheckbox>
                </Flex>

                <Flex gap="middle" align="flex-end" wrap>
                  <EnhancedInput
                    name="childLastName"
                    label="Last Name"
                    width="20%"
                    disabled={isJuvenileDetailsRequired}
                  />
                  <EnhancedInput
                    name="childFirstName"
                    label="First Name"
                    width="20%"
                    disabled={isJuvenileDetailsRequired}
                  />
                  <EnhancedInput
                    name="childMiddleName"
                    label="Middle Name"
                    width="20%"
                    disabled={isJuvenileDetailsRequired}
                  />
                  <EnhancedSelect
                    name="childSuffix"
                    label="Suffix"
                    containerStyles={{ width: customWidth ?? "10%" }}
                    options={[
                      { label: "--", value: "1" },
                      { label: "Jr", value: "2" },
                      { label: "Sr", value: "3" },
                      { label: "Ms", value: "4" },
                      { label: "Mrs", value: "5" },
                      { label: "Mr", value: "6" },
                    ]}
                    disabled={isJuvenileDetailsRequired}
                  />
                </Flex>

                <Flex gap="middle" align="flex-end" wrap>
                  <EnhancedPicker
                    type="date"
                    name="childDOB"
                    label="DOB (mm/dd/yyyy)"
                    disabled={isJuvenileDetailsRequired}
                  />
                  <EnhancedInput
                    type="tel"
                    name="childPhoneNumber"
                    label="Phone Number"
                    width="20%"
                    disabled={isJuvenileDetailsRequired}
                  />
                  <EnhancedSelect
                    name="childPhoneType"
                    label="Phone Type"
                    containerStyles={{ width: customWidth ?? "10%" }}
                    options={[
                      { label: "Home", value: "1" },
                      { label: "Cell", value: "2" },
                      { label: "Work", value: "3" },
                    ]}
                    disabled={isJuvenileDetailsRequired}
                  />

                  <EnhancedCheckbox name="livesWith">
                    Lives With
                  </EnhancedCheckbox>
                </Flex>

                <Flex gap="middle" align="flex-end" wrap>
                  <EnhancedInput
                    name="childAddress"
                    label="Address"
                    width="20%"
                    disabled={isJuvenileDetailsRequired}
                  />
                  <EnhancedInput
                    name="childApt"
                    label="Apt"
                    width="5%"
                    disabled={isJuvenileDetailsRequired}
                  />
                  <EnhancedInput
                    name="childCity"
                    label="City"
                    width="15%"
                    disabled={isJuvenileDetailsRequired}
                  />
                  <EnhancedSelect
                    name="childState"
                    label="State"
                    containerStyles={{ width: customWidth ?? "5%" }}
                    options={[
                      { label: "CA", value: "ca" },
                      { label: "TX", value: "tx" },
                      { label: "NY", value: "ny" },
                    ]}
                    disabled={isJuvenileDetailsRequired}
                  />
                  <EnhancedInput
                    name="childZip"
                    label="ZIP"
                    width="10%"
                    disabled={isJuvenileDetailsRequired}
                  />
                </Flex>

                <Flex gap="middle" align="flex-end" wrap>
                  <EnhancedSelect
                    name="childSchool"
                    label="School"
                    containerStyles={{ width: customWidth ?? "20%" }}
                    options={[
                      { label: "School Name 1", value: "1" },
                      { label: "School Name 2", value: "2" },
                      { label: "School Name 3", value: "3" },
                      { label: "School Name 4", value: "4" },
                    ]}
                    disabled={isJuvenileDetailsRequired}
                  />

                  <EnhancedInput
                    name="childGrade"
                    label="Grade"
                    width="10%"
                    disabled={isJuvenileDetailsRequired}
                  />

                  <Flex gap="middle">
                    <Button
                      onClick={(): void => {
                        // subjectForm.resetForm();
                      }}
                    >
                      Add Contact
                    </Button>
                  </Flex>
                </Flex>

                <Flex
                  align="center"
                  justify="flex-end"
                  style={{ padding: "12px" }}
                >
                  <Button
                    onClick={(): void => {
                      juvenileSubjectForm.resetForm();
                    }}
                  >
                    Clear all Fields
                  </Button>
                </Flex>
              </Flex>
            </Form>
          </FormikProvider>
        )}
      </Flex>
    </StyledFormContainer>
  );
};

export default Subject;
