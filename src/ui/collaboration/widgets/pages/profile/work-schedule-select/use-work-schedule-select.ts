import { type ChangeEvent, useState } from 'react'

import { CACHE } from '@/@core/global/constants'
import { useApi, useCache } from '@/ui/global/hooks'

export function useWorkScheduleSelect(
  onChange: (value: string) => void,
  defaultSelectedWorkScheduleId?: string,
) {
  const [selectedWorkScheduleId, setSelectedWorkScheduleId] = useState(
    defaultSelectedWorkScheduleId,
  )
  const api = useApi()

  function hadleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const selectedWorkScheduleId = event.target.value
    setSelectedWorkScheduleId(selectedWorkScheduleId)
    onChange(selectedWorkScheduleId)
  }

  async function fetchSchedules() {
    const response = await api.workScheduleService.listWorkSchedules()
    return response.body
  }

  const { data, isFetching } = useCache({
    fetcher: fetchSchedules,
    key: CACHE.workSchedule.schedules.key,
    shouldRefetchOnFocus: false,
  })

  return {
    selectedWorkScheduleId,
    workSchedules: data,
    isLoading: isFetching || !data,
    hadleSelectChange,
  }
}
