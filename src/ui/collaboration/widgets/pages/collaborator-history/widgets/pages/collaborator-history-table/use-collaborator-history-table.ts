import type { TimePunchDto, WorkdayLogDto } from '@/@core/work-schedule/dtos'
import { useDatetime } from '@/ui/global/hooks/use-datetime'

type Row = {
  id: string
  date: string
  timePunchLog: TimePunchDto
  timePunchSchedule: TimePunchDto
}

export function useCollaboratorHistoryTable(workdayLogs: WorkdayLogDto[]) {
  const { formatDate } = useDatetime()

  const rows: Row[] = workdayLogs.map((workdayLog) => ({
    id: String(workdayLog.id),
    date: formatDate(workdayLog.date),
    timePunchLog: workdayLog.timePunchLog,
    timePunchSchedule: workdayLog.timePunchSchedule,
  }))

  return {
    rows,
  }
}
