export interface ViolationGroup {
  thirdViolation: boolean;
  statueOrOrdinance: string;
  description: string;
}

export interface ViolationDetailsI {
  endangerLifeOrProperty: boolean;
  category: string;
  statusType: string;
  searchStatueOrOrdinance: string;
  searchDescription: string;
  nibrsCode: string;
  level: string;
  violations: ViolationGroup[]; // Change here to use an array of objects
  addThirdViolation: boolean;
  speed: string;
  zone: string;
  disobey: string;
  acTaken: string;
  acTesType: string;
  acReading: string;
  status: string;
  speciesNumber: boolean;
  speciesNumberValue: string;
  wildlifeRestitution: boolean;
}
