import type { JustificationDto } from '@/@core/portal/dtos'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { WorkLeaveView } from './work-leave-view'

export type Props = {
  description: string
  startedAt: Date
  endedAt: Date
  isVacation: boolean
  justification?: JustificationDto
}

export const WorkLeave = (props: Props) => {
  const { getDaysCountOfRange } = useDatetime()
  const daysCount = getDaysCountOfRange(props.startedAt, props.endedAt)

  return <WorkLeaveView {...props} daysCount={daysCount} />
}
