"use client"
import type { HourBankBalanceDto } from '@/@core/hour-bank/dtos/hour-bank-balance-dto'
import { BalanceSummary } from '../../components/balance-summary'
import { DateDisplay } from '../../components/date-display'
import { QuickActions } from '../../components/quick-actions'
import { Transactions } from '../../components/transaction-history'
import { useHourBankPage } from './use-hours-bank-page'

type HourBankPageProps = {
  collaboratorId: string
  hourBankBalance: HourBankBalanceDto
}

export const HourBankPage = ({ collaboratorId,hourBankBalance }: HourBankPageProps) => {
  const {today} = useHourBankPage(collaboratorId)

  return (
    <div className='flex flex-col gap-4 py-4'>
      <DateDisplay date={today} />

      <div className='flex gap-6'>
        <section className='flex-1'>
          <BalanceSummary hourBankBalance={hourBankBalance} hoursWorkedToday='08:00' totalHoursWorked='08:32'/>
          <div className='flex flex-col mt-8'>
            <QuickActions />
          </div>
        </section>

        <section className='w-96'>
          <Transactions colaboratorId={collaboratorId} />
        </section>
      </div>
    </div>
  )
}
