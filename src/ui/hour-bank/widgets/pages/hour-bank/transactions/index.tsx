'use client'

import { useRest } from '@/ui/global/hooks/use-rest'
import type { HourBankTransactionDto } from '@/@core/hour-bank/dtos'
import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'
import { useTransactions } from './use-transactions'
import { TransactionsView } from './transactions-view'

type Props = {
  collaboratorId: string
  fallbackTransactions: HourBankTransactionDto[]
}

export function Transactions({ collaboratorId, fallbackTransactions }: Props) {
  const { hourBankService } = useRest()
  const { isManager } = useAuthContext()
  const {
    transactions,
    operation,
    startDate,
    endDate,
    isFetchingTransactions,
    page,
    pagesCount,
    handleOperationChange,
    handleStartDateChange,
    handleEndDateChange,
    handlePageChange,
  } = useTransactions(collaboratorId, fallbackTransactions, hourBankService)

  return (
    <TransactionsView
      collaboratorId={collaboratorId}
      transactions={transactions}
      operation={operation}
      startDate={startDate}
      endDate={endDate}
      isLoading={isFetchingTransactions}
      page={page}
      totalPages={pagesCount}
      isCollaboratorManager={isManager}
      onStartDateChange={handleStartDateChange}
      onEndDateChange={handleEndDateChange}
      onOperationChange={handleOperationChange}
      onPageChange={handlePageChange}
    />
  )
}

// Eu apliquei essa estratégia na página de banco de horas e de solicitações e acho que ninguém percebeu
