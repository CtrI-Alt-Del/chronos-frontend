import { DateDisplay } from './date-display'
import { QuickActions } from './quick-actions'
import { Transactions } from './transactions'
import { WorkedTime } from './worked-time'
import { Balance } from './balance'
import { Header } from './header'
import type { HourBankTransactionDto } from '@/@core/hour-bank/dtos'

type HourBankPageViewProps = {
  collaboratorId: string
  fallbackTransactions: HourBankTransactionDto[]
}

export const HourBankPageView = ({
  collaboratorId,
  fallbackTransactions,
}: HourBankPageViewProps) => {
  return (
    <div className='py-4'>
      <DateDisplay />
      <div className='mt-3'>
        <Header collaboratorId={collaboratorId} />
      </div>
      <div className='mt-3'>
        <WorkedTime collaboratorId={collaboratorId} />
      </div>
      <div className='grid grid-cols-2 gap-6 mt-6'>
        <div>
          <Balance collaboratorId={collaboratorId} />
        </div>
        <QuickActions collaboratorId={collaboratorId} />
      </div>
      <div className='mt-10'>
        <Transactions
          collaboratorId={collaboratorId}
          fallbackTransactions={fallbackTransactions}
        />
      </div>
    </div>
  )
}
