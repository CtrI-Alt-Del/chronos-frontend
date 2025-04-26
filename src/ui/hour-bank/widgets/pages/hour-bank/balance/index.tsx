import { hourBankActions } from '@/server/next-safe-action'
import { BalanceView } from './balance-view'

type BalanceProps = {
  collaboratorId: string
}

export const Balance = async ({ collaboratorId }: BalanceProps) => {
  const response = await hourBankActions.getHourBankBalance({ collaboratorId })
  if (!response?.data?.hourBankBalance) return

  return <BalanceView hourBankBalance={response.data.hourBankBalance} />
}
