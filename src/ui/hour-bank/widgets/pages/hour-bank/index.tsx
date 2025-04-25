'use client'
import type { HourBankBalanceDto } from '@/@core/hour-bank/dtos/hour-bank-balance-dto'
import { BalanceSummary } from '../../components/balance-summary'
import { DateDisplay } from '../../components/date-display'
import { QuickActions } from '../../components/quick-actions'
import { Transactions } from '../../components/transaction-history'
import { useHourBankPage } from './use-hours-bank-page'
import type { WorkTimeDto } from '@/@core/work-schedule/dtos'
import { CollaboratorDto } from '@/@core/collaboration/dtos'

type HourBankPageProps = {
  collaborator: CollaboratorDto
  hourBankBalance: HourBankBalanceDto
  workTime: WorkTimeDto
  isCollaboratorOwnHourBank?: boolean
}

export const HourBankPage = ({
  collaborator,
  hourBankBalance,
  workTime,
  isCollaboratorOwnHourBank,
}: HourBankPageProps) => {
  const { today } = useHourBankPage(collaborator.id as string)

  return (
    <div className='flex flex-col gap-4 py-4'>
      <DateDisplay date={today} />
      <div className='flex gap-6'>
        <section className='flex-1'>
          <BalanceSummary
            hourBankBalance={hourBankBalance}
            workTime={workTime}
            collaboratorName={
              isCollaboratorOwnHourBank === false ? collaborator.name : undefined
            }
          />
          {isCollaboratorOwnHourBank && (
            <div className='flex flex-col mt-8'>
              <QuickActions />
            </div>
          )}
        </section>

        <section className='w-96'>
          <Transactions colaboratorId={collaborator.id as string} />
        </section>
      </div>
    </div>
  )
}
