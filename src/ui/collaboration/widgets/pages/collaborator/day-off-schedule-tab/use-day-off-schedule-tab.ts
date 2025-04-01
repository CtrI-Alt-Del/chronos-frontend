import { useMemo, useState } from 'react'

import { useApi } from '@/ui/global/hooks'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { useFormContext } from 'react-hook-form'
import type { WorkScheduleForm } from '../../../../../work-schedule/widgets/pages/schedule/use-schedule-page'
import { useUpdateDaysOffScheduleAction } from './use-update-days-off-schedule-action'
import { useCollaboratorStore } from '@/ui/collaboration/stores/collaborator-store'
import type { DayOffScheduleDto } from '@/@core/work-schedule/dtos'

const WEEKDAYS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']

const TODAY = new Date()

export function useDayOffScheduleTab(dayOffSchedule?: DayOffScheduleDto) {
  const { setValue } = useFormContext<WorkScheduleForm>()
  const {
    getFirstMonthDayOf,
    getWeekdayIndex,
    getMonthDaysCountOf,
    getMonthDaysOf,
    formatIsoDate,
  } = useDatetime()
  const [workdaysCount, setWorkdaysCount] = useState(dayOffSchedule?.workdaysCount ?? 5)
  const [daysOffCount, setDaysOffCount] = useState(dayOffSchedule?.daysOffCount ?? 2)
  const [daysOff, setDaysOff] = useState<Set<string>>(new Set(dayOffSchedule?.daysOff))
  const [error, setError] = useState<string | null>(null)
  const [isCalendarEnabled, setIsCalendarEnabled] = useState(Boolean(dayOffSchedule))
  const [isLoading, setIsLoading] = useState(false)
  const { workScheduleService, collaborationService } = useApi()
  const { isUpdating, updateDaysOffSchedule } = useUpdateDaysOffScheduleAction()
  const { getCollaboratorSlice, getWeekScheduleSlice } = useCollaboratorStore()
  const { collaborator } = getCollaboratorSlice()
  const { weekSchedule } = getWeekScheduleSlice()

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

  async function createCollaborator() {
    if (!collaborator || !collaborator?.password) return

    return await collaborationService.createCollaborator(
      collaborator,
      collaborator.password,
    )
  }

  async function createCollaborationSchedule(
    collaboratorId: string,
    dayOffSchedule: DayOffScheduleDto,
  ) {
    const collaboratorSchedule = {
      collaboratorId,
      weekSchedule,
      dayOffSchedule,
    }
    await workScheduleService.createCollaboratorSchedule(collaboratorSchedule)
  }

  async function handleSaveButtonClick() {
    if (error) setError(null)

    if (dayOffSchedule) {
      await updateDaysOffSchedule({
        workdaysCount,
        daysOffCount,
        daysOff: Array.from(daysOff),
      })
      return
    }

    const response = await createCollaborator()

    if (response?.isSuccess) {
      await createCollaborationSchedule(response.body.collaboratorId, {
        workdaysCount,
        daysOffCount,
        daysOff: Array.from(daysOff),
      })
    }
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
    isLoading: isLoading || isUpdating,
    isCalendarEnabled,
    handleWorkdaysCountChange,
    handleDaysOffCountChange,
    handleDaysOffSchedule,
    handleDayButtonClick,
    handleSaveButtonClick,
  }
}
