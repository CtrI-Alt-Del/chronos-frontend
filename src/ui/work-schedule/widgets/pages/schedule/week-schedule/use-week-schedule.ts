import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'
import { z } from 'zod'

import { timePunchSchema } from '@/validation/schemas/work-schedule'
import { WEEKDAYS } from '@/constants'
import type { WorkScheduleForm } from '../use-schedule-page'
import type { WeekdayScheduleDto } from '@/@core/work-schedule/dtos'
import { useEditWeekScheduleAction } from './use-edit-week-schedule-action'

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

export function useWeekSchedule(
  workScheduleId?: string,
  weekSchedule?: WeekdayScheduleDto[],
) {
  const { setValue: setWorkScheduleValue } = useFormContext<WorkScheduleForm>()
  const { control, getValues, register, handleSubmit, setValue } = useForm<FormData>({
    resolver: zodResolver(weekScheduleSchema),
    defaultValues: {
      weekdaysSchedule:
        weekSchedule ??
        Object.keys(WEEKDAYS).map((weekday) => ({
          weekday: weekday,
          timePunch: EMPTY_TIME_PUNCH,
        })),
    },
  })
  const { editWeekSchedule, isEditingTimePunchSchedule } =
    useEditWeekScheduleAction(workScheduleId)

  async function handleFormSubmit(formData: FormData) {
    const timePunches = formData.weekdaysSchedule.map((weekday) => ({
      firstClockIn: weekday.timePunch.firstClockIn ?? null,
      firstClockOut: weekday.timePunch.firstClockOut ?? null,
      secondClockIn: weekday.timePunch.secondClockIn ?? null,
      secondClockOut: weekday.timePunch.secondClockOut ?? null,
    }))
    await editWeekSchedule(timePunches)
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
    isEditing: isEditingTimePunchSchedule,
    registerField: register,
    handleFormSubmit: handleSubmit(handleFormSubmit),
    handleWeekdayScheduleReplicate,
    handleRemoveWeekdayScheduleButtonClick,
  }
}
