'use client'

import { useDailyTimePunchChart } from './use-daily-time-punch-chart'
import { DailyTimePunchChartView } from './daily-time-punch-chart-view'

export function DailyTimePunchChart() {
  const {
    dailyPunchs,
    startDate,
    endDate,
    handleStartDateInputChange,
    handleEndDateInputChange,
  } = useDailyTimePunchChart()

  if (!dailyPunchs) return null

  return (
    <DailyTimePunchChartView
      dailyPunchs={dailyPunchs}
      startDate={startDate}
      endDate={endDate}
      handleStartDateInputChange={handleStartDateInputChange}
      handleEndDateInputChange={handleEndDateInputChange}
    />
  )
}
