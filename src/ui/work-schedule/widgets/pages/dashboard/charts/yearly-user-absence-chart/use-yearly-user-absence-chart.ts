import { useRest } from '@/ui/global/hooks/use-rest'
import { useCache } from '@/ui/global/hooks/use-cache'
import { CACHE } from '@/@core/global/constants'
import { useState } from 'react'

export function useYearlyUserAbsenceChart() {
  const { workScheduleService } = useRest()
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())

  const months = [
    'JAN',
    'FEV',
    'MAR',
    'ABR',
    'MAI',
    'JUN',
    'JUL',
    'AGO',
    'SET',
    'OUT',
    'NOV',
    'DEZ',
  ]

  const fetchMissingTime = async () => {
    const response = await workScheduleService.getYearlyAbsenceReport()
    if (response.isFailure) response.throwError()
    return response.body
  }

  const { data, isFetching } = useCache({
    fetcher: fetchMissingTime,
    key: CACHE.workSchedule.yearlyUserAbsence.key,
    dependencies: [startDate, endDate],
  })

  function handleStartDateInputChange(date: Date) {
    setStartDate(date)
  }

  function handleEndDateInputChange(date: Date) {
    setEndDate(date)
  }

  const yearlyUserAbsence = data?.monthlyAbsences.map((absence, index) => ({
    month: months[index],
    colaboradores: absence.collaboratorsAbsence,
    gestores: absence.managersAbsence,
  }))

  console.log(yearlyUserAbsence)

  return {
    yearlyUserAbsence,
    isFetching,
    startDate,
    endDate,
    handleStartDateInputChange,
    handleEndDateInputChange,
  }
}
