import type { NextParams } from '@/api/next/types'
import { HourBankPage } from '@/ui/hour-bank/widgets/pages/hour-bank'

export default async function Page({ params }: NextParams<'collaboratorId'>) {
  const { collaboratorId } = await params
  return <HourBankPage collaboratorId={collaboratorId} />
}
