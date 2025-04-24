import { useHourBankPage } from './use-hours-bank-page'
import { BalanceSummary } from './balance-summary'
import { QuickActions } from './quick-actions'
import { Transactions } from './transaction-history'
import { DateDisplay } from './date-display'

type HourBankPageProps = {
  collaboratorId: string
}

export const HourBankPage = ({ collaboratorId }: HourBankPageProps) => {
  const today = new Date()

  return (
    <div className='flex flex-col gap-4 py-4'>
      <DateDisplay date={today} />

      <div className='flex gap-6'>
        <section className='flex-1'>
          <BalanceSummary collaboratorId={collaboratorId} />
          <div className='flex flex-col mt-8'>
            <QuickActions />
          </div>
        </section>

        <section className='w-96'><Transactions colaboratorId={collaboratorId} /></section>
      </div>
    </div>
  )
}

export default HourBankPage
