import React, { FC, useEffect, useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import styled from "styled-components";
import Flex from "antd/lib/flex";
import Button from "antd/lib/button";
import {
  FieldData,
  parserVehicleDetailsResponce,
  perticulardataI,
  PlateData,
  VehicleProps,
} from "./VehiclesI";
import {
  EnhancedCheckbox,
  EnhancedInput,
  EnhancedPicker,
  EnhancedSelect,
} from "@/components/CommonComponents/Fields/EnhancedInput";
import { Submit } from "@/components/CommonComponents/Fields/Submit/Submit";
import { openNotificationWithIcon } from "@/components/CommonComponents/Toster/Toster";
import { successAddedMessage } from "@/utils/const";


const StyledFormContainer = styled.div<{ $customPadding?: string }>`
  ${({ $customPadding }) => `padding: ${$customPadding ?? "16px"};`}
`;

const Vehicles: FC<VehicleProps> = ({
  formData, 
  setformData,
  customWidth,
  customPadding,
  isGlanceView,
  
}) => {
  const [Plate, setPlate] = useState<PlateData[]>([]);
  const [allData, setAllData] = useState<parserVehicleDetailsResponce[]>([]);

  const vehicleForm = useFormik({
    initialValues: {
      plate: formData?.Vehicles?.plate,
      state: formData?.Vehicles?.state,
      expiration: formData?.Vehicles?.expiration,
      noPlate: formData?.Vehicles?.noPlate,
      twentyOneDayPlate: formData?.Vehicles?.twentyOneDayPlate,
      make: formData?.Vehicles?.make,
      model: formData?.Vehicles?.model,
      year: formData?.Vehicles?.year,
      color: formData?.Vehicles?.color,
      style: formData?.Vehicles?.style,
      type: formData?.Vehicles?.type,
      vin: formData?.Vehicles?.vin,
      isCommercialVehicle: formData?.Vehicles?.isCommercialVehicle,
      hasHazardousMaterial: formData?.Vehicles?.hasHazardousMaterial,
      dotNumber: formData?.Vehicles?.dotNumber,
      poundsOverWeight: formData?.Vehicles?.poundsOverWeight,
      occupants: formData?.Vehicles?.occupants,
      hasMotorcycle: formData?.Vehicles?.hasMotorcycle,
      hasTrailer: formData?.Vehicles?.hasTrailer,
      is16PlusPass: formData?.Vehicles?.is16PlusPass,
    },
    onSubmit: (values: FieldData) => {
     
    },
  });


  useEffect(()=>{
    setformData({
      ...formData,
      Vehicles:vehicleForm.values
    })

  },[vehicleForm.values])

  const initialRender = () => {
    window.electronAPI
      .readXMLFiles("parser_vehicle_details")
      .then((e: string) => {
        const ParserVehicleDetailsResponce: parserVehicleDetailsResponce[] = e
          .trim()
          .split("\n")
          .map((line: string) => JSON.parse(line));
       
          console.log("ParserVehicleDetailsResponce",ParserVehicleDetailsResponce);

        const arr: PlateData[] = ParserVehicleDetailsResponce.map((val) => ({
          lable: val.Plate ? val.Plate : "",
          value: String(val._id),
        }));

        setAllData(ParserVehicleDetailsResponce);
        setPlate(arr);
      });
  };

  useEffect(() => {
    initialRender();
  }, []);

  return (
    <StyledFormContainer $customPadding={customPadding}>
      <FormikProvider value={vehicleForm}>
        <Form onSubmit={vehicleForm.handleSubmit}>
          <Flex gap="large" vertical wrap>
            <Flex gap="middle" align="flex-end" wrap>
              <Flex gap="middle" align="flex-end" wrap>
                <EnhancedSelect
                  name="plate"
                  label="Plate"
                  containerStyles={{ width: "20%" }}
                  options={Plate.map((val) => ({
                    value: val.value,
                    label: val.lable,
                  })).filter((val) => val.label)}
                  onChange={(e) => {
                    vehicleForm.setFieldValue("plate", e);

                    const perticulardata: perticulardataI = JSON.parse(
                      allData.find((item) => item._id === Number(e))?.Fields ||
                        "{}"
                    );

                    console.log(perticulardata);

                    vehicleForm.setValues({
                      ...vehicleForm.values,
                      plate: perticulardata.Licence,
                      state: perticulardata.StateCode,
                      expiration: "",
                      noPlate: false,
                      twentyOneDayPlate: false,
                      make: perticulardata.Make,
                      model: perticulardata.Model,
                      year: perticulardata.Year,
                      color: perticulardata.PrimaryColor,
                      style: perticulardata.Style,
                      type: perticulardata.Type,
                      vin: perticulardata.VIN,
                      isCommercialVehicle: true,
                      hasHazardousMaterial: false,
                      dotNumber: "",
                      poundsOverWeight: perticulardata.GrossWeight,
                      occupants: perticulardata.Owner1,
                      hasMotorcycle: false,
                      hasTrailer: false,
                      is16PlusPass: false,
                    });
                  }}
                  value={vehicleForm.values.plate}
                />

                <EnhancedInput
                  name="state"
                  label="State"
                  width="30%"
                  value={vehicleForm.values.state || ""}
                  onChange={vehicleForm.handleChange}
                />

                <EnhancedPicker
                  type="date"
                  name="expiration"
                  label="Expiration"
                  width="20%"
                  // value={null}
                  onChange={vehicleForm.handleChange}
                />
              </Flex>

              <Flex gap="small" vertical wrap>
                <EnhancedCheckbox
                  name="noPlate"
                  checked={vehicleForm.values.noPlate || false}
                  onChange={vehicleForm.handleChange}
                >
                  No Plate
                </EnhancedCheckbox>
                <EnhancedCheckbox
                  name="twentyOneDayPlate"
                  checked={vehicleForm.values.twentyOneDayPlate}
                  onChange={vehicleForm.handleChange}
                >
                  21 Day Plate
                </EnhancedCheckbox>
              </Flex>
            </Flex>

            <Flex gap="middle" align="flex-end" wrap>
              <EnhancedInput
                name="make"
                label="Make"
                width="20%"
                value={vehicleForm.values.make || ""}
                onChange={vehicleForm.handleChange}
              />
              <EnhancedInput
                name="model"
                label="Model"
                width="20%"
                value={vehicleForm.values.model || ""}
                onChange={vehicleForm.handleChange}
              />
              <EnhancedInput
                name="year"
                label="Year"
                width="20%"
                value={vehicleForm.values.year || ""}
                onChange={vehicleForm.handleChange}
              />
              <EnhancedInput
                name="color"
                label="Color"
                width="20%"
                value={vehicleForm.values.color || ""}
                onChange={vehicleForm.handleChange}
              />
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
                value={vehicleForm.values.style}
                onChange={vehicleForm.handleChange}
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
                value={vehicleForm.values.type}
                onChange={vehicleForm.handleChange}
              />
              <EnhancedInput
                name="vin"
                label="VIN"
                width="30%"
                value={vehicleForm.values.vin || ""}
                onChange={vehicleForm.handleChange}
              />
              <Flex gap="middle" align="flex-end" wrap>
              <EnhancedCheckbox
                name="isCommercialVehicle"
                checked={vehicleForm.values.isCommercialVehicle}
                onChange={vehicleForm.handleChange}
              >
                Commercial Vehicle
              </EnhancedCheckbox>
              <EnhancedCheckbox
                name="hasHazardousMaterial"
                checked={vehicleForm.values.hasHazardousMaterial}
                onChange={vehicleForm.handleChange}
              >
                Hazardous Material (DOT)
              </EnhancedCheckbox>
            </Flex>
            </Flex>

            

            <Flex gap="middle" align="flex-end" wrap>
              <EnhancedInput
                name="dotNumber"
                label="DOT#"
                width="18%"
                value={vehicleForm.values.dotNumber || ""}
                onChange={vehicleForm.handleChange}
              />
              <EnhancedInput
                name="poundsOverWeight"
                label="Pounds Overweight"
                width="18%"
                value={vehicleForm.values.poundsOverWeight || ""}
                onChange={vehicleForm.handleChange}
              />
              <EnhancedSelect
                name="occupants"
                label="Occupants"
                containerStyles={{ width:"20%" }}
                options={[
                  { label: "2", value: "1" },
                  { label: "3", value: "2" },
                  { label: "4", value: "3" },
                  { label: "6", value: "4" },
                ]}
                value={vehicleForm.values.occupants}
                onChange={vehicleForm.handleChange}
              />
                <Flex gap="middle" align="flex-end" wrap>
              <EnhancedCheckbox
                name="hasMotorcycle"
                checked={vehicleForm.values.hasMotorcycle}
                onChange={vehicleForm.handleChange}
              >
                Motorcycle
              </EnhancedCheckbox>
              <EnhancedCheckbox
                name="hasTrailer"
                checked={vehicleForm.values.hasTrailer}
                onChange={vehicleForm.handleChange}
              >
                Trailer
              </EnhancedCheckbox>
              <EnhancedCheckbox
                name="is16PlusPass"
                checked={vehicleForm.values.is16PlusPass}
                onChange={vehicleForm.handleChange}
              >
                16+ Pass
              </EnhancedCheckbox>
            </Flex>
            </Flex>

          

            {!isGlanceView && (
              <Flex
                align="center"
                justify="flex-end"
                style={{ padding: "12px" }}
              >
                 {/* <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "8px" }}
                >
                  Submit
                </Button> */}

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
