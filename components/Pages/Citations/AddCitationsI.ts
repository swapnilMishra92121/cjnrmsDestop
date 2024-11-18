import { CitationInfoI } from "./Tabs/CitationInformation/Components/CitationInfoStateI";
import { LocationI } from "./Tabs/Location/components/LocationFormI";
import { NotesI } from "./Tabs/Notes/Components/NotesStateI";
import {  ViolationDetailsI } from "./Tabs/Violations/Components/Violationl";

export interface VehicleData {
  plate: string;
  state: string;
  expiration: string;
  noPlate: boolean;
  twentyOneDayPlate: boolean;
  make: string;
  model: string;
  year: string;
  color: string;
  style: string;
  type: string;
  vin: string;
  isCommercialVehicle: boolean;
  hasHazardousMaterial: boolean;
  dotNumber: string;
  poundsOverWeight: string;
  occupants: string;
  hasMotorcycle: boolean;
  hasTrailer: boolean;
  is16PlusPass: boolean;
}

export interface SubjectData {
  plate: string;
  identificationType: string; // Assuming it's an ID type as string
  subjectType: string; // Assuming it's a type as string
  dlState: string;
  cdl: boolean;
  parked: boolean;
  lastName: string;
  firstName: string;
  middleName: string;
  suffix: string; // Assuming suffix is a string
  address: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  race: string;
  gender: string;
  dob: string; // Use `Date | string` if date formats vary
  age: string; // Use `number | string` if age can be numerical
  isJuvenileCourtOffense: boolean;
  juvenileOffenseType: string;
  height: string;
  weight: string;
  hair: string;
  eyes: string;
  driver: boolean;
  owner: boolean;
  citee: boolean;
  passenger: boolean;
  LicenseNumber: string;
}

export interface CitationInformation {
  citationType: string;
  deliveryMethod: string;
  offenseDate: string;
  offenseTime: string;
  officer: string;
  badge: string;
  caseOrICRNumber: string;
  county: string;
  prosecutingCourt: string;
  prosecutingEntity: string;
  mandatoryCourt: boolean;
}



export interface Notes {
  comments: string;
  incidentSummary: string;
  mode: string;
  otherMethod: string;
  lock: string;
  pbtNumber: string;
  squadNumber: string;
  isInDashVideoAvailable: boolean;
  observations: string;
}

export interface FormData {
  Vehicles: VehicleData;
  Subject: SubjectData;
  Location:LocationI;
  Violation:ViolationDetailsI;
  Notes:NotesI;
  CitationInfo: CitationInfoI;
}
