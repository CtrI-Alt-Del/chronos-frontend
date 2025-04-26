import type { TimePunchDto, WorkdayLogDto } from '@/@core/work-schedule/dtos'
import { useDatetime } from '@/ui/global/hooks/use-datetime'

type Row = {
  id: string
  date: string
  timePunch: TimePunchDto
  status?: string
}

export function useCollaboratorHistoryTable(workdayLogs: WorkdayLogDto[]) {
  const { formatDate } = useDatetime()

  const rows: Row[] = workdayLogs.map((workdayLog) => ({
    id: String(workdayLog.id),
    date: formatDate(workdayLog.date),
    timePunch: workdayLog.timePunch,
    status: workdayLog.status,
  }))

  return {
    rows,
  }
}
