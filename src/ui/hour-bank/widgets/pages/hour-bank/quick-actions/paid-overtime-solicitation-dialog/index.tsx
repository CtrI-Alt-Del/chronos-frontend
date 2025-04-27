'use client'

import { PaidOvertimeSolicitationDialogView } from './paid-overtime-solicitation-dialog-view'
import { useCreatePaidOvertimeSolicitationAction } from './use-create-paid-overtime-solicitation-action'
import { usePaidOvertimeSolicitationDialog } from './use-paid-overtime-solicitation-dialog'

export const PaidOvertimeSolicitationDialog = () => {
  const { createSolicitation, isCreatingSolicitation } =
    useCreatePaidOvertimeSolicitationAction()
  const { handleDialogConfirm } = usePaidOvertimeSolicitationDialog(createSolicitation)

  return (
    <PaidOvertimeSolicitationDialogView
      isLoading={isCreatingSolicitation}
      onConfirm={handleDialogConfirm}
    />
  )
}
