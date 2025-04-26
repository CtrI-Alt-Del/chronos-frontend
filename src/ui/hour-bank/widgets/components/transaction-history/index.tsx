'use client'

import { Calendar, ChevronDown, Filter } from 'lucide-react'
import { useTransaction } from './use-transaction-page'
import { DateInput } from '@/ui/global/widgets/components/date-input'
import { useState } from 'react'

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
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
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

  const toggleFilter = () => {
    setIsFilterOpen(prev => !prev)
  }

  return (
    <div className='flex flex-col gap-2 p-10 h-full rounded-2xl border border-gray-border'>
      <div>
        <h2 className='text-2xl font-bold'>Histórico Recente</h2>
        <p className='text-gray-500'>Últimos registros de ponto</p>
      </div>

      <div className="mt-4 mb-6 w-full">
        <div className="w-full">
          <div className="relative w-full">
            <button 
              type="button" 
              onClick={toggleFilter}
              className="flex justify-between items-center px-4 py-3 w-full bg-blue-50 rounded-lg transition-colors text-blue-primary hover:bg-blue-100"
            >
              <div className="flex gap-2 items-center">
                <Filter size={16} />
                <span>Filtrar período</span>
              </div>
              <ChevronDown size={16} />
            </button>
            {isFilterOpen && (
              <div className="absolute right-0 top-full z-10 p-4 mt-2 w-full bg-white rounded-lg border border-gray-200 shadow-lg">
                <div className='flex flex-col gap-3'>
                  <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-gray-700'>Data inicial</label>
                    <DateInput
                      defualtDate={startDate}
                      onChange={handleStartDateChange}
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-gray-700'>Data final</label>
                    <DateInput
                      defualtDate={endDate}
                      onChange={handleEndDateChange}
                    />
                  </div>
                  <button 
                    type="button"
                    onClick={toggleFilter}
                    className="self-end px-4 py-2 mt-2 text-white rounded-lg bg-blue-primary"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {startDate && endDate && (
          <div className="flex gap-2 items-center px-4 py-2 mt-3 w-full text-blue-700 bg-blue-50 rounded-lg">
            <Calendar size={16} />
            <span className="text-sm font-medium">
              Exibindo registros de {startDate.toLocaleDateString()} até {endDate.toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
      
      <div className='flex flex-col gap-6'>
        {isLoading ? (
          <div className='flex justify-center py-4'>
            <span className='text-gray-500'>Carregando...</span>
          </div>
        ) : transactions.length === 0 ? (
          <div className='flex justify-center py-4'>
            <span className='text-gray-500'>Nenhuma transação encontrada</span>
          </div>
        ) : (
          transactions.map((transaction, index) => (
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
          ))
        )}
      </div>
      
      {pagesCount > 1 && (
        <div className='flex gap-2 justify-center mt-4'>
          {Array.from({ length: pagesCount }).map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1 ? 'bg-blue-primary text-white' : 'bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
