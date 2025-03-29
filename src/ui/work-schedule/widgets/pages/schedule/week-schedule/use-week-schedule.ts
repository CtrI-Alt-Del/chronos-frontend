import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { timePunchSchema } from '@/validation/schemas/work-schedule'
import type { WeekdayScheduleDto } from '@/@core/work-schedule/dtos'
import { WEEKDAYS } from '@/constants'

const weekScheduleSchema = z.object({
  weekdaysSchedule: z
    .array(
      z.object({
        weekday: z.string(),
        timePunchSchedule: timePunchSchema,
      }),
    )
    .min(7)
    .max(7),
})

type FormData = z.infer<typeof weekScheduleSchema>

export function useWeekSchedule(weekSchedule?: WeekdayScheduleDto[]) {
  const { control, getValues, register, handleSubmit, setValue, watch } =
    useForm<FormData>({
      resolver: zodResolver(weekScheduleSchema),
      defaultValues: {
        weekdaysSchedule: Object.keys(WEEKDAYS).map((weekday) => ({
          weekday: weekday,
          timePunchSchedule: {
            firstClockIn: null,
            firstClockOut: null,
            secondClockIn: null,
            secondClockOut: null,
          },
        })),
      },
    })

  function handleFormSubmit(formData: FormData) {
    console.log(formData)
  }

  function handleWeekdayScheduleReplicate(
    weekdays: string[],
    weekdayToReplicate: string,
  ) {
    const weekdaysSchedule = getValues().weekdaysSchedule

    const timePunchScheduleToReplicate = weekdaysSchedule.find(
      (weekdaySchedule) => weekdaySchedule.weekday === weekdayToReplicate,
    )?.timePunchSchedule

    if (!timePunchScheduleToReplicate) return

    weekdaysSchedule.forEach((weekdaySchedule, index) => {
      if (weekdays.includes(weekdaySchedule.weekday))
        setValue(
          `weekdaysSchedule.${index}.timePunchSchedule`,
          timePunchScheduleToReplicate,
        )
    })
  }

  function handleRemoveWeekdayScheduleButtonClick(weekday: string) {
    const weekdaysSchedule = getValues().weekdaysSchedule
    const weekdayIndex = weekdaysSchedule.findIndex(
      (weekdaySchedule) => weekdaySchedule.weekday === weekday,
    )
    setValue(`weekdaysSchedule.${weekdayIndex}.timePunchSchedule`, {
      firstClockIn: null,
      firstClockOut: null,
      secondClockIn: null,
      secondClockOut: null,
    })
  }

  return {
    formControl: control,
    registerField: register,
    handleFormSubmit: handleSubmit(handleFormSubmit),
    handleWeekdayScheduleReplicate,
    handleRemoveWeekdayScheduleButtonClick,
  }
}
