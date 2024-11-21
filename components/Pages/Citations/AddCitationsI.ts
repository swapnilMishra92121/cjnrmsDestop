import { CitationInfoI } from "./Tabs/CitationInformation/Components/CitationInfoStateI";
import { LocationI } from "./Tabs/Location/components/LocationFormI";
import { NotesI } from "./Tabs/Notes/Components/NotesStateI";
import {  ViolationDetailsI } from "./Tabs/Violations/Components/Violationl";

export interface VehicleData {
  plate: string | null;
  state: string | null;
  expiration: string | null;
  noPlate: boolean | null;
  twentyOneDayPlate: boolean;
  make: string | null;
  model: string | null;
  year: string | null;
  color: string | null;
  style: string | null;
  type: string | null;
  vin: string | null;
  isCommercialVehicle: boolean;
  hasHazardousMaterial: boolean;
  dotNumber: string | null; 
  poundsOverWeight: string | null;
  occupants: string | null;
  hasMotorcycle: boolean;
  hasTrailer: boolean;
  is16PlusPass: boolean;
}

export interface SubjectData {
  plate: string | null;
  identificationType: string | null; // Assuming it's an ID type as string
  subjectType: string | null; // Assuming it's a type as string
  dlState: string | null;
  cdl: boolean;
  parked: boolean;
  lastName: string | null;
  firstName: string | null;
  middleName: string | null;
  suffix: string | null; // Assuming suffix is a string
  address: string | null;
  apt: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  race: string | null;
  gender: string | null;
  dob: string | null; // Use `Date | string` if date formats vary
  age: string | null; // Use `number | string` if age can be numerical
  isJuvenileCourtOffense: boolean;
  juvenileOffenseType: string | null;
  height: string | null;
  weight: string | null;
  hair: string | null;
  eyes: string | null;
  driver: boolean;
  owner: boolean;
  citee: boolean;
  passenger: boolean;
  LicenseNumber: string | null;
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
