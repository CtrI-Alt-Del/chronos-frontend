'use client'

import React from 'react'
import { Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'

type DateDisplayProps = {
  date?: Date
}

export function DateDisplay({ date = new Date() }: DateDisplayProps) {
  return (
    <div className='flex gap-2 items-center px-4 py-1 bg-white rounded-full border shadow-lg transition-all duration-300 cursor-pointer shadow-gray-200/50 w-fit border-gray-border hover:bg-blue-50 hover:border-blue-300 hover:shadow-blue-200/50'>
      <Calendar className='w-6 h-6 text-blue-500' />
      <span className='text-lg font-semibold'>
        {format(date, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: pt })}
      </span>
    </div>
  )
} 