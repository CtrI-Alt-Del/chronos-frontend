'use client'

import { useYearlyUserAbsenceChart } from './use-yearly-user-absence-chart'
import { YearlyUserAbsenceChartView } from './yearly-user-absence-chart-view'

export function YearlyUserAbsenceChart() {
  const {
    yearlyUserAbsence,
    startDate,
    endDate,
    handleStartDateInputChange,
    handleEndDateInputChange,
  } = useYearlyUserAbsenceChart()

  if (!yearlyUserAbsence) return null

  return (
    <YearlyUserAbsenceChartView
      yearlyUserAbsence={yearlyUserAbsence}
      startDate={startDate}
      endDate={endDate}
      handleStartDateInputChange={handleStartDateInputChange}
      handleEndDateInputChange={handleEndDateInputChange}
    />
  )
}
