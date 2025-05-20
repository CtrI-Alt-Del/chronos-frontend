'use client'

import { PaidOvertimeDialogView } from './paid-overtime-dialog-view'
import { usePaidOvertimeAction } from './use-create-paid-overtime-action'
import { usePaidOvertimeDialog } from './use-paid-overtime-dialog'

export const PaidOvertimeDialog = () => {
  const { createPaidOvertime, isCreatingPaidOvertime } = usePaidOvertimeAction()
  const { handleDialogConfirm } = usePaidOvertimeDialog(createPaidOvertime)

  return (
    <PaidOvertimeDialogView
      isLoading={isCreatingPaidOvertime}
      onConfirm={handleDialogConfirm}
    />
  )
}
