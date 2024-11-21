export interface ViolationGroup {
  thirdViolation: boolean;
  statueOrOrdinance: string | null;
  description: string | null; 
}

export interface ViolationDetailsI {
  endangerLifeOrProperty: boolean;
  category: string | null;
  statusType: string | null;
  searchStatueOrOrdinance: string | null;
  searchDescription: string | null;
  nibrsCode: string | null;
  level: string | null;
  violations: ViolationGroup[]; // Change here to use an array of objects
  addThirdViolation: boolean | null;
  speed: string | null;
  zone: string | null;
  disobey: string | null;
  acTaken: string | null;
  acTesType: string | null;
  acReading: string | null;
  status: string | null;
  speciesNumber: boolean;
  speciesNumberValue: string | null;
  wildlifeRestitution: boolean;
}
