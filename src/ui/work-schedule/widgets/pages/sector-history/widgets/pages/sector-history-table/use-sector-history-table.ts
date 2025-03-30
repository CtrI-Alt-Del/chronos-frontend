import type { TimePunchDto, WorkdayLogDto } from '@/@core/work-schedule/dtos'
import { useDatetime } from '@/ui/global/hooks/use-datetime'

type Row = {
  id: string
  date: string
  timePunchLog: TimePunchDto
  timePunchSchedule: TimePunchDto
  collaborator: {
    name: string
  }
}

export function useSectorHistoryTable(workdayLogs: WorkdayLogDto[]) {
  const { formatDate } = useDatetime()

  const rows: Row[] = workdayLogs.map((workdayLog) => ({
    id: String(workdayLog.id),
    date: formatDate(workdayLog.date),
    timePunchLog: workdayLog.timePunchLog,
    timePunchSchedule: workdayLog.timePunchSchedule,
    collaborator: {
      name: workdayLog.responsible.dto?.name || 'N/A',
    },
  }))

  return {
    rows,
  }
}
