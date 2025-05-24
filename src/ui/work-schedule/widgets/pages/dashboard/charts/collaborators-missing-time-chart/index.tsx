'use client'

import { useCollaboratorsMissingTimeChart } from './use-collaborators-missing-time-chart'
import { CollaboratorsMissingTimeChartView } from './collaborators-missing-time-chart-view'

export function CollaboratorsMissingTimeChart() {
  const {
    missingTime,
    startDate,
    endDate,
    handleStartDateInputChange,
    handleEndDateInputChange,
  } = useCollaboratorsMissingTimeChart()

  if (!missingTime) return null

  return (
    <CollaboratorsMissingTimeChartView
      missingTime={missingTime}
      startDate={startDate}
      endDate={endDate}
      handleStartDateInputChange={handleStartDateInputChange}
      handleEndDateInputChange={handleEndDateInputChange}
    />
  )
}
