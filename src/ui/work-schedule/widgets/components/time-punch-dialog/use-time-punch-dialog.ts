import type { RefObject } from 'react'

import type { TimePunchPeriod } from '@/@core/work-schedule/types'
import type { DialogRef } from '@/ui/global/widgets/components/dialog/types'

export function useTimePunchDialog(
  dialogRef: RefObject<DialogRef>,
  onTimeLogChange?: (time: string, period: TimePunchPeriod) => void,
) {
  function handleTimeLogChange(timeLog: string, timePunchPeriod: TimePunchPeriod) {
    if (onTimeLogChange) onTimeLogChange(timeLog, timePunchPeriod)
    dialogRef.current?.close()
  }

  return {
    handleTimeLogChange,
  }
}
