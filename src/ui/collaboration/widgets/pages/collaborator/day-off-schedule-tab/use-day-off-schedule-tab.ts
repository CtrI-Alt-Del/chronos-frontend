import { useMemo, useState } from 'react'

import { useApi, useNavigation } from '@/ui/global/hooks'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { useUpdateDaysOffScheduleAction } from './use-update-days-off-schedule-action'
import { useCollaboratorStore } from '@/ui/collaboration/stores/collaborator-store'
import type { DayOffScheduleDto } from '@/@core/work-schedule/dtos'
import { useToast } from '@/ui/global/hooks/use-toast'
import { ROUTES } from '@/constants'

const WEEKDAYS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']

const TODAY = new Date()

export function useDayOffScheduleTab(
  dayOffSchedule?: DayOffScheduleDto,
  collaboratorId?: string,
) {
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
  const [isCreating, setIsCreating] = useState(false)
  const [isSchedulingDaysOff, setIsSchedulingDaysOff] = useState(false)
  const { workScheduleService, collaborationService } = useApi()
  const { showSuccess, showError } = useToast()
  const { goTo } = useNavigation()
  const { isUpdating, updateDaysOffSchedule } =
    useUpdateDaysOffScheduleAction(collaboratorId)
  const { getCollaboratorSlice, getWeekScheduleSlice, getDayOffScheduleSlice } =
    useCollaboratorStore()
  const { collaborator } = getCollaboratorSlice()
  const { weekSchedule } = getWeekScheduleSlice()
  const { setDayOffSchedule } = getDayOffScheduleSlice()

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

    setIsSchedulingDaysOff(true)
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
    }

    setIsSchedulingDaysOff(false)
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
    const response =
      await workScheduleService.createCollaboratorSchedule(collaboratorSchedule)
    if (response.isFailure) {
      showError(response.errorMessage)
    }

    if (response.isSuccess) {
      showSuccess('Colaborador criado')
      goTo(ROUTES.collaboration.collaborators)
    }
  }

  async function handleSaveButtonClick() {
    if (error) setError(null)

    const newDayOffSchedule = {
      workdaysCount,
      daysOffCount,
      daysOff: Array.from(daysOff),
    }

    if (dayOffSchedule) {
      await updateDaysOffSchedule(newDayOffSchedule)
      setDayOffSchedule(newDayOffSchedule)
      return
    }
    setIsCreating(true)

    const response = await createCollaborator()

    if (response?.isSuccess) {
      await createCollaborationSchedule(response.body.collaboratorId, newDayOffSchedule)
    }

    if (response?.isFailure) {
      showError(response.errorMessage)
    }

    setIsCreating(false)
    setDayOffSchedule(newDayOffSchedule)
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
    isLoading: isCreating || isUpdating,
    isSchedulingDaysOff,
    isCalendarEnabled,
    isSaveButtonDisabled: Boolean(error) || isCreating || daysOff.size === 0,
    handleWorkdaysCountChange,
    handleDaysOffCountChange,
    handleDaysOffSchedule,
    handleDayButtonClick,
    handleSaveButtonClick,
  }
}
