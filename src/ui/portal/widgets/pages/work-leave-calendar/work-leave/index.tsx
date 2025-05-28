import type { JustificationDto } from '@/@core/portal/dtos'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { WorkLeaveView } from './work-leave-view'

export type Props = {
  description: string
  startedAt: Date
  endedAt: Date
  isVacation: boolean
  justification?: JustificationDto
  overlapsMonthStart: boolean
  overlapsMothEnd: boolean
}

export const WorkLeave = (props: Props) => {
  const { getDaysCountOfRange } = useDatetime()
  const daysCount = getDaysCountOfRange(props.startedAt, props.endedAt) + 1

  return <WorkLeaveView {...props} daysCount={daysCount} />
}
