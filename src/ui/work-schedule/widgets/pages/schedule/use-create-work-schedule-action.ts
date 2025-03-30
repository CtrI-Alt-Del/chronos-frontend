import type { WorkScheduleDto } from '@/@core/work-schedule/dtos'
import {  workScheduleActions } from '@/server/next-safe-action'
import { useAction } from 'next-safe-action/hooks'

export function useCreateWorkScheduleAction() {
  const { executeAsync, isPending } = useAction(workScheduleActions.createWorkSchedule)

  async function createWorkSchedule(
  workSchedule: WorkScheduleDto
  ) {
    await executeAsync(workSchedule)
  }

  return {
    createWorkSchedule,
    isCreatingWorkSchedule: isPending,
  }
}
