import { hourBankActions } from '@/server/next-safe-action'
import { HourBankPageView } from './hour-bank-page-view'

type Props = {
  collaboratorId: string
}

export const HourBankPage = async ({ collaboratorId }: Props) => {
  const response = await hourBankActions.listHourBankTransactions({ collaboratorId })
  if (!response?.data) return
  const hourBankTransactions = response.data
  return (
    <HourBankPageView
      collaboratorId={collaboratorId}
      fallbackTransactions={hourBankTransactions}
    />
  )
}
