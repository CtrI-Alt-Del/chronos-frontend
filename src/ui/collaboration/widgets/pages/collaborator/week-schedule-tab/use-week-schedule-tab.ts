import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { WEEKDAYS } from '@/constants'
import { timePunchSchema } from '@/validation/schemas/work-schedule'
import type { WeekdayScheduleDto } from '@/@core/work-schedule/dtos'
import { useCollaboratorStore } from '@/ui/collaboration/stores/collaborator-store/use-collaborator-store'
import { useUpdateWeekScheduleAction } from './use-edit-week-schedule-action'

const EMPTY_TIME_PUNCH = {
  firstClockIn: null,
  firstClockOut: null,
  secondClockIn: null,
  secondClockOut: null,
}

const DEFAULT_WEEKDAYS_SCHEDULE = Object.keys(WEEKDAYS).map((weekday) => ({
  weekday: weekday,
  timePunch: EMPTY_TIME_PUNCH,
}))

const weekScheduleSchema = z.object({
  weekdaysSchedule: z
    .array(
      z.object({
        weekday: z.string(),
        timePunch: timePunchSchema,
      }),
    )
    .min(7)
    .max(7),
})

type FormData = z.infer<typeof weekScheduleSchema>

export function useWeekScheduleTab(
  currentWeekdaysSchedule?: WeekdayScheduleDto[] | null,
) {
  const { getWeekScheduleSlice, getTabSlice } = useCollaboratorStore()
  const { weekSchedule, setWeekSchedule } = getWeekScheduleSlice()
  const { control, formState, getValues, register, handleSubmit, setValue } =
    useForm<FormData>({
      resolver: zodResolver(weekScheduleSchema),
      defaultValues: {
        weekdaysSchedule:
          weekSchedule.length > 0
            ? weekSchedule
            : currentWeekdaysSchedule ?? DEFAULT_WEEKDAYS_SCHEDULE,
      },
    })
  const { isUpdating, updateWeekSchedule } = useUpdateWeekScheduleAction()
  const { setTab } = getTabSlice()

  async function handleFormSubmit(formData: FormData) {
    if (!currentWeekdaysSchedule) {
      setWeekSchedule(formData.weekdaysSchedule)
      setTab('day-off-schedule-tab')
      return
    }

    await updateWeekSchedule(formData.weekdaysSchedule)
  }

  function handleWeekdayScheduleReplicate(
    weekdays: string[],
    weekdayToReplicate: string,
  ) {
    const weekdaysSchedule = getValues().weekdaysSchedule

    const timePunchToReplicate = weekdaysSchedule.find(
      (weekdaySchedule) => weekdaySchedule.weekday === weekdayToReplicate,
    )?.timePunch

    if (!timePunchToReplicate) return

    weekdaysSchedule.forEach((weekdaySchedule, index) => {
      if (weekdays.includes(weekdaySchedule.weekday)) {
        setValue(`weekdaysSchedule.${index}.timePunch`, timePunchToReplicate)
        weekdaysSchedule[index].timePunch = timePunchToReplicate
      }
    })
  }

  function handleRemoveWeekdayScheduleButtonClick(weekday: string) {
    const weekdaysSchedule = getValues().weekdaysSchedule
    const weekdayIndex = weekdaysSchedule.findIndex(
      (weekdaySchedule) => weekdaySchedule.weekday === weekday,
    )
    setValue(`weekdaysSchedule.${weekdayIndex}.timePunch`, EMPTY_TIME_PUNCH)
    weekdaysSchedule[weekdayIndex].timePunch = EMPTY_TIME_PUNCH
  }

  return {
    formControl: control,
    isEditing: isUpdating,
    isFormDirty: formState.isDirty,
    registerField: register,
    handleFormSubmit: handleSubmit(handleFormSubmit),
    handleWeekdayScheduleReplicate,
    handleRemoveWeekdayScheduleButtonClick,
  }
}
