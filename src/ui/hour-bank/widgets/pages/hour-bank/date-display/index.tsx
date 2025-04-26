'use client'

import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { DateDisplayView } from './date-display-view'

export function DateDisplay() {
  const { formatCompleteDate } = useDatetime()

  return <DateDisplayView>{formatCompleteDate(new Date())}</DateDisplayView>
}
