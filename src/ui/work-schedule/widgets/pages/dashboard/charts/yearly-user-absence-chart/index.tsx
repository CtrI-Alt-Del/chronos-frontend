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

  console.log('[YearlyUserAbsenceChart] Data in component:', yearlyUserAbsence);
  console.log('[YearlyUserAbsenceChart] Number of months:', yearlyUserAbsence?.length);

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
