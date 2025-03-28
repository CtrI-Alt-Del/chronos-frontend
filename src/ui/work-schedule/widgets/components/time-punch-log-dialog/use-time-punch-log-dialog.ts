import type { RefObject } from 'react'

import type { TimePunchPeriod } from '@/@core/work-schedule/types'
import type { DialogRef } from '@/ui/global/widgets/components/dialog/types'

export function useTimePunchLogDialog(
  dialogRef: RefObject<DialogRef>,
  timePunchLogId: string,
  onTimeLogChange: (
    timePunchLogId: string,
    timeLog: string,
    timePunchPeriod: TimePunchPeriod,
  ) => void,
) {
  function handleTimeLogChange(timeLog: string, timePunchPeriod: TimePunchPeriod) {
    onTimeLogChange(timePunchLogId, timeLog, timePunchPeriod)
    dialogRef.current?.close()
  }

  return {
    handleTimeLogChange,
  }
}
