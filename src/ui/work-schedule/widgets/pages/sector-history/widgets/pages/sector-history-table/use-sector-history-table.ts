import type { TimePunchDto, WorkdayLogDto } from '@/@core/work-schedule/dtos'
import { TimePunchPeriod } from '@/@core/work-schedule/types'
import { useDatetime } from '@/ui/global/hooks/use-datetime'

type Row = {
  id: string
  date: string
  timePunch: TimePunchDto
  collaborator: {
    id: string
    name: string
  }
  status?: string
}

export function useSectorHistoryTable(workdayLogs: WorkdayLogDto[]) {
  const { formatDate } = useDatetime()

  const rows: Row[] = workdayLogs.map((workdayLog) => ({
    id: String(workdayLog.id),
    date: formatDate(workdayLog.date),
    timePunch: workdayLog.timePunch,
    collaborator: {
      id: workdayLog.responsible.id,
      name: workdayLog.responsible.entity?.name || 'N/A',
    },
    status: workdayLog.status,
  }))

  return {
    rows,
  }
}
