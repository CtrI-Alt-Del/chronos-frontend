import { hourBankActions } from '@/server/next-safe-action'

type BalanceSummaryProps = {
  collaboratorId: string
}

export async function BalanceSummary({ collaboratorId }: BalanceSummaryProps) {
  const balanceResponse = await hourBankActions.getHourBankBalance({ collaboratorId })
  console.log('balanceResponse', balanceResponse)

  if (!balanceResponse?.data) return

  return (
    <div className='flex flex-col p-10 rounded-2xl border border-gray-border'>
      <h2 className='text-3xl font-semibold'>Saldo de horas</h2>
      <p className='text-xl font-normal mt-3 text-[#7C7C7C]'>
        Resumo do seu banco de horas atual
      </p>
      <div className='flex flex-col items-start mt-16'>
        <div className='flex flex-col items-center'>
          <p className='text-6xl font-semibold text-blue-primary'>
            {balanceResponse.data.hourBankBalance.value}
            {balanceResponse.data.hourBankBalance.isNegative}
          </p>
          <p className='mt-2 text-gray-500'>Horas acumuladas</p>
        </div>
      </div>
      <div className='flex flex-row gap-8 mt-16'>
        <div className='flex-col flex-1 items-start p-5 bg-blue-100 rounded-2xl border border-[#D5E7FF]'>
          <p className='text-gray-500'>Horas trabalhadas hoje</p>
          <p className='mt-5 text-5xl font-semibold'>{'errado'}</p>
        </div>
        <div className='flex-col flex-1 items-start p-5 bg-blue-100 rounded-2xl border border-[#D5E7FF]'>
          <p className='text-gray-500'>Total de horas trabalhadas</p>
          <p className='mt-5 text-5xl font-semibold'>{"errado"}</p>
        </div>
      </div>
    </div>
  )
}
