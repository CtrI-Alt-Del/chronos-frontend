'use client'

import { Calendar } from 'lucide-react'

type RecentEntry = {
  date: string
  entryTime: string
  exitTime: string
  total: string
}

type RecentHistoryProps = {
  entries: RecentEntry[]
}

export function RecentHistory({ entries }: RecentHistoryProps) {
  return (
    <div className='flex flex-col gap-2 p-10 h-full rounded-2xl border border-gray-border'>
      <h2 className='text-2xl font-bold'>Histórico Recente</h2>
      <p className='text-gray-500'>Últimos registros de ponto</p>
      <div className='flex flex-col gap-6 mt-6'>
        {entries.map((entry, index) => (
          <div key={index} className='flex justify-between items-center'>
            <div className='flex gap-3 items-center'>
              <div className='p-2 bg-gray-100 rounded'>
                <Calendar className='w-5 h-5' />
              </div>
              <div>
                <p className='font-medium'>{entry.date}</p>
                <p className='text-sm text-gray-500'>
                  Entrada {entry.entryTime}, Saída {entry.exitTime}
                </p>
              </div>
            </div>
            <span className='font-medium'>{entry.total}</span>
          </div>
        ))}
      </div>
    </div>
  )
} 