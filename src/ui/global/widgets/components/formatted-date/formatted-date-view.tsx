import { useDatetime } from '@/ui/global/hooks/use-datetime'
import type { ComponentProps } from 'react'

type Props = {
  date: string | Date
} & ComponentProps<'span'>

export const FormattedDateView = ({ date, ...props }: Props) => {
  const { formatDate } = useDatetime()

  return <span {...props}>{formatDate(date)}</span>
}
