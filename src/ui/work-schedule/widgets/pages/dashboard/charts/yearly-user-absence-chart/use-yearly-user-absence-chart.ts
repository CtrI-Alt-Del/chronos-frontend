import { useRest } from '@/ui/global/hooks/use-rest'
import { useCache } from '@/ui/global/hooks/use-cache'
import { CACHE } from '@/@core/global/constants'
import { useState } from 'react'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { format } from 'date-fns'

export function useYearlyUserAbsenceChart() {
  const { workScheduleService } = useRest()
  const { minusDays } = useDatetime()
  
  // Inicializar com o ano corrente completo (1º janeiro a 31 dezembro)
  const currentYear = new Date().getFullYear();
  const [startDate, setStartDate] = useState<Date>(new Date(`${currentYear}-01-01`))
  const [endDate, setEndDate] = useState<Date>(new Date(`${currentYear}-12-31`))

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
    const start = format(startDate, 'yyyy-MM-dd')
    const end = format(endDate, 'yyyy-MM-dd')
    console.log('[YearlyUserAbsence] Fetching with:', { start, end });
    const response = await workScheduleService.getYearlyAbsenceReport(start, end)
    if (response.isFailure) response.throwError()
    console.log('[YearlyUserAbsence] API response:', response.body)
    return response.body
  }

  const { data, isFetching } = useCache({
    fetcher: fetchMissingTime,
    key: CACHE.workSchedule.yearlyUserAbsence.key,
    dependencies: [startDate, endDate],
  })

  function handleStartDateInputChange(date: Date) {
    console.log('[YearlyUserAbsence] Start date changed:', date)
    const year = date.getFullYear();
    setStartDate(new Date(`${year}-01-01`))
  }

  function handleEndDateInputChange(date: Date) {
    console.log('[YearlyUserAbsence] End date changed:', date)
    const year = date.getFullYear();
    setEndDate(new Date(`${year}-12-31`))
  }

  console.log('[YearlyUserAbsence] Start date:', startDate);
  console.log('[YearlyUserAbsence] End date:', endDate);
  console.log('[YearlyUserAbsence] API data:', data);
  console.log('[YearlyUserAbsence] monthlyAbsences:', data?.monthlyAbsences);

const yearlyUserAbsence = data?.monthlyAbsences
  .slice(0, 12)
  .map((absence, index) => ({
    month: months[index], // associando o índice à string do mês
    colaboradores: absence.collaboratorsAbsence,
    gestores: absence.managersAbsence,
  }))

  console.log('[YearlyUserAbsence] Processed data:', yearlyUserAbsence);

  return {
    yearlyUserAbsence,
    isFetching,
    startDate,
    endDate,
    handleStartDateInputChange,
    handleEndDateInputChange,
  }
}
