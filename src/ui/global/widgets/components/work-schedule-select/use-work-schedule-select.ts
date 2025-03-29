import { useState } from 'react'

import type { WorkScheduleDto } from '@/@core/work-schedule/dtos'
import { CACHE } from '@/@core/global/constants'
import { useApi, useCache } from '@/ui/global/hooks'
export function useWorkScheduleSelect(
  onSelectChange: (workScheduleId: string) => void,
  defaultSelectedWorkScheduleId?: string,
) {
  const [selectedWorkSchedule, setSelectedWorkSchedule] =
    useState<WorkScheduleDto | null>(null)
  const { workScheduleService } = useApi()

  const { data: workSchedules, isFetching } = useCache({
    key: CACHE.workSchedule.schedules.key,
    fetcher: fetchWorkSchedules,
    shouldRefetchOnFocus: false,
  })

  function handleWorkScheduleIdChange(workScheduleId: string) {
    if (!workSchedules) return
    const selected = workSchedules.find((schedule) => schedule.id === workScheduleId)
    setSelectedWorkSchedule(selected || null)
    onSelectChange(workScheduleId)
  }

  async function fetchWorkSchedules() {
    const response = await workScheduleService.listWorkSchedules()
    return response.body
  }

  return {
    selectedWorkScheduleName: selectedWorkSchedule?.description,
    workSchedules,
    isLoading: isFetching,
    handleWorkScheduleIdChange,
  }
}
