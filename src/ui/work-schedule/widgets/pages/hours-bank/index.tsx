'use client'

import { useHoursBankPage } from './use-hours-bank-page'
import { BalanceSummary } from './balance-summary'
import { QuickActions } from './quick-actions'
import { RecentHistory } from './recent-history'
import { DateDisplay } from './date-display'

interface HoursBankPageProps {
  collaboratorId: string
  collaboratorName: string
}

export function HoursBankPage({ collaboratorId, collaboratorName }: HoursBankPageProps) {
  const {
    hoursBankData,
    currentBalance,
    hoursWorkedToday,
    totalHoursWorked,
    recentEntries,
  } = useHoursBankPage(collaboratorId, new Date(), new Date()
  return (
    <div className='flex flex-col gap-4 py-4'>
      <DateDisplay date={today} />      
      <div className='flex gap-6'>
        <section className='flex-1'>
          <BalanceSummary 
            currentBalance={currentBalance}
            hoursWorkedToday={hoursWorkedToday}
            totalHoursWorked={totalHoursWorked}
          />

      <div className='flex gap-6'>
        <section className='flex-1'>
          <div className='flex flex-col mt-8'>
            <QuickActions />
          </div>
        </section>

        <section className='w-96'>
          <RecentHistory entries={recentEntries} />
        </section>
        <section className='w-96'><Transactions colaboratorId={collaboratorId} /></section>
      </div>
    </div>
  )
}

export default HoursBankPage

