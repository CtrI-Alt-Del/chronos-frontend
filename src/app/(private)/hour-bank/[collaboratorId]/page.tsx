import type { NextParams } from '@/api/next/types'
import { hourBankActions } from '@/server/next-safe-action'
import { HourBankPage } from '@/ui/hour-bank/widgets/pages/hour-bank'

export default async function Page({ params }: NextParams<'collaboratorId'>) {
  const { collaboratorId } = await params
  const response = await hourBankActions.getHourBankBalance({
    collaboratorId,
  })

  if (!response?.data?.hourBankBalance) return

  const hourBankBalance = response.data.hourBankBalance
  return (
    <HourBankPage
      hourBankBalance={hourBankBalance}
      collaboratorId={collaboratorId} />
  )
}
