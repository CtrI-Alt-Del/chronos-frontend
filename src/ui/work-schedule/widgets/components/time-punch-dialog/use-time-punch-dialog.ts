import type { RefObject } from 'react'

import type { TimePunchPeriod } from '@/@core/work-schedule/types'
import type { DialogRef } from '@/ui/global/widgets/components/dialog/types'

export function useTimePunchDialog(
  dialogRef: RefObject<DialogRef>,
  onTimeLogChange: (timePunchId: string, time: string, period: TimePunchPeriod) => void,
  timePunchId?: string,
) {
  function handleTimeLogChange(timeLog: string, timePunchPeriod: TimePunchPeriod) {
    if (timePunchId) onTimeLogChange(timePunchId, timeLog, timePunchPeriod)
    dialogRef.current?.close()
  }

  return {
    handleTimeLogChange,
  }
}
