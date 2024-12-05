export interface ViolationGroup {
  thirdViolation: boolean;
  statueOrOrdinance: string | null;
  description: string | null;
}

export interface ViolationDetailsI {
  endangerLifeOrProperty: boolean;
  violations: {
    thirdViolation: boolean;
    statueOrOrdinance: string;
    description: string;
  }[];
  speed: string;
  zone: string;
  disobey: string;
  acTaken: string;
  acTestType: string;
  acReading: string;
  status: string;
  speciesNumber: string;
  speciesNumberValue: string;
  wildlifeRestitution: string;
  wildlifeRestitutionValue: string;
}
