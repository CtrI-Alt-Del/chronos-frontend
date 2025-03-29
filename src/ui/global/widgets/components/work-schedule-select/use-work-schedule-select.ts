import { CACHE } from '@/@core/global/constants'
import { WorkScheduleDto } from '@/@core/work-schedule/dtos'
import { useApi } from '@/ui/global/hooks'
import { usePaginatedCache } from '@/ui/global/hooks/use-paginated-cache'
import { useQueryParamNumber } from '@/ui/global/hooks/use-query-param-number'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useEffect, useState } from 'react'
export function useWorkScheduleSelect(
  onSelectChange: (workScheduleId: string) => void,
  defaultSelectedWorkScheduleId?: string,
) {
  const [selectedWorkScheduleId, setWorkScheduleId] = useState(defaultSelectedWorkScheduleId)
  const [selectedWorkSchedule, setSelectedWorkSchedule] = useState<WorkScheduleDto | null>(null)
  const { workScheduleService } = useApi()
  const { showError } = useToast()

  function handleWorkScheduleIdChange(workScheduleId: string) {
    setWorkScheduleId(workScheduleId)
    const selected = workSchedules.find(schedule => schedule.id === workScheduleId)
    setSelectedWorkSchedule(selected || null)
    onSelectChange(workScheduleId)
  }

  async function fetchWorkSchedules(page: number) {
    const response = await workScheduleService.listWorkSchedules(page)
    return response.body
  }

  const { data: workSchedules, page, pagesCount, isFetching, refetch, setPage } = usePaginatedCache({
    key: CACHE.workSchedule.workSchedule.key,
    fetcher: fetchWorkSchedules,
    shouldRefetchOnFocus: false,
  })

  function handlePageChange(page: number) {
    setPage(page)
  }

  return {
    selectedWorkScheduleName: selectedWorkSchedule?.description,
    workSchedules,
    isLoading: isFetching,
    page,
    pagesCount,
    handleWorkScheduleIdChange,
    handlePageChange,
  }
}

