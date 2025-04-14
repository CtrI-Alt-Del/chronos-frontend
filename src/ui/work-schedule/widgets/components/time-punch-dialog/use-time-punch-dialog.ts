import type { RefObject } from 'react'

import type { TimePunchPeriod } from '@/@core/work-schedule/types'
import type { DialogRef } from '@/ui/global/widgets/components/dialog/types'

export function useTimePunchDialog(
  dialogRef: RefObject<DialogRef>,
  onTimeLogChange: (
    timePunchLogId: string,
    timeLog: string,
    timePunchPeriod: TimePunchPeriod,
  ) => void,
  timePunchLogId?: string,
) {
  function handleTimeLogChange(timeLog: string, timePunchPeriod: TimePunchPeriod) {
    if (timePunchLogId) onTimeLogChange(timePunchLogId, timeLog, timePunchPeriod)
    dialogRef.current?.close()
  }

  return {
    handleTimeLogChange,
  }
}
