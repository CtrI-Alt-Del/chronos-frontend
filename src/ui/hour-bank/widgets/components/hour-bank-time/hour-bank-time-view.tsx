import type { ComponentProps, PropsWithChildren } from 'react'
import { cn } from '@heroui/theme'

import { Time } from '@/ui/work-schedule/widgets/components/time'
import { Icon } from '@/ui/global/widgets/components/Icon'

type HourBankTimeViewProps = {
  isNegative: boolean
  iconSize?: number
} & ComponentProps<'time'>

export const HourBankTimeView = ({
  isNegative,
  iconSize,
  ...timeProps
}: PropsWithChildren<HourBankTimeViewProps>) => {
  return (
    <div
      className={cn(
        timeProps.className,
        isNegative ? 'text-red-400' : 'text-blue-primary',
        'flex items-center font-semibold',
      )}
    >
      {isNegative ? (
        <Icon name='minus' size={iconSize} />
      ) : (
        <Icon name='plus' size={iconSize} />
      )}
      <Time {...timeProps} />
    </div>
  )
}
