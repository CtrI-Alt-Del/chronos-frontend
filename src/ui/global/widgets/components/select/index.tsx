import { Button } from '@heroui/button'
import { twMerge } from 'tailwind-merge'

import { Icon } from '../Icon'

type SelectProps = {
  children: string
  className?: string
  onClick?: VoidFunction
}

export const Select = ({ children, className, onClick }: SelectProps) => {
  return (
    <Button
      onClick={onClick}
      color='default'
      variant='flat'
      className={twMerge(
        'flex justify-between items-center bg-gray-100 text-ellipsis h-14',
        className,
      )}
    >
      <span className='truncate whitespace-nowrap overflow-hidden'>{children}</span>
      <Icon name='arrow-down' size={20} />
    </Button>
  )
}
