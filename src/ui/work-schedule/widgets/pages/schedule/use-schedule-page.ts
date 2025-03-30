'use client'

import type { z } from 'zod'

import { workScheduleSchema } from '@/validation/schemas/work-schedule'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateWorkScheduleAction } from './use-create-work-schedule-action'

export type WorkScheduleForm = z.infer<typeof workScheduleSchema>

export function useSchedulePage() {
  const form = useForm<WorkScheduleForm>({
    resolver: zodResolver(workScheduleSchema),
  })
  const { createWorkSchedule, isCreatingWorkSchedule } = useCreateWorkScheduleAction()

  async function handleCreateWorkScheduleButtonClick() {
    await createWorkSchedule(form.getValues())
  }

  const description = form.watch('description')
  const workdaysCount = form.watch('workdaysCount')
  const daysOffCount = form.watch('daysOffCount')
  const daysOff = form.watch('daysOff')
  const weekSchedule = form.watch('weekSchedule')

  const isFormFilled =
    Boolean(description) &&
    Boolean(workdaysCount) &&
    Boolean(daysOffCount) &&
    Boolean(daysOff) &&
    Boolean(weekSchedule)

  return {
    form,
    isFormFilled,
    isCreatingWorkSchedule,
    handleCreateWorkScheduleButtonClick,
  }
}
