'use client'

type BalanceSummaryProps = {
  currentBalance: string
  hoursWorkedToday: string
  totalHoursWorked: string
}

export function BalanceSummary({
  currentBalance,
  hoursWorkedToday,
  totalHoursWorked,
}: BalanceSummaryProps) {
  return (
    <div className='flex flex-col p-10 rounded-2xl border border-gray-border'>
      <h2 className='text-3xl font-semibold'>Saldo de horas</h2>
      <p className='text-xl font-normal mt-3 text-[#7C7C7C]'>
        Resumo do seu banco de horas atual
      </p>
      <div className='flex flex-col items-start mt-16'>
        <div className='flex flex-col items-center'>
          <p className='text-6xl font-semibold text-blue-primary'>
            {currentBalance}
            {balanceResponse.data.hourBankBalance.value}
            {balanceResponse.data.hourBankBalance.isNegative}
          </p>
          <p className='mt-2 text-gray-500'>Horas acumuladas</p>
        </div>
      </div>
      <div className='flex flex-row gap-8 mt-16'>
        <div className='flex-col flex-1 items-start p-5 bg-blue-100 rounded-2xl border border-[#D5E7FF]'>
          <p className='text-gray-500'>Horas trabalhadas hoje</p>
          <p className='mt-5 text-5xl font-semibold'>{hoursWorkedToday}</p>
        </div>
        <div className='flex-col flex-1 items-start p-5 bg-blue-100 rounded-2xl border border-[#D5E7FF]'>
          <p className='text-gray-500'>Total de horas trabalhadas</p>
          <p className='mt-5 text-5xl font-semibold'>{totalHoursWorked}</p>
        </div>
      </div>
    </div>
  )


