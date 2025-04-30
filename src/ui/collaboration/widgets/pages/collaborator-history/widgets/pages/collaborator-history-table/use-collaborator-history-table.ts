import type { TimePunchDto, WorkdayLogDto } from '@/@core/work-schedule/dtos'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import type { DialogRef } from '@/ui/global/widgets/components/dialog/types'
import { type RefObject, useState } from 'react'

type Row = {
  id: string
  date: string
  timePunch: TimePunchDto
  status?: string
}

export function useCollaboratorHistoryTable(
  workdayLogs: WorkdayLogDto[],
  dialogRef: RefObject<DialogRef>,
) {
  const { formatDate } = useDatetime()
  const [dateBeingExcused, setDateBeingExcused] = useState<string | null>('')
  function handleCreateExcuseAbsenceSolicitationButtonClick(workdayLogDate: string) {
    dialogRef.current?.open()
    setDateBeingExcused(workdayLogDate)
  }
  function handleDialogClose() {
    dialogRef.current?.close()
    setDateBeingExcused(null)
  }

  const rows: Row[] = workdayLogs.map((workdayLog) => ({
    id: String(workdayLog.id),
    date: formatDate(workdayLog.date),
    timePunch: workdayLog.timePunch,
    status: workdayLog.status,
  }))

  return {
    dateBeingExcused,
    handleDialogClose,
    handleCreateExcuseAbsenceSolicitationButtonClick,
    rows,
  }
}
