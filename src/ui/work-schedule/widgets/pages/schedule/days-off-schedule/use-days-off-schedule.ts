import { useMemo, useState } from 'react'

import { useApi } from '@/ui/global/hooks'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { useFormContext } from 'react-hook-form'
import type { WorkScheduleForm } from '../use-schedule-page'
import { useEditDaysOffScheduleAction } from './use-edit-days-off-schedule-action'

const WEEKDAYS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']

const TODAY = new Date()

export function useDaysOffSchedule(
  workScheduleId?: string,
  defaultWorkdaysCount?: number,
  defaultDaysOffCount?: number,
  defaultDaysOff?: string[],
) {
  const { setValue } = useFormContext<WorkScheduleForm>()
  const {
    getFirstMonthDayOf,
    getWeekdayIndex,
    getMonthDaysCountOf,
    getMonthDaysOf,
    formatIsoDate,
  } = useDatetime()
  const [workdaysCount, setWorkdaysCount] = useState(defaultWorkdaysCount ?? 5)
  const [daysOffCount, setDaysOffCount] = useState(defaultDaysOffCount ?? 2)
  const [error, setError] = useState<string | null>(null)
  const [isCalendarEnabled, setIsCalendarEnabled] = useState(Boolean(defaultDaysOff))
  const [isLoading, setIsLoading] = useState(false)
  const [daysOff, setDaysOff] = useState<Set<string>>(new Set(defaultDaysOff))
  const { workScheduleService } = useApi()
  const { editDaysOffSchedule, isEditing } = useEditDaysOffScheduleAction(workScheduleId)

  function handleDaysOffCountChange(value: number) {
    if (error) setError(null)
    setDaysOffCount(value)
  }

  function handleWorkdaysCountChange(value: number) {
    if (error) setError(null)
    setWorkdaysCount(value)
  }

  async function handleDaysOffSchedule() {
    if (workdaysCount + daysOffCount !== 7) {
      setError('A soma dos dias de trabalho e folga deve ser igual a 7')
      return
    }

    setIsLoading(true)
    const response = await workScheduleService.scheduleDaysOff(
      workdaysCount,
      daysOffCount,
    )

    if (response.isFailure) {
      setError(response.errorMessage)
    }

    if (response.isSuccess) {
      setError(null)
      setIsCalendarEnabled(true)
      const daysOff = new Set(response.body)
      setDaysOff(daysOff)
      setValue('workdaysCount', workdaysCount)
      setValue('daysOffCount', daysOffCount)
      setValue('daysOff', Array.from(daysOff))
    }

    setIsLoading(false)
  }

  async function handleEditDaysOffScheduleButtonClick() {
    if (error) setError(null)

    await editDaysOffSchedule(workdaysCount, daysOffCount, Array.from(daysOff))
  }

  function handleDayButtonClick(dayNumber: number) {
    const days = getMonthDaysOf()
    const day = days.find((day) => day.getDate() === dayNumber)
    if (!day) return

    const selectedDay = formatIsoDate(day)
    if (daysOff.has(selectedDay)) {
      daysOff.delete(selectedDay)
    } else {
      daysOff.add(selectedDay)
    }
    const newDaysOff = new Set(daysOff)
    setDaysOff(newDaysOff)
    setValue('daysOff', Array.from(newDaysOff))
  }

  const monthDays: Array<number | null> = useMemo(() => {
    const firstDay = getFirstMonthDayOf(TODAY)
    const weekdayIndex = getWeekdayIndex(firstDay)
    const daysCount = getMonthDaysCountOf(TODAY)
    return [
      ...Array(weekdayIndex).fill(null),
      ...Array.from({ length: daysCount }, (_, index) => index + 1),
    ]
  }, [])

  return {
    error,
    workdaysCount,
    daysOffCount,
    weekdays: WEEKDAYS,
    daysOff: Array.from(daysOff).map((dayOff) => Number(dayOff.split('-').at(-1))),
    monthDays,
    isLoading: isLoading || isEditing,
    isCalendarEnabled,
    handleWorkdaysCountChange,
    handleDaysOffCountChange,
    handleDaysOffSchedule,
    handleDayButtonClick,
    handleEditDaysOffScheduleButtonClick,
  }
}
