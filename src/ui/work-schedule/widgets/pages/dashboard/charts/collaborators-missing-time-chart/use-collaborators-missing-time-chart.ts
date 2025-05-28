import { useRest } from '@/ui/global/hooks/use-rest'
import { useCache } from '@/ui/global/hooks/use-cache'
import { CACHE } from '@/@core/global/constants'
import { useState } from 'react'
import type { CollaboratorsMissingTimeReportDto } from '@/@core/work-schedule/dtos'

export function useCollaboratorsMissingTimeChart() {
  const { workScheduleService } = useRest()
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())

  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

  const fetchMissingTime = async () => {
    console.log('[CollaboratorsMissingTime] Fetching with:', { startDate, endDate });
    const response = await workScheduleService.getCollaboratorsMissingTimeReport()
    if (response.isFailure) response.throwError()
    console.log('[CollaboratorsMissingTime] API response:', response.body)
    return response.body
  }

  const { data, isFetching } = useCache({
    fetcher: fetchMissingTime,
    key: CACHE.workSchedule.collaboratorsMissingTime.key,
    dependencies: [startDate, endDate],
  })

  function handleStartDateInputChange(date: Date) {
    console.log('[CollaboratorsMissingTime] Start date changed:', date)
    setStartDate(date)
  }

  function handleEndDateInputChange(date: Date) {
    console.log('[CollaboratorsMissingTime] End date changed:', date)
    setEndDate(date)
  }

  const missingTime = data?.collaboratorsWithoutPunchs.map((item, index) => ({
    day: days[index],
    value: item.collaboratorsWithoutPunchs,
  }))

  return {
    missingTime,
    isFetching,
    startDate,
    endDate,
    handleStartDateInputChange,
    handleEndDateInputChange,
  }
}
