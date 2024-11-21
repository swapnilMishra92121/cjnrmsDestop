export interface NotesI{
    comments: string | null;
  incidentSummary: string | null;
  mode: string | null;
  otherMethod: string | null;
  lock: string | null;
  pbtNumber: string | null;
  squadNumber: string | null;
  isInDashVideoAvailable: boolean;
  observations: string | null;
  Residential :boolean;
  Rural:boolean;
  Divided:boolean;
  Other:boolean;
  ImpairedVisibility:boolean;
  TrafficPresent:boolean;
  Freeway:boolean;
  Slippery:boolean;
  CauseToDodge:boolean;
  Rain:boolean;
  Snow:boolean;
  Fog:boolean;
  ConditionOther:boolean;
  ViolatorDirection : string | null;
  Lane:string | null;
  Method:string | null;
  SquadDirection:string | null;
  SquadNumber:string | null;
  audio :boolean
  Video: boolean;
  ObservationVehicleOverPosted : boolean;
  AudoClear :boolean;
  AlwaysInSight : boolean;
  OtherTraffic:string | null;
  SingleTarget : boolean;
  otherTarget :string | null; 
  Terrain: string | null;
  SeatBelt : boolean;
  WarningOther: string | null;
  Insurance : string | null
  meeting:boolean;
  Following:boolean;
  AtStop:boolean;
  Admitted:boolean;
  otherWarning: string | null;
  NoOtherTraffic: boolean;
}