import { hourBankActions } from '@/server/next-safe-action'
import type { HourBankBalanceDto } from '@/@core/hour-bank/dtos/hour-bank-balance-dto'
import type { WorkTimeDto } from '@/@core/work-schedule/dtos'

type BalanceSummaryProps = {
  hourBankBalance: HourBankBalanceDto
  workTime: WorkTimeDto
  collaboratorName?: string
}

export const BalanceSummary = ({
  hourBankBalance,
  workTime,
  collaboratorName,
}: BalanceSummaryProps) => {
  return (
    <div className='flex flex-col p-10 rounded-2xl border border-gray-border'>
      {collaboratorName && <h2 className='text-4xl font-semibold pb-6'>{collaboratorName}</h2>}
      <h2 className='text-3xl font-semibold'>Saldo de horas</h2>
      <p className='text-xl font-normal mt-3 text-[#7C7C7C]'>
        {collaboratorName ? 'Banco de horas do colaborador' : 'Resumo do seu saldo banco de horas'}
      </p>
      <div className='flex flex-col items-start mt-16'>
        <div className='flex flex-col items-center'>
          <p className='text-6xl font-semibold text-blue-primary'>
            {hourBankBalance.value}
            {hourBankBalance.isNegative}
          </p>
          <p className='mt-2 text-gray-500'>Horas acumuladas</p>
        </div>
      </div>
      <div className='flex flex-row gap-8 mt-16'>
        <div className='flex-col flex-1 items-start p-5 bg-blue-100 rounded-2xl border border-[#D5E7FF]'>
          <p className='text-gray-500'>Horas trabalhadas hoje</p>
          <p className='mt-5 text-5xl font-semibold'>{workTime.workdayTime}</p>
        </div>
        <div className='flex-col flex-1 items-start p-5 bg-blue-100 rounded-2xl border border-[#D5E7FF]'>
          <p className='text-gray-500'>Total de horas trabalhadas no mes</p>
          <p className='mt-5 text-5xl font-semibold'>{workTime.workMonthTime}</p>
        </div>
      </div>
    </div>
  )
}
