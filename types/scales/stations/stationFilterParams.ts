interface StationFilterParams {
  hasExtraTon?: boolean;
  selectDate?: string;
  status?: string;
  stationCode?: string;
  wagonNumber?: string;
}

interface StatisticsFilterParams {
  start?: string
  end?: string
  stationCode?: string
  timeIntervalCount?: number
}

export { type StationFilterParams, type StatisticsFilterParams };