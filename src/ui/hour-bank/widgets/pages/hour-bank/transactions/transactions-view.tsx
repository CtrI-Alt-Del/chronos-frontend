import { Pagination, Select, SelectItem } from '@heroui/react'

import type { HourBankTransactionDto } from '@/@core/hour-bank/dtos'
import { DateRangeInput } from '@/ui/global/widgets/components/date-range-input'
import { Icon } from '@/ui/global/widgets/components/Icon'
import { HourBankTime } from '@/ui/hour-bank/widgets/components/hour-bank-time'
import { TransactionAdjustmentDialog } from './transaction-adjustment-dialog'
import { useDatetime } from '@/ui/global/hooks/use-datetime'

const TRANSACTION_REASONS: Record<string, string> = {
  overtime: 'Hora extra',
  paidOvertime: 'Hora extra compensada',
  latetime: 'Atraso',
  adjustment: 'Ajuste',
}

type TransactionsViewProps = {
  collaboratorId: string
  transactions: HourBankTransactionDto[]
  operation: string
  startDate: Date
  endDate: Date
  isLoading: boolean
  page: number
  totalPages: number
  isCollaboratorManager: boolean
  onStartDateChange: (date: Date) => void
  onEndDateChange: (date: Date) => void
  onPageChange: (page: number) => void
  onOperationChange: (operation: string) => void
}

export const TransactionsView = ({
  collaboratorId,
  transactions,
  page,
  endDate,
  isLoading,
  isCollaboratorManager,
  operation,
  startDate,
  totalPages,
  onStartDateChange,
  onEndDateChange,
  onPageChange,
  onOperationChange,
}: TransactionsViewProps) => {
  const { formatDateTime } = useDatetime()
  return (
    <div className='flex flex-col gap-2 p-6 h-full rounded-2xl border border-gray-border'>
      <h2 className='text-xl font-bold'>Transações</h2>
      <div className='flex gap-4 mt-2 w-[48rem]'>
        <DateRangeInput
          defeaultStartDate={startDate}
          defeaultEndDate={endDate}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
        />
        <Select
          variant='flat'
          label='Tipo de operação'
          defaultSelectedKeys={[operation]}
          onChange={(event) => onOperationChange(event.currentTarget.value)}
          startContent={<Icon name='workload' className='text-slate-700' size={16} />}
        >
          <SelectItem key='all'>Crédito e Débito</SelectItem>
          <SelectItem key='credit'>Crédito</SelectItem>
          <SelectItem key='debit'>Débito</SelectItem>
        </Select>
        {isCollaboratorManager && (
          <TransactionAdjustmentDialog collaboratorId={collaboratorId} />
        )}
      </div>
      <div className='flex flex-col divide-y-1 mt-3 divide-slate-200'>
        {transactions.map((transaction, index) => (
          <div key={String(index)} className='flex gap-3 py-3 items-center'>
            <div className='flex gap-3 items-center'>
              <div className='p-2 bg-gray-100 rounded'>
                <Icon name='calendar' className='w-5 h-5' />
              </div>
              <div>
                <p className='text-sm'>{formatDateTime(transaction.dateTime)}</p>
                <HourBankTime
                  isNegative={transaction.operation === 'debit'}
                  iconSize={16}
                >
                  {transaction.time}
                </HourBankTime>
              </div>
            </div>
            <p className='text-slate-500 text-sm'>
              | {TRANSACTION_REASONS[transaction.reason]}
            </p>
          </div>
        ))}
        <Pagination total={totalPages} page={page} onChange={onPageChange} />
      </div>
    </div>
  )
}
