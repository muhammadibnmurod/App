export type WagonFilterParams = {
  wagonNumber?: string;
  stationCode?: string;
  status?: 'overload' | 'clean';
  name: string;
  stationId: string;
  type: string;
};
