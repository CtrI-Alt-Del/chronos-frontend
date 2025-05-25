import { type ForwardedRef, forwardRef } from 'react'
import { Button } from '@heroui/button'
import { twMerge } from 'tailwind-merge'

import { Tag } from '../tag'
import type { IconName } from '../Icon/types'
import { Icon } from '../Icon'

type IconButton = {
  name: IconName
  size?: number
  onClick?: () => void
  className?: string
  tag?: string
}

const IconButtonComponent = (
  { name, size, className, tag, onClick, ...buttonProps }: IconButton,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  return (
    <Button
      type='button'
      ref={ref}
      isIconOnly
      onPress={onClick}
      className={twMerge('overflow-visible relative bg-transparent', className)}
      size='sm'
      {...buttonProps}
    >
      <Icon name={name} size={size} />
      {tag && (
        <Tag type='danger' size='sm' className='absolute right-0 -top-3'>
          {tag}
        </Tag>
      )}
    </Button>
  )
}

export const IconButton = forwardRef(IconButtonComponent)
