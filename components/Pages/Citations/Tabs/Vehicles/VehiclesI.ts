export interface VehicleProps {
  customWidth?: string;
  customPadding?: string;
  isGlanceView?: boolean;
}

export interface FieldData {
    plate: string,
    state: string,
    expiration: string,
    noPlate: boolean,
    twentyOneDayPlate: boolean,
    make: string,
    model: string,
    year: string,
    color: string,
    style: string,
    type: string,
    vin: string,
    isCommercialVehicle: true,
    hasHazardousMaterial: boolean,
    dotNumber: string,
    poundsOverWeight: string,
    occupants: string,
    hasMotorcycle: boolean,
    hasTrailer: boolean,
    is16PlusPass: boolean,
}

export interface PlateData {
  value: string;
  lable: string;
}

export interface parserVehicleDetailsResponce {
  _id: number;
  Fields: string;
  Content: string;
  FileName: string;
  Success: boolean;
  Plate: string;
}




export interface perticulardataI{
    Licence: string;
    Type: string;
    ValidDates: string;
    Year: string;
    Make: string;
    Model: string;
    VIN: string;
    Style: string;
    PrimaryColor: string;
    GrossWeight: string;
    Owner1: string;
    Owner1Address: string;
    Owner1City: string;
    Owner1State: string;
    Owner1Country: string;
    Owner1ZIP: string;
    StateCode: string;
    SecondaryColor: string;
    Status: string;
    LienHolder: string;
    InsuranceAgency: string;
    Owner1County: string;
    Owner2: string;
    Owner2Address: string;
    Owner2City: string;
    Owner2State: string;
    Owner2County: string;
    Owner2ZIP: string;
    Owner2Country: string;
}