import type { HourBankBalanceDto } from '@/@core/hour-bank/dtos/hour-bank-balance-dto'
import { HourBankTime } from '../../../components/hour-bank-time'

type BalanceSummaryProps = {
  hourBankBalance: HourBankBalanceDto
}

export const BalanceView = ({ hourBankBalance }: BalanceSummaryProps) => {
  return (
    <div className='flex flex-col gap-4 p-4 rounded-2xl border border-gray-border h-full'>
      <p>Saldo do banco de horas</p>
      <div className='flex flex-col items-start'>
        <HourBankTime isNegative={hourBankBalance.isNegative} className='text-5xl'>
          {hourBankBalance.value}
        </HourBankTime>
        <p className='text-gray-500'>Horas totais acumuladas</p>
      </div>
    </div>
  )
}
