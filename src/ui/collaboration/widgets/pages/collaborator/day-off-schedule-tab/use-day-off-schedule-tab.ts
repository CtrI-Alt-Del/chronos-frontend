import { type RefObject, useMemo, useState } from 'react'

import type { DayOffScheduleDto } from '@/@core/work-schedule/dtos'
import { ROUTES } from '@/constants'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { useCollaboratorStore } from '@/ui/collaboration/stores/collaborator-store'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'
import { useCreateDayOffScheduleSolicitationAction } from './use-create-day-off-schedule-solicitation-action'
import { useUpdateDayOffScheduleAction } from './use-update-day-off-schedule-action'
import { useNavigation } from '@/ui/global/hooks/use-navigation'
import { useRest } from '@/ui/global/hooks/use-rest'
import type { DialogRef } from '@/ui/global/widgets/components/dialog/types'

const WEEKDAYS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']

const TODAY = new Date()

export function useDayOffScheduleTab(
  dialogRef: RefObject<DialogRef>,
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
  const { workScheduleService, collaborationService } = useRest()
  const { showSuccess, showError } = useToast()
  const { goTo } = useNavigation()
  const { isUpdating, updateDaysOffSchedule } =
    useUpdateDayOffScheduleAction(collaboratorId)
  const { useCollaboratorSlice, useDayOffScheduleSlice } = useCollaboratorStore()
  const { collaborator } = useCollaboratorSlice()
  const { setDayOffSchedule } = useDayOffScheduleSlice()
  const { isCreatingSolicitation, createDayOffScheduleSolicitation } =
    useCreateDayOffScheduleSolicitationAction()
  const { account } = useAuthContext()

  function handleCreateWithdrawSolicitationButtonClick() {
    dialogRef.current?.open()
  }
  function handleCreateWithdrawSolicitationModalClose() {
    dialogRef.current?.close()
  }

  const isFormDirty = useMemo(() => {
    if (!dayOffSchedule) return false

    const initialDaysOff = new Set(dayOffSchedule.daysOff)
    const currentDaysOff = daysOff

    if (
      dayOffSchedule.workdaysCount !== workdaysCount ||
      dayOffSchedule.daysOffCount !== daysOffCount
    ) {
      return true
    }

    if (initialDaysOff.size !== currentDaysOff.size) return true

    for (const day of Array.from(initialDaysOff)) {
      if (!currentDaysOff.has(day)) return true
    }

    return false
  }, [workdaysCount, daysOffCount, daysOff, dayOffSchedule])

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
    const response = await workScheduleService.createDayOffSchedule(
      dayOffSchedule,
      collaboratorId,
    )
    if (response.isFailure) {
      showError(response.errorMessage)
    }

    if (response.isSuccess) {
      showSuccess('Escala de trabalho criada')
      goTo(ROUTES.collaboration.collaborators)
    }
  }
  async function handleCreateDayOffScheduleSolicitationButtonClick() {
    if (error) setError(null)
    const adjustedDayOffSchedule = {
      workdaysCount,
      daysOffCount,
      daysOff: Array.from(daysOff),
    }
    await createDayOffScheduleSolicitation(adjustedDayOffSchedule)
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
    isEmployee: account?.role.toLowerCase() === 'employee',
    isLoading: isCreating || isUpdating,
    isSchedulingDaysOff,
    isCalendarEnabled,
    isCreateDayOffSolicitationButtonDisabled:
      Boolean(error) || isCreatingSolicitation || daysOff.size === 0 || !isFormDirty,
    isSaveButtonDisabled:
      Boolean(error) || isCreating || daysOff.size === 0 || !isFormDirty,
    handleWorkdaysCountChange,
    handleDaysOffCountChange,
    handleDaysOffSchedule,
    handleDayButtonClick,
    handleSaveButtonClick,
    handleCreateDayOffScheduleSolicitationButtonClick,
    handleCreateWithdrawSolicitationButtonClick,
    handleCreateWithdrawSolicitationModalClose,
  }
}
