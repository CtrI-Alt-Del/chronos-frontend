import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'
import { z } from 'zod'

import { WEEKDAYS } from '@/constants'
import { timePunchSchema } from '@/validation/schemas/work-schedule'
import type { WorkScheduleForm } from '../../../../../work-schedule/widgets/pages/schedule/use-schedule-page'
import type { WeekdayScheduleDto } from '@/@core/work-schedule/dtos'
import { useUpdateWeekScheduleAction } from './use-edit-week-schedule-action'
import { useCollaboratorStore } from '@/ui/collaboration/stores/collaborator-store/use-collaborator-store'

const EMPTY_TIME_PUNCH = {
  firstClockIn: null,
  firstClockOut: null,
  secondClockIn: null,
  secondClockOut: null,
}

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

export function useWeekScheduleTab(weekdaysSchedule?: WeekdayScheduleDto[] | null) {
  const { setValue: setWorkScheduleValue } = useFormContext<WorkScheduleForm>()
  const { control, getValues, register, handleSubmit, setValue } = useForm<FormData>({
    resolver: zodResolver(weekScheduleSchema),
    defaultValues: {
      weekdaysSchedule:
        weekdaysSchedule ??
        Object.keys(WEEKDAYS).map((weekday) => ({
          weekday: weekday,
          timePunch: EMPTY_TIME_PUNCH,
        })),
    },
  })
  const { isUpdating, updateWeekSchedule } = useUpdateWeekScheduleAction()
  const { getWeekScheduleSlice, getTabSlice } = useCollaboratorStore()
  const { setWeekSchedule } = getWeekScheduleSlice()
  const { setTab } = getTabSlice()

  async function handleFormSubmit(formData: FormData) {
    if (weekdaysSchedule) {
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
    setWorkScheduleValue('weekSchedule', weekdaysSchedule)
  }

  function handleRemoveWeekdayScheduleButtonClick(weekday: string) {
    const weekdaysSchedule = getValues().weekdaysSchedule
    const weekdayIndex = weekdaysSchedule.findIndex(
      (weekdaySchedule) => weekdaySchedule.weekday === weekday,
    )
    setValue(`weekdaysSchedule.${weekdayIndex}.timePunch`, EMPTY_TIME_PUNCH)
    weekdaysSchedule[weekdayIndex].timePunch = EMPTY_TIME_PUNCH
    setWorkScheduleValue('weekSchedule', weekdaysSchedule)
  }

  return {
    formControl: control,
    isEditing: isUpdating,
    registerField: register,
    handleFormSubmit: handleSubmit(handleFormSubmit),
    handleWeekdayScheduleReplicate,
    handleRemoveWeekdayScheduleButtonClick,
  }
}
