export type DailyPunchsReportDto = {
  clockEvents: Array<{
    clockIns: number
    clockOuts: number
  }>
}
