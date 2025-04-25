import type { NextParams } from '@/api/next/types'
import { collaborationActions, hourBankActions, workScheduleActions } from '@/server/next-safe-action'
import { HourBankPage } from '@/ui/hour-bank/widgets/pages/hour-bank'

export default async function Page({ params }: NextParams<'collaboratorId'>) {
  const { collaboratorId } = await params
  const collaboratorResponse = await collaborationActions.getCollaborator({ collaboratorId })
  const requesterResponse = await collaborationActions.getCollaboratorProfile();
  const hourBankBalanceResponse = await hourBankActions.getHourBankBalance({
    collaboratorId,
  })
  const workTimeResponse = await workScheduleActions.getWorkTime({
    collaboratorId
  })
  if(!requesterResponse?.data?.collaborator) return
  if(!collaboratorResponse?.data?.collaborator) return
  if (!workTimeResponse?.data?.workTime) return
  if (!hourBankBalanceResponse?.data?.hourBankBalance) return

  const requester = requesterResponse.data.collaborator
  const collaborator = collaboratorResponse.data.collaborator
  const hourBankBalance = hourBankBalanceResponse.data.hourBankBalance
  const workTime = workTimeResponse.data.workTime
  const isCollaboratorOwnHourBank = requester.id === collaborator.id
  return (
    <HourBankPage
      isCollaboratorOwnHourBank={isCollaboratorOwnHourBank}
      workTime={workTime}
      hourBankBalance={hourBankBalance}
      collaborator={collaborator} />
  )
}
