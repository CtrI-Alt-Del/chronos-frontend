import type { PropsWithChildren } from 'react'

import { Icon } from '@/ui/global/widgets/components/Icon'

export const DateDisplayView = ({ children }: PropsWithChildren) => {
  console.log('DateDisplayView')
  return (
    <div className='flex gap-1 items-center px-4 py-2 bg-white rounded-full border shadow-lg transition-all duration-300 cursor-pointer shadow-gray-200/50 w-fit border-gray-border hover:bg-blue-50 hover:border-blue-300 hover:shadow-blue-200/50'>
      <Icon name='calendar' size={18} className='text-blue-500' />
      <span className='font-semibold text-md'>{children}</span>
    </div>
  )
}
