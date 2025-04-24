'use client'

import { Calendar } from 'lucide-react'
import { useTransaction } from './use-transaction-page'

type TransactionEntry = {
  date: string
  entryTime: string
  exitTime: string
  total: string
}

type TransactionsProps = {
  colaboratorId: string
}

export function Transactions({ colaboratorId }: TransactionsProps) {
  const {
    transactions,
    operation,
    startDate,
    endDate,
    isLoading,
    page,
    pagesCount,
    handleStartDateChange,
    handleEndDateChange,
    handlePageChange,
  } = useTransaction(colaboratorId)

  return (
    <div className='flex flex-col gap-2 p-10 h-full rounded-2xl border border-gray-border'>
      <h2 className='text-2xl font-bold'>Histórico Recente</h2>
      <p className='text-gray-500'>Últimos registros de ponto</p>
      <div className='flex flex-col gap-6 mt-6'>
        {transactions.map((transaction, index) => (
          <div key={index} className='flex justify-between items-center'>
            <div className='flex gap-3 items-center'>
              <div className='p-2 bg-gray-100 rounded'>
                <Calendar className='w-5 h-5' />
              </div>
              <div>
                <p className='font-medium'>{transaction.date}</p>
                <p className='text-sm text-gray-500'>
                  Entrada {transaction.time}, Saída {transaction.type}
                </p>
              </div>
            </div>
            <span className='font-medium'>{transaction.date}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
